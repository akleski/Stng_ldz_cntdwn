param(
    [int]$Task = 5,
    [int]$Width = 1440,
    [switch]$ReducedMotion,
    [ValidateSet('normal', 'broken', 'empty', 'single')][string]$Dataset = 'normal',
    [ValidateSet('available', 'blocked', 'corrupt', 'stale')][string]$Storage = 'available',
    [string]$Chrome = "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path $Chrome)) { throw 'Set -Chrome to an installed Chromium browser executable.' }
$html = Get-Content (Join-Path $root 'index.html') -Raw
$tests = Get-Content (Join-Path $PSScriptRoot 'trivia.test.js') -Raw
$base = ([Uri]($root + '\')).AbsoluteUri
$bootstrap = @"
<script>
window.testTask = $Task;
window.testDataset = '$Dataset';
window.testStorage = '$Storage';
if (testStorage === 'blocked') {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked', 'SecurityError'); } });
} else if (testStorage === 'corrupt') {
    localStorage.setItem('sting-trivia-last-id', '{"corrupt": <<>>');
} else if (testStorage === 'stale') {
    localStorage.setItem('sting-trivia-last-id', 'removed-fact-id');
}
window.testWidth = $Width;
window.testReducedMotion = $($ReducedMotion.IsPresent.ToString().ToLower());
window.testErrors = [];
window.addEventListener('error', event => testErrors.push(event.message));
window.testIntervals = new Map();
window.testTimerId = 0;
window.setInterval = (callback, delay) => {
    const id = ++testTimerId;
    testIntervals.set(id, { callback, delay });
    return id;
};
window.clearInterval = id => testIntervals.delete(id);
</script>
"@
$html = $html.Replace('<head>', "<head><base href=`"$base`">$bootstrap")
$html = [regex]::Replace($html, '(?s)<iframe\b.*?</iframe>', '')
if ($Dataset -ne 'normal') {
    $match = [regex]::Match($html, '(?s)(<script id="stingTriviaData" type="application/json">)(.*?)(</script>)')
    if (-not $match.Success) { throw 'Embedded trivia JSON not found.' }
    $json = switch ($Dataset) {
        'broken' { '{broken' }
        'empty' { '[]' }
        'single' { '[' + (($match.Groups[2].Value | ConvertFrom-Json)[0] | ConvertTo-Json -Depth 5 -Compress) + ']' }
    }
    $html = $html.Replace($match.Value, $match.Groups[1].Value + $json + $match.Groups[3].Value)
}
$html = $html.Replace('</body>', "<script>$tests</script></body>")
$temp = Join-Path ([IO.Path]::GetTempPath()) ('sting-trivia-' + [guid]::NewGuid())
New-Item -ItemType Directory $temp | Out-Null
try {
    $content = Join-Path $temp 'content.html'
    [IO.File]::WriteAllText($content, $html)
    $url = ([Uri]$content).AbsoluteUri
    $page = Join-Path $temp 'test.html'
    $wrapper = @"
<!doctype html><html><body style="margin:0">
<script>addEventListener('message', event => { document.getElementById('testResults').textContent = event.data; });</script>
<iframe style="width:${Width}px;height:1000px;border:0" src="$url"></iframe>
<pre id="testResults">WAITING</pre></body></html>
"@
    [IO.File]::WriteAllText($page, $wrapper)
    $start = [Diagnostics.ProcessStartInfo]::new($Chrome)
    $start.UseShellExecute = $false
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    @('--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
      "--user-data-dir=$temp\profile", "--window-size=$Width,1000", '--virtual-time-budget=10000', '--dump-dom',
      ([Uri]$page).AbsoluteUri) | ForEach-Object { $start.ArgumentList.Add($_) }
    if ($ReducedMotion) { $start.ArgumentList.Add('--force-prefers-reduced-motion') }
    $process = [Diagnostics.Process]::Start($start)
    $stdout = $process.StandardOutput.ReadToEndAsync()
    $stderr = $process.StandardError.ReadToEndAsync()
    if (-not $process.WaitForExit(60000)) {
        $process.Kill($true)
        throw 'Browser regression test timed out.'
    }
    $output = $stdout.GetAwaiter().GetResult()
    $result = [regex]::Match($output, '(?s)<pre id="testResults">(.*?)</pre>')
    if (-not $result.Success) { throw "Missing browser test result. $($stderr.GetAwaiter().GetResult())" }
    $report = [Net.WebUtility]::HtmlDecode($result.Groups[1].Value)
    Write-Output $report
    if ($report -notmatch '^PASS') { throw 'Trivia browser tests failed.' }
} finally {
    if ($process -and -not $process.HasExited) { $process.Kill($true) }
    Remove-Item $temp -Recurse -Force
}
