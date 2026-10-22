(async () => {
    const checks = [];
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
        checks.push(message);
    };
    const wait = () => new Promise(resolve => setTimeout(resolve, 400));
    const settle = () => new Promise(resolve => setTimeout(resolve, 320));
    const rotationTimers = () => [...testIntervals].filter(([, timer]) => timer.delay === 20000).map(([id]) => id);
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
        if (testTask >= 6) {
            const button = document.getElementById('randomTrivia');
            assert(button.tagName === 'BUTTON' && button.type === 'button' && !button.hidden, 'Native visible random button');
            assert(button.textContent === 'Losowa ciekawostka', 'Polish button label');
            assert(button.getBoundingClientRect().height >= 40 && button.getBoundingClientRect().right <= innerWidth, 'Button is touch-sized and fits viewport');
            setLanguage('en');
            assert(button.textContent === 'Random fact', 'English button label');
            const firstTimer = rotationTimers();
            assert(firstTimer.length === 1, 'Exactly one rotation timer');
            let previousIndex = triviaIndex;
            const seen = new Set();
            for (let click = 0; click < 300; click++) {
                button.click();
                if (triviaIndex === previousIndex) throw new Error('Random button repeated the current fact');
                seen.add(triviaIndex);
                previousIndex = triviaIndex;
            }
            assert(seen.size > 40, 'Rapid random selections stay varied');
            await settle();
            sameFact();
            const afterTimer = rotationTimers();
            assert(afterTimer.length === 1 && afterTimer[0] !== firstTimer[0], 'Manual selection restarts one rotation timer');
            const selectedByButton = triviaIndex;
            setLanguage('pl');
            sameFact();
            assert(triviaIndex === selectedByButton, 'Language switch keeps manually selected fact');
            testIntervals.get(afterTimer[0]).callback();
            assert(triviaIndex === (selectedByButton + 1) % stingTrivia.length, 'Automatic rotation continues after manual selection');
            assert(button.tabIndex === 0 && getComputedStyle(button).outlineStyle !== undefined, 'Button is keyboard focusable');
        }
        if (testTask >= 7) {
            const badge = document.getElementById('triviaCategory');
            const expected = {
                career: ['Kariera', 'Career'], police: ['The Police', 'The Police'],
                personal: ['Życie prywatne', 'Personal Life'], awards: ['Nagrody', 'Awards'],
                movies: ['Filmy', 'Movies'], activism: ['Aktywizm', 'Activism']
            };
            const shown = new Set();
            for (const [localeIndex, locale] of ['pl', 'en'].entries()) {
                setLanguage(locale);
                for (let index = 0; index < stingTrivia.length; index++) {
                    triviaIndex = index;
                    updateTrivia();
                    const label = expected[stingTrivia[index].category][localeIndex];
                    if (badge.hidden || badge.textContent !== label) throw new Error(`Wrong ${locale} badge at ${index}`);
                    shown.add(`${locale}:${stingTrivia[index].category}`);
                }
            }
            assert(shown.size === 12, 'All six categories render localized badges in PL and EN');
            triviaIndex = 0;
            setLanguage('pl');
            assert(getComputedStyle(badge).display === 'inline-block' && badge.textContent.length > 0, 'Badge is visible text, not color only');
            assert(badge.getBoundingClientRect().right <= innerWidth, 'Badge fits the viewport');
            const before = badge.textContent;
            setLanguage('en');
            assert(badge.textContent !== before && triviaIndex === 0, 'Badge translates without selecting another fact');
            document.getElementById('randomTrivia').click();
            await settle();
            sameFact();
            assert(badge.textContent === expected[stingTrivia[triviaIndex].category][1], 'Badge updates atomically on manual selection');
            testIntervals.get(rotationTimers()[0]).callback();
            await settle();
            sameFact();
            assert(badge.textContent === expected[stingTrivia[triviaIndex].category][1], 'Badge updates atomically on automatic selection');
            stingTrivia.push({ ...stingTrivia[0], category: 'unknown' });
            triviaIndex = stingTrivia.length - 1;
            updateTrivia();
            assert(badge.hidden && badge.textContent === '' && !triviaTitle.textContent.includes('undefined'), 'Missing metadata hides badge without undefined text');
            stingTrivia.pop();
            triviaIndex = 0;
            updateTrivia();
            setLanguage('pl');
        }
        if (testTask >= 8) {
            const content = document.getElementById('triviaContent');
            const button = document.getElementById('randomTrivia');
            assert(content.contains(triviaTitle) && content.contains(triviaText) && content.contains(document.getElementById('triviaCategory')) &&
                !content.contains(button), 'Fade wraps only the synchronized fact content');
            setLanguage('en');
            triviaIndex = 0;
            updateTrivia();
            if (testReducedMotion) {
                button.click();
                sameFact();
                assert(!content.classList.contains('is-fading'), 'Reduced motion updates immediately without fading');
                testIntervals.get(rotationTimers()[0]).callback();
                sameFact();
                assert(!content.classList.contains('is-fading'), 'Reduced motion automatic update is immediate');
            } else {
                const before = triviaIndex;
                button.click();
                assert(content.classList.contains('is-fading') && triviaText.textContent === stingTrivia[before].en.text, 'Old fact stays readable until fade-out completes');
                await settle();
                sameFact();
                assert(!content.classList.contains('is-fading') && triviaIndex !== before, 'Fade-in completes with the selected fact');
                for (let click = 0; click < 20; click++) button.click();
                assert(content.classList.contains('is-fading'), 'Rapid requests share one fade');
                await settle();
                sameFact();
                assert(!content.classList.contains('is-fading'), 'Rapid requests settle on the latest fact');
                button.click();
                const selectedDuringFade = triviaIndex;
                setLanguage('pl');
                assert(!content.classList.contains('is-fading'), 'Language switch cancels pending fade');
                sameFact();
                await settle();
                sameFact();
                assert(triviaIndex === selectedDuringFade && language === 'pl', 'Language switch during fade keeps selected fact');
                testIntervals.get(rotationTimers()[0]).callback();
                assert(content.classList.contains('is-fading'), 'Timer update uses the same fade');
                await settle();
                sameFact();
                assert(!content.classList.contains('is-fading'), 'Timer fade settles');
            }
            setLanguage('pl');
        }
        } else {
            assert(stingTrivia.length === (testDataset === 'single' ? 1 : 0), 'Fallback dataset size');
            if (testTask >= 7 && testDataset !== 'single') assert(document.getElementById('triviaCategory').hidden, 'Fallback fact has no badge');
            if (testTask >= 6) assert(document.getElementById('randomTrivia').hidden, 'Random button hidden without alternatives');
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
