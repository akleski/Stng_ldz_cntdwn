(async () => {
    const checks = [];
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
        checks.push(message);
    };
    const wait = () => new Promise(resolve => setTimeout(resolve, 400));
    const sameFact = () => {
        const copy = (stingTrivia[triviaIndex] || triviaFallback)[language];
        assert(triviaTitle.textContent === copy.title && triviaText.textContent === copy.text,
            'Title and text match selected language and record');
    };
    try {
        assert(innerWidth === testWidth, `Viewport is ${testWidth}px`);
        assert(motionPreference.matches === testReducedMotion, 'Requested motion preference applied');
        if (testDataset === 'normal') {
        assert(stingTrivia.length === 87, 'Exactly 87 valid records');
        assert(new Set(stingTrivia.map(record => record.id)).size === stingTrivia.length, 'Unique stable IDs');
        assert(new Set(stingTrivia.map(record => record.category)).size === 6, 'All six categories');
        assert(parseTrivia('{broken').length === 0, 'Malformed JSON fallback');
        assert(parseTrivia('{}').length === 0 && parseTrivia('[]').length === 0, 'Non-array and empty datasets safe');
        const record = stingTrivia[0];
        assert(parseTrivia(JSON.stringify([record])).length === 1, 'Single-record dataset valid');
        assert(parseTrivia(JSON.stringify([record, record])).length === 0, 'Duplicate IDs rejected');
        assert(parseTrivia(JSON.stringify([{ ...record, en: {} }])).length === 0, 'Incomplete translation rejected');
        assert(parseTrivia(JSON.stringify([{ ...record, category: 'invalid' }])).length === 0, 'Unknown category rejected');
        assert(parseTrivia(JSON.stringify([{ ...record, sources: [] }])).length === 0, 'Source required');
        assert(parseTrivia(JSON.stringify([{ ...record, sources: ['https://#broken'] }])).length === 0, 'Malformed source URL rejected');
        assert(parseTrivia(JSON.stringify([{ ...record, sources: ['http://example.com'] }])).length === 0, 'HTTPS source required');
        assert(parseTrivia(JSON.stringify([{ ...record, id: 'not stable' }])).length === 0, 'Stable kebab-case ID required');
        sameFact();
        for (const locale of ['pl', 'en']) {
            setLanguage(locale);
            for (let index = 0; index < stingTrivia.length; index++) {
                triviaIndex = index;
                updateTrivia();
                const copy = stingTrivia[index][locale];
                if (triviaTitle.textContent !== copy.title || triviaText.textContent !== copy.text) {
                    throw new Error(`Incorrect ${locale} copy at ${index}`);
                }
            }
        }
        assert(true, 'Every record renders correctly in PL and EN');
        triviaIndex = 0;
        setLanguage('pl');
        const selected = triviaIndex;
        setLanguage('en');
        sameFact();
        assert(triviaIndex === selected, 'Language switch preserves selection');
        setLanguage('pl');
        const timer = [...testIntervals.values()].find(timer => timer.delay === 20000);
        assert(!!timer, '20-second automatic rotation registered');
        timer.callback();
        await wait();
        sameFact();
        assert(triviaIndex !== selected, 'Automatic rotation changes record');
        triviaIndex = stingTrivia.length - 1;
        updateTrivia();
        await wait();
        sameFact();
        timer.callback();
        await wait();
        sameFact();
        } else {
            assert(stingTrivia.length === (testDataset === 'single' ? 1 : 0), 'Fallback dataset size');
            sameFact();
            setLanguage('en');
            sameFact();
            setLanguage('pl');
            assert(![...testIntervals.values()].some(timer => timer.delay === 20000), 'No pointless rotation for empty/single datasets');
        }
        assert(/^\d+$/.test(document.getElementById('days').textContent), 'Countdown still initializes');
        assert(document.documentElement.scrollWidth <= innerWidth, 'No horizontal overflow');
        assert(testErrors.length === 0, `No page exceptions: ${testErrors.join('; ')}`);
        document.body.replaceChildren();
        const result = document.createElement('pre');
        result.id = 'testResults';
        result.textContent = `PASS TASK${String(testTask).padStart(3, '0')}: ${checks.length} checks\n${checks.join('\n')}`;
        document.body.appendChild(result);
        if (parent !== window) parent.postMessage(result.textContent, '*');
    } catch (error) {
        document.body.replaceChildren();
        const result = document.createElement('pre');
        result.id = 'testResults';
        result.textContent = `FAIL TASK${testTask}: ${error.stack}\n${testErrors.join('\n')}`;
        document.body.appendChild(result);
        if (parent !== window) parent.postMessage(result.textContent, '*');
    }
})();
