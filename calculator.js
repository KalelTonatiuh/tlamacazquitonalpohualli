// calculator.js

// --- GLOBAL STATE & CONFIGURATION ---
let currentLang = 'es';
let currentSpelling = 'ortho';
let lastResult = null;
let currentCalculatorMode = 'gregorianToTonalli';

const translations = {
    es: {
        pageTitle: "Calculadora de Tonalli - Sagrado Trece", mainTitle: "Calculadora de Tonalli",
        spellingOrtho: "Regular", spellingPhonetic: "Fonética",
        intro1: "Esta es una herramienta para convertir una fecha del calendario Gregoriano a un <strong>tonalli</strong> (signo y número) del Tonalpohualli.",
        intro2: "El método de cálculo se basa estrictamente en el procedimiento descrito en el <strong>Apéndice 5</strong> del libro <strong>\"Sagrado Trece, los calendarios del antiguo México\"</strong> de Frank Díaz.",
        intro3_expanded: "<strong>Nota:</strong> Para funcionar con cualquier fecha, esta calculadora extrapola los patrones cíclicos de las tablas del libro (que cubren de 1922 a 2077), manteniendo intacto el sistema de correlación original.",
        dateLabel: "Selecciona una fecha:", calculateButton: "Calcular Tonalli", todayButton: "Hoy",
        yearResultTitle: "El Tonalli del Año es:",
        dayResultTitle: "El Tonalli del Día es:",
        trecenaText: "Perteneciente a la trecena de",
        tonalliMeaningTitle: "Profecía del Tonalli del Día:", // As per your previous change
        trecenaTitle: "Trecena",
        newFireCycleTitle: "Ciclo del Fuego Nuevo (Xiuhmolpilli)",
        cycleDateText: "Esta fecha pertenece al ciclo de 52 años de {startYear} - {endYear}.",
        nextCeremonyDateText: "La próxima ceremonia del Fuego Nuevo será el {nextDate}.",
        legendOfSunsTitle: "Leyenda de los Soles (Codex Chimalpopoca)",
        daysFromSunsPreamble: "La fecha seleccionada está a:", // Or "Años desde los Soles:" or similar if you prefer
        // UPDATED FOR YEARS
        daysFromSun1: "{years} años del inicio del 1er Sol (4 Jaguar).",
        daysFromSun2: "{years} años del inicio del 2º Sol (4 Viento).",
        daysFromSun3: "{years} años del inicio del 3er Sol (4 Lluvia).",
        daysFromSun4: "{years} años del inicio del 4º Sol (4 Agua).",
        daysFromSun5: "{years} años del inicio del 5º Sol (4 Movimiento).",
        fifthSunEndText: "El 5º Sol, de acuerdo a la mitología, terminará en un día 4 Movimiento.",
        fifthSunEndedText: "Han pasado {years} años desde el fin interpretado del 5º Sol el {endDate}.",
        // END OF UPDATES FOR YEARS
        sunsCalculationTitle: "Base del Cálculo de los Soles:",
        sunsCalculationExplanation: "Anclaje del Códice (1558): El 5º Sol comenzó 2513 años antes, en el 955 a.C. Las eras anteriores se calculan hacia atrás basándose en las duraciones míticas: 1er Sol (676 años), 2º Sol (364 años), 3er Sol (312 años), 4º Sol (676 años + 52 de diluvio).",
        meaningNotFound: "La profecía para esta entrada específica aún no ha sido añadida.", // As per your previous change
        errorInvalidDate: "Fecha inválida.", errorCalculation: "Ocurrió un error inesperado durante el cálculo.",
        footerText: "Implementación digital basada en la obra de Frank Díaz. Creado como una herramienta de estudio y consulta.",
        gregToTonalliMode: "Gregoriano a Tonalli",
        tonalliToGregMode: "Tonalli a Gregoriano",
        selectTonalliLabel: "Selecciona un Tonalli:",
        yearRangeLabel: "Rango de Años para Buscar:",
        yearRangeSeparator: "a",
        yearRangeNote: "(Rango pequeño recomendado, ej. 1-5 años)",
        calculateGregorianButton: "Buscar Fechas Gregorianas",
        gregorianDatesFound: "Fechas Gregorianas Encontradas:",
        noGregorianDatesFound: "No se encontraron fechas para este Tonalli en el rango especificado.",
        errorYearRange: "El año de inicio debe ser menor o igual al año de fin.",
        errorMissingInputs: "Por favor, complete todos los campos para la búsqueda.",
        xiuhpohualliTitle: "Veintena del Xiuhpohualli (Año Solar)",
        veintenaDayText: "Día {day} de {veintenaName}",
        nemontemiDayText: "Día Nemontemi {day}"
    },
    en: {
        pageTitle: "Tonalli Calculator - Sacred Thirteen", mainTitle: "Tonalli Calculator",
        spellingOrtho: "Standard", spellingPhonetic: "Phonetic",
        intro1: "This is a tool to convert a Gregorian calendar date to a <strong>tonalli</strong> (sign and number) of the Tonalpohualli.",
        intro2: "The calculation method is strictly based on the procedure described in <strong>Appendix 5</strong> of the book <strong>\"Sacred Thirteen, the calendars of ancient Mexico\"</strong> by Frank Díaz.",
        intro3_expanded: "<strong>Note:</strong> To function for any date, this calculator extrapolates the cyclical patterns from the book's tables (covering 1922-2077), keeping the original correlation system intact.",
        dateLabel: "Select a date:", calculateButton: "Calculate Tonalli", todayButton: "Today",
        yearResultTitle: "The Year's Tonalli is:",
        dayResultTitle: "The Day's Tonalli is:",
        trecenaText: "Belonging to the trecena of",
        tonalliMeaningTitle: "Prophecy of the Day's Tonalli:", // As per your previous change
        trecenaTitle: "Trecena",
        newFireCycleTitle: "New Fire Cycle (Xiuhmolpilli)",
        cycleDateText: "This date belongs to the 52-year cycle of {startYear} - {endYear}.",
        nextCeremonyDateText: "The next New Fire Ceremony will be on {nextDate}.",
        legendOfSunsTitle: "Legend of the Suns (Codex Chimalpopoca)",
        daysFromSunsPreamble: "The selected date is:", // Or "Years from the Suns:" or similar if you prefer
        // UPDATED FOR YEARS
        daysFromSun1: "{years} years from the start of the 1st Sun (4 Jaguar).",
        daysFromSun2: "{years} years from the start of the 2nd Sun (4 Wind).",
        daysFromSun3: "{years} years from the start of the 3rd Sun (4 Rain).",
        daysFromSun4: "{years} years from the start of the 4th Sun (4 Water).",
        daysFromSun5: "{years} years from the start of the 5th Sun (4 Movement).",
        fifthSunEndText: "The 5th Sun, according to mythology, will end on a day 4 Movement.",
        fifthSunEndedText: "{years} years have passed since the interpreted end of the 5th Sun on {endDate}.",
        // END OF UPDATES FOR YEARS
        sunsCalculationTitle: "Basis for the Suns Calculation:",
        sunsCalculationExplanation: "Codex Anchor (1558): The 5th Sun began 2513 years prior, in 955 BC. Previous eras are calculated backward based on their mythic durations: 1st Sun (676 yrs), 2nd Sun (364 yrs), 3rd Sun (312 yrs), 4th Sun (676 yrs + 52 for the flood).",
        meaningNotFound: "The prophecy for this specific entry has not yet been added.", // As per your previous change
        errorInvalidDate: "Invalid date.", errorCalculation: "An unexpected error occurred during calculation.",
        footerText: "Digital implementation based on the work of Frank Díaz. Created as a study and reference tool.",
        gregToTonalliMode: "Gregorian to Tonalli",
        tonalliToGregMode: "Tonalli to Gregorian",
        selectTonalliLabel: "Select a Tonalli:",
        yearRangeLabel: "Year Range to Search:",
        yearRangeSeparator: "to",
        yearRangeNote: "(Small range recommended, e.g., 1-5 years)",
        calculateGregorianButton: "Find Gregorian Dates",
        gregorianDatesFound: "Gregorian Dates Found:",
        noGregorianDatesFound: "No dates found for this Tonalli in the specified range.",
        errorYearRange: "Start year must be less than or equal to end year.",
        errorMissingInputs: "Please fill all fields for the search.",
        xiuhpohualliTitle: "Xiuhpohualli Veintena (Solar Year)",
        veintenaDayText: "Day {day} of {veintenaName}",
        nemontemiDayText: "Nemontemi Day {day}"
    }
};

const sagradoTreceData = {
    nahuatlNumbers: [null,'Cē','Ōme','Yēyi','Nāhui','Mācuīlli','Chicuacēn','Chicōme','Chicuēyi','Chicunāhui','Mahtlāctli','Mahtlāctli on Cē','Mahtlāctli on Ōme','Mahtlāctli on Yēyi'],
    signToNumber: {'Casa': 3, 'Conejo': 8, 'Caña': 13, 'Pedernal': 18},
    signGlyphs: [null, "glyphs/cipactli.png", "glyphs/ehecatl.png", "glyphs/calli.png", "glyphs/cuetzpalin.png", "glyphs/coatl.png", "glyphs/miquiztli.png", "glyphs/mazatl.png", "glyphs/tochtli.png", "glyphs/atl.png", "glyphs/itzcuintli.png", "glyphs/ozomatli.png", "glyphs/malinalli.png", "glyphs/acatl.png", "glyphs/ocelotl.png", "glyphs/cuauhtli.png", "glyphs/cozcacuauhtli.png", "glyphs/ollin.png", "glyphs/tecpatl.png", "glyphs/quiahuitl.png", "glyphs/xochitl.png"],
    numberToSign: [null,{nahuatl_ortho:'Cipactli',nahuatl_phonetic:'Sipaktli',es:'Dragón',en:'Dragon'},{nahuatl_ortho:'Ehecatl',nahuatl_phonetic:'Ehecatl',es:'Viento',en:'Wind'},{nahuatl_ortho:'Calli',nahuatl_phonetic:'Kalli',es:'Casa',en:'House'},{nahuatl_ortho:'Cuetzpalin',nahuatl_phonetic:'Kuetzpalin',es:'Lagartija',en:'Lizard'},{nahuatl_ortho:'Coatl',nahuatl_phonetic:'Koatl',es:'Serpiente',en:'Serpent'},{nahuatl_ortho:'Miquiztli',nahuatl_phonetic:'Mikistli',es:'Muerte',en:'Death'},{nahuatl_ortho:'Mazatl',nahuatl_phonetic:'Masatl',es:'Venado',en:'Deer'},{nahuatl_ortho:'Tochtli',nahuatl_phonetic:'Tochtli',es:'Conejo',en:'Rabbit'},{nahuatl_ortho:'Atl',nahuatl_phonetic:'Atl',es:'Agua',en:'Water'},{nahuatl_ortho:'Itzcuintli',nahuatl_phonetic:'Itzkuintli',es:'Perro',en:'Dog'},{nahuatl_ortho:'Ozomatli',nahuatl_phonetic:'Osomatl',es:'Mono',en:'Monkey'},{nahuatl_ortho:'Malinalli',nahuatl_phonetic:'Malinalli',es:'Hierba',en:'Grass'},{nahuatl_ortho:'Acatl',nahuatl_phonetic:'Akatl',es:'Caña',en:'Reed'},{nahuatl_ortho:'Ocelotl',nahuatl_phonetic:'Oselotl',es:'Ocelote',en:'Ocelot'},{nahuatl_ortho:'Cuauhtli',nahuatl_phonetic:'Kuauhtli',es:'Águila',en:'Eagle'},{nahuatl_ortho:'Cozcacuauhtli',nahuatl_phonetic:'Koskakuauhtli',es:'Buitre',en:'Vulture'},{nahuatl_ortho:'Ollin',nahuatl_phonetic:'Ollin',es:'Movimiento',en:'Movement'},{nahuatl_ortho:'Tecpatl',nahuatl_phonetic:'Tekpatl',es:'Pedernal',en:'Flint'},{nahuatl_ortho:'Quiahuitl',nahuatl_phonetic:'Kiawitl',es:'Lluvia',en:'Rain'},{nahuatl_ortho:'Xochitl',nahuatl_phonetic:'Shochitl',es:'Flor',en:'Flower'}],
    getDayValue: (month, day) => {
        const v = [[null,[8,5],[9,6],[10,7],[11,8],[12,9],[0,10],[1,11],[2,12],[3,13],[4,14],[5,15],[6,16],[7,17],[8,18],[9,19],[10,0],[11,1],[12,2],[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,10],[8,11],[9,12],[10,13],[11,14],[12,15]],[null,[0,16],[1,17],[2,18],[3,19],[4,0],[5,1],[6,2],[7,3],[8,4],[9,5],[10,6],[11,7],[12,8],[0,9],[1,10],[2,11],[3,12],[4,13],[5,14],[6,15],[7,16],[8,17],[9,18],[10,19],[11,0],[12,1],[0,2],[1,3],null],[null,[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13],[12,14],[0,15],[1,16],[2,17],[3,18],[4,19],[5,0],[6,1],[7,2],[8,3],[9,4],[10,5],[11,6],[12,7],[0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14]],[null,[7,15],[8,16],[9,17],[10,18],[11,19],[12,0],[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[0,14],[1,15],[2,16],[3,17],[4,18],[5,19],[6,0],[7,1],[8,2],[9,3],[10,4]],[null,[11,5],[12,6],[0,7],[1,8],[2,9],[3,10],[4,11],[5,12],[6,13],[7,14],[8,15],[9,16],[10,17],[11,18],[12,19],[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11],[12,12],[0,13],[1,14],[2,15]],[null,[3,16],[4,17],[5,18],[6,19],[7,0],[8,1],[9,2],[10,3],[11,4],[12,5],[0,6],[1,7],[2,8],[3,9],[4,10],[5,11],[6,12],[7,13],[8,14],[9,15],[10,16],[11,17],[12,18],[0,19],[1,0],[2,1],[3,2],[4,3],[5,4],[6,5]],[null,[7,6],[8,7],[9,8],[10,9],[11,10],[12,11],[0,12],[1,13],[2,14],[3,15],[4,16],[5,17],[6,18],[7,19],[8,0],[9,1],[10,2],[11,3],[12,4],[0,5],[1,6],[2,7],[3,8],[4,9],[5,10],[6,11],[7,12],[8,13],[9,14],[10,15],[11,16]],[null,[12,17],[0,18],[1,19],[2,0],[3,1],[4,2],[5,3],[6,4],[7,5],[8,6],[9,7],[10,8],[11,9],[12,10],[0,11],[1,12],[2,13],[3,14],[4,15],[5,16],[6,17],[7,18],[8,19],[9,0],[10,1],[11,2],[12,3],[0,4],[1,5],[2,6],[3,7]],[null,[4,8],[5,9],[6,10],[7,11],[8,12],[9,13],[10,14],[11,15],[12,16],[0,17],[1,18],[2,19],[3,0],[4,1],[5,2],[6,3],[7,4],[8,5],[9,6],[10,7],[11,8],[12,9],[0,10],[1,11],[2,12],[3,13],[4,14],[5,15],[6,16],[7,17]],[null,[8,18],[9,19],[10,0],[11,1],[12,2],[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,10],[8,11],[9,12],[10,13],[1,17],[2,18],[3,19],[4,0],[5,1],[6,2],[7,3],[8,4],[9,5],[10,6],[11,7],[12,8],[0,9],[1,10],[2,11]],[null,[0,9],[1,10],[2,11],[3,12],[4,13],[5,14],[6,15],[7,16],[8,17],[9,18],[10,19],[11,0],[12,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13],[12,14],[0,15],[1,16],[2,17],[3,18]],[null,[4,19],[5,0],[6,1],[7,2],[8,3],[9,4],[10,5],[11,6],[12,7],[0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],[8,16],[9,17],[10,18],[11,19],[12,0],[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]]];
        if (month > 0 && month <= v.length && day > 0 && v[month-1] && day < v[month-1].length && v[month-1][day] !== null) {
            return v[month-1][day];
        }
        return undefined;
    }
};

const legendOfSunsData = {
    sun1_duration: 676, sun2_duration: 364, sun3_duration: 312, sun4_duration: 676,
    sun4_flood: 52, sun5_start_year_BC: 955,
    fifth_sun_end_date: new Date(Date.UTC(2012, 11, 21)) // December 21, 2012
};

const xiuhpohualliData = {
    anchorGregorianDate: new Date(Date.UTC(1922, 1, 26)), // Example: Feb 26, 1922
    veintenas: [
        // ... (Your existing full veintenas array - UNCHANGED) ...
        {
            nahuatl_ortho: "Atlcahualo", meaning_en: "Dedicated to the water deities. Children were dressed in rich finery and carried on litters adorned with feathers and flowers. People walked ahead playing music, singing, and dancing. If children cried, it was taken as a good omen for rain. Owners of captives, splendidly adorned with feathers, would parade and dance, displaying their courage. These ceremonies took place daily during this month."
        },
        // ... all your other veintena objects ...
        {
            nahuatl_ortho: "Izcalli", meaning_en: "Dedicated to Xiuhteuctli (Ixcozauhqui, god of fire). On the tenth day, a new fire was made at midnight before the image of Xiuhteuctli, which was peculiarly attired. At dawn, young men and boys brought various animals hunted over the preceding ten days (aquatic and terrestrial). They offered them to the older men guarding the god. These older men threw all these animals into the fire to roast them. Each young man and boy was given a tamale made of amaranth seeds (huauhquiltamalli), which all the people offered that day; they all ate them very hot in honor of the festival, drinking and making merry. In ordinary years, there were no ritual killings. In a leap year (every four years), nobles, lords, illustrious people, and the emperor himself would be very richly dressed and adorned, and they would begin a solemn and grave areito (netecuhitotiliztli, 'areito of the lords'), performed only every four years. That same day (leap year), very early before dawn, they would pierce the ears of boys and girls, and place on their heads a skullcap made of parrot feathers glued with pine resin (ocotzotl)."
        }
    ],
    nemontemi: {
        nahuatl_ortho: "Nemontemi",
        es: "Nemontemi",
        en: "Nemontemi",
        approx_gregorian: "ca. Feb 21-25",
        meaning_es: "Cinco (o seis en año bisiesto) días considerados aciagos y de mala suerte. Los nacidos en ellos tendrían malos resultados y serían pobres y miserables (llamados Nenoquich los hombres, Nencihuatl las mujeres). Generalmente no se hacía nada. Se abstenían especialmente de reñir (augurio de seguir con ese hábito). Tropezar era mal augurio.",
        meaning_en: "Five (or six in a leap year) days considered ill-fated and unlucky. Those born during them would have bad outcomes and be poor and miserable (men called Nenoquich, women Nencihuatl). Generally, nothing was done. They especially abstained from quarreling (omen of keeping that habit). Stumbling was a bad omen."
    }
};


// DOM Elements (Assumed to be unchanged from your original code)
const dateInput = document.getElementById('gregorian-date');
const calculateBtn = document.getElementById('calculate-btn');
const todayBtn = document.getElementById('today-btn');
const resultContainer = document.getElementById('result-container');
const resultYearTonalliEl = document.getElementById('result-year-tonalli');
const resultYearTonalliTransEl = document.getElementById('result-year-tonalli-translations');
const resultDayTonalliMainEl = document.querySelector('#result-day-tonalli-main .tonalli-name');
const daySignGlyphEl = document.getElementById('day-sign-glyph');
const resultDayTonalliTransEl = document.getElementById('result-day-tonalli-translations');
const resultTrecenaEl = document.getElementById('result-trecena');
const resultTrecenaTransEl = document.getElementById('result-trecena-translations');
const errorMessageEl = document.getElementById('error-message');
const langSwitcher = document.getElementById('lang-switcher');
const spellingSwitcher = document.getElementById('spelling-switcher');
const tonalliMeaningContainerEl = document.getElementById('tonalli-meaning-text');
const cycleRangeTextEl = document.getElementById('cycle-range-text');
const nextCeremonyTextEl = document.getElementById('next-ceremony-text');
const daysFromSunsTextEl = document.getElementById('days-from-suns-text');
const fifthSunEndTextEl = document.getElementById('fifth-sun-end-text');
const sunsCalculationExplanationEl = document.getElementById('suns-calculation-explanation');
const xiuhpohualliVeintenaNameEl = document.getElementById('xiuhpohualli-veintena-name');
const xiuhpohualliVeintenaApproxGregorianEl = document.getElementById('xiuhpohualli-veintena-approx-gregorian');
const xiuhpohualliVeintenaDayEl = document.getElementById('xiuhpohualli-veintena-day');
const xiuhpohualliVeintenaMeaningEl = document.querySelector('#xiuhpohualli-veintena-meaning p');

const modeGregToTonBtn = document.getElementById('mode-gregorian-to-tonalli');
const modeTonToGregBtn = document.getElementById('mode-tonalli-to-gregorian');
const gregToTonCalcEl = document.getElementById('gregorian-to-tonalli-calc');
const tonToGregCalcEl = document.getElementById('tonalli-to-gregorian-calc');
const tonalliNumberInputEl = document.getElementById('tonalli-number-input');
const tonalliSignInputEl = document.getElementById('tonalli-sign-input');
const startYearInputEl = document.getElementById('start-year-input');
const endYearInputEl = document.getElementById('end-year-input');
const calculateGregorianBtn = document.getElementById('calculate-gregorian-btn');
const reverseResultsContainerEl = document.getElementById('reverse-results-container');
const reverseResultsListEl = document.getElementById('reverse-results-list');

// --- FUNCTIONS --- (Assuming these are largely unchanged except displayResult)

function getNewFireInfo(selectedDate) {
    const anchorCeremonyYear = 1507; const ceremonyMonth = 10; const ceremonyDay = 19; // Month is 0-indexed for Date object
    let nextCeremonyYear = anchorCeremonyYear;
    if (selectedDate && !isNaN(selectedDate.getTime())) {
        const selectedDateTime = selectedDate.getTime();
        while (new Date(Date.UTC(nextCeremonyYear, ceremonyMonth, ceremonyDay)).getTime() <= selectedDateTime) {
            nextCeremonyYear += 52;
        }
    } else {
        const currentYear = new Date().getUTCFullYear();
        while(nextCeremonyYear <= currentYear) {
            nextCeremonyYear += 52;
        }
    }
    const previousCeremonyYear = nextCeremonyYear - 52;
    const nextCeremonyDate = new Date(Date.UTC(nextCeremonyYear, ceremonyMonth, ceremonyDay));
    return { startYear: previousCeremonyYear, endYear: nextCeremonyYear - 1, nextDate: nextCeremonyDate };
}

function getXiuhpohualliVeintena(selectedDate) {
    const anchorDate = xiuhpohualliData.anchorGregorianDate;
    const msPerDay = 1000 * 60 * 60 * 24;

    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
         console.error("Invalid selectedDate in getXiuhpohualliVeintena:", selectedDate);
         return null;
    }

    const diffTotalDays = Math.floor((selectedDate.getTime() - anchorDate.getTime()) / msPerDay);
    let dayInXiuhpohualliCycle = ( (diffTotalDays % 365) + 365) % 365;
    dayInXiuhpohualliCycle += 1; // 1-indexed day

    if (dayInXiuhpohualliCycle <= 360) {
        const veintenaIndex = Math.floor((dayInXiuhpohualliCycle -1) / 20);
        const dayInVeintena = (dayInXiuhpohualliCycle -1) % 20 + 1;
        const veintenaInfo = xiuhpohualliData.veintenas[veintenaIndex];
        if (!veintenaInfo) {
            console.error("Veintena info not found for index:", veintenaIndex);
            return null;
        }
        return { nameData: veintenaInfo, day: dayInVeintena, isNemontemi: false };
    } else {
        const dayInNemontemi = dayInXiuhpohualliCycle - 360;
        return { nameData: xiuhpohualliData.nemontemi, day: dayInNemontemi, isNemontemi: true };
    }
}

function isGregorianLeap(year) { return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0); }

function getYearValue(year) {
    const refYear = 1922, refTrecenaNum = 1, refSignIndex = 0; // Assuming 'Conejo' is index 0 of yearBearers
    const yearBearers = ['Conejo', 'Caña', 'Pedernal', 'Casa']; // These map to 8, 13, 18, 3 in signToNumber
    const yearDiff = year - refYear;
    const mod = (n, m) => ((n % m) + m) % m;
    const finalTrecenaNum = mod(refTrecenaNum - 1 + yearDiff, 13) + 1;
    const finalSignName = yearBearers[mod(refSignIndex + yearDiff, 4)];
    const finalVeintenaNum = sagradoTreceData.signToNumber[finalSignName];
    return { trecena: finalTrecenaNum, veintena: finalVeintenaNum }; // veintena here is the sign index for the year bearer
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    if (langSwitcher.querySelector('.active')) langSwitcher.querySelector('.active').classList.remove('active');
    if (langSwitcher.querySelector(`[data-lang="${lang}"]`)) langSwitcher.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    populateTonalliInputs();
    if (currentCalculatorMode === 'gregorianToTonalli') {
        if (lastResult) { displayResult(lastResult); }
        else if (errorMessageEl.dataset.key && errorMessageEl.style.display !== 'none') { displayError(errorMessageEl.dataset.key); }
    }
}

function setSpelling(spelling) {
    currentSpelling = spelling;
    if(spellingSwitcher.querySelector('.active')) spellingSwitcher.querySelector('.active').classList.remove('active');
    if(spellingSwitcher.querySelector(`[data-spelling="${spelling}"]`)) spellingSwitcher.querySelector(`[data-spelling="${spelling}"]`).classList.add('active');
    populateTonalliInputs();
    if (currentCalculatorMode === 'gregorianToTonalli' && lastResult) {
         displayResult(lastResult);
    }
}

function populateTonalliInputs() {
    tonalliNumberInputEl.innerHTML = '';
    for (let i = 1; i <= 13; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = sagradoTreceData.nahuatlNumbers[i] ? `${i} (${sagradoTreceData.nahuatlNumbers[i]})` : i;
        tonalliNumberInputEl.appendChild(option);
    }
    tonalliSignInputEl.innerHTML = '';
    sagradoTreceData.numberToSign.forEach((signData, index) => {
        if (index === 0 || !signData) return; // Skip null at index 0
        const option = document.createElement('option');
        option.value = index;
        const signNameDisplay = currentSpelling === 'ortho' ? signData.nahuatl_ortho : signData.nahuatl_phonetic;
        option.textContent = `${signNameDisplay} (${signData[currentLang] || signData.es})`;
        tonalliSignInputEl.appendChild(option);
    });
}

function getTonalliForDate(gregorianDate) {
    const year = gregorianDate.getUTCFullYear();
    const month = gregorianDate.getUTCMonth() + 1; // 1-12
    const day = gregorianDate.getUTCDate(); // 1-31

    const yearValue = getYearValue(year); // {trecena, veintena (sign index)}
    let dayValue;

    if (month === 2 && day === 29 && isGregorianLeap(year)) {
        // According to Frank Diaz's tables, Feb 29 is treated as March 1 for Tonalpohualli calculation
        // The table for March (index 2) day 1 (index 1 in getDayValue)
        dayValue = sagradoTreceData.getDayValue(3, 1);
    } else {
        dayValue = sagradoTreceData.getDayValue(month, day);
    }

    if (typeof dayValue === 'undefined' || dayValue === null) {
         console.error("getDayValue returned undefined for month:", month, "day:", day);
         return null; // Or handle error appropriately
    }

    // dayValue = [dayTrecenaAdjustment, dayVeintenaAdjustment]
    const dayNumValue = { trecena: dayValue[0], veintena: dayValue[1] };

    let adjustment = { trecena: 0, veintena: 0 };
    const prevYear = year - 1;

    // Frank Diaz's leap year adjustment logic (Apéndice 5, "Nota Importante")
    // If current year is leap and date is AFTER Feb 29 (i.e., from March 1 onwards) -> add 1
    if (isGregorianLeap(year) && month > 2) {
        adjustment = { trecena: 1, veintena: 1 };
    }
    // If current year is NOT leap, BUT PREVIOUS year WAS leap,
    // and date is BEFORE Feb 20 (i.e., Jan 1 to Feb 19) -> add 1
    // (The book implies the shift happens around Feb 20th for the start of Atlcahualo)
    else if (!isGregorianLeap(year) && isGregorianLeap(prevYear) && (month < 2 || (month === 2 && day <= 19))) {
        adjustment = { trecena: 1, veintena: 1 };
    }

    const totalTrecena = yearValue.trecena + dayNumValue.trecena + adjustment.trecena;
    const totalVeintena = yearValue.veintena + dayNumValue.veintena + adjustment.veintena;

    // Result must be 1-13 for trecena and 1-20 for veintena (sign index)
    return {
        dayTrecena: totalTrecena % 13 || 13,
        dayVeintena: totalVeintena % 20 || 20
    };
}

function calculateTonalli() {
    try {
        clearAllErrorMessages();
        const dateString = dateInput.value;
        if (!dateString) { return displayError('errorInvalidDate'); }

        // Ensure date is parsed as UTC to avoid timezone issues
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) -1; // Month is 0-indexed for JS Date
        const day = parseInt(dateParts[2]);
        const date = new Date(Date.UTC(year, month, day));

        if (isNaN(date.getTime())) { return displayError('errorInvalidDate'); }

        clearGregToTonResults();

        const gregorianYear = date.getUTCFullYear();
        const tonalliResult = getTonalliForDate(date);

        if (!tonalliResult) { return displayError('errorCalculation'); }

        const yearValue = getYearValue(gregorianYear); // {trecena, veintena (sign index for year bearer)}

        // Calculate trecena starting sign
        // (DaySignIndex - (DayNumber - 1) + 20) % 20 gives 0-19, so add 1 if result is 0, or use || 20 for 1-20
        const trecenaStartSignIndex = (tonalliResult.dayVeintena - (tonalliResult.dayTrecena - 1) + 20) % 20 || 20;


        lastResult = {
            yearTrecena: yearValue.trecena,
            yearVeintena: yearValue.veintena, // This is the sign index of the year bearer
            dayTrecena: tonalliResult.dayTrecena,
            dayVeintena: tonalliResult.dayVeintena, // This is the sign index of the day
            trecenaStartSignIndex: trecenaStartSignIndex,
            selectedDate: date
        };
        displayResult(lastResult);
    } catch (error) {
        console.error("G->T Calculation failed:", error, error.stack);
        displayError('errorCalculation');
    }
}

function calculateGregorianFromTonalli() {
    clearTonToGregResults();
    clearAllErrorMessages();

    const targetNumber = parseInt(tonalliNumberInputEl.value);
    const targetSignIndex = parseInt(tonalliSignInputEl.value);
    let startYear = parseInt(startYearInputEl.value);
    let endYear = parseInt(endYearInputEl.value);

    if (isNaN(targetNumber) || isNaN(targetSignIndex) || isNaN(startYear) || isNaN(endYear)) {
        return displayError('errorMissingInputs');
    }
    if (startYear > endYear) { return displayError('errorYearRange'); }
    if (endYear - startYear > 10) { // Limit search range for performance
         endYear = startYear + 10;
         endYearInputEl.value = endYear; // Update the UI
         console.warn("Search range automatically limited to 10 years for performance.");
    }

    let foundDates = [];
    let iterationCount = 0;
    const maxIterations = 366 * (endYear - startYear + 2); // Generous max iterations

    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) { // Month is 0-11 for JS Date
            const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
            for (let d = 1; d <= daysInMonth; d++) {
                iterationCount++;
                if (iterationCount > maxIterations ) { // Safety break
                    console.error("Exceeded max iterations in reverse search.");
                    displayError('errorCalculation'); // Or a more specific error
                    return;
                }
                const currentDate = new Date(Date.UTC(y, m, d));
                const tonalli = getTonalliForDate(currentDate);
                if (tonalli && tonalli.dayTrecena === targetNumber && tonalli.dayVeintena === targetSignIndex) {
                    foundDates.push(currentDate);
                }
            }
        }
    }

    reverseResultsListEl.innerHTML = ''; // Clear previous results
    if (foundDates.length > 0) {
        foundDates.forEach(date => {
            const li = document.createElement('li');
            li.textContent = date.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
            reverseResultsListEl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = translations[currentLang].noGregorianDatesFound;
        reverseResultsListEl.appendChild(li);
    }
    reverseResultsContainerEl.style.display = 'block';
}


function displayResult(result) {
    resultContainer.style.display = 'block';
    errorMessageEl.style.display = 'none';
    errorMessageEl.dataset.key = '';


    // YEAR TONALLI
    const yearSignData = sagradoTreceData.numberToSign[result.yearVeintena]; // yearVeintena is sign index of year bearer
    if (yearSignData && sagradoTreceData.nahuatlNumbers[result.yearTrecena]) {
        resultYearTonalliEl.textContent = `${sagradoTreceData.nahuatlNumbers[result.yearTrecena]} ${currentSpelling === 'ortho' ? yearSignData.nahuatl_ortho : yearSignData.nahuatl_phonetic}`;
        resultYearTonalliTransEl.textContent = `(${result.yearTrecena} / Español: ${yearSignData.es} / English: ${yearSignData.en})`;
    } else {
        resultYearTonalliEl.textContent = 'Error';
        resultYearTonalliTransEl.textContent = '';
    }

    // DAY TONALLI
    const daySignData = sagradoTreceData.numberToSign[result.dayVeintena]; // dayVeintena is sign index of the day
    if (daySignData && sagradoTreceData.nahuatlNumbers[result.dayTrecena]) {
        resultDayTonalliMainEl.textContent = `${sagradoTreceData.nahuatlNumbers[result.dayTrecena]} ${currentSpelling === 'ortho' ? daySignData.nahuatl_ortho : daySignData.nahuatl_phonetic}`;
        resultDayTonalliTransEl.textContent = `(${result.dayTrecena} / Español: ${daySignData.es} / English: ${daySignData.en})`;

        const glyphPath = sagradoTreceData.signGlyphs[result.dayVeintena];
        if (glyphPath) {
            daySignGlyphEl.src = glyphPath;
            daySignGlyphEl.alt = daySignData[currentLang] || daySignData.es;
            daySignGlyphEl.style.display = 'inline-block';
        } else {
            daySignGlyphEl.style.display = 'none';
        }
    } else {
        resultDayTonalliMainEl.textContent = 'Error';
        resultDayTonalliTransEl.textContent = '';
        daySignGlyphEl.style.display = 'none';
    }


    // TRECENA
    const trecenaSignData = sagradoTreceData.numberToSign[result.trecenaStartSignIndex];
    if (trecenaSignData && sagradoTreceData.nahuatlNumbers[1]) {
        resultTrecenaEl.textContent = `${translations[currentLang].trecenaText} ${sagradoTreceData.nahuatlNumbers[1]} ${currentSpelling === 'ortho' ? trecenaSignData.nahuatl_ortho : trecenaSignData.nahuatl_phonetic}`;
        resultTrecenaTransEl.textContent = `(1 / Español: ${trecenaSignData.es} / English: ${trecenaSignData.en})`;
    } else {
        resultTrecenaEl.textContent = 'Error';
        resultTrecenaTransEl.textContent = '';
    }


    // --- MEANING DISPLAY ---
    const meaningKey = `${result.dayTrecena}_${result.dayVeintena}`;
    let fullMeaningText = "";
    if (typeof tonalliMeanings !== 'undefined' && tonalliMeanings[meaningKey]) {
         fullMeaningText = tonalliMeanings[meaningKey];
    } else {
        console.warn(`Meaning not found for key: ${meaningKey}. Or 'tonalliMeanings' object is not defined yet.`);
        if (tonalliMeaningContainerEl) tonalliMeaningContainerEl.innerHTML = `<p>${translations[currentLang].meaningNotFound}</p>`;
    }

    if (fullMeaningText && tonalliMeaningContainerEl) {
        fullMeaningText = fullMeaningText
            .replace(/\n/g, '<br>')
            .replace(/\*\*(TRECENA.*?)\*\*/g, '<h3>$1</h3>')
            .replace(/\*\*([A-Z\s\d\/().:,']+?)\*\*/g, (match, p1) => {
                const trimmedP1 = p1.trim();
                if (trimmedP1 === "---" || trimmedP1 === "" || trimmedP1.startsWith("(") ) return match; // Avoid bolding --- or empty or parenthesized
                return `<strong>${trimmedP1}</strong>`;
             })
            // Consolidate specific keyword bolding
            .replace(/(LUCK:|BAPTISM:|UMBILICAL CORD RITUALS:|GOOD ATTRIBUTES\/FORTUNE:|BAD ATTRIBUTES\/MISFORTUNE:|REMEDIES\/MITIGATION:|REMEDY FOR THIS TRECENA:|RITUALS DURING THIS TRECENA:|CIHUATETEOH ACTIVITY:|ILLNESS DURING THIS SIGN:|UNIVERSAL LUCK NOTE FOR THIS TRECENA:|NUMERICAL INFLUENCE ON HOUSES:|NOTE:|<LUCK>:|<BAPTISM>:|<UMBILICAL CORD RITUALS>:|<GOOD ATTRIBUTES\/FORTUNE>:|<BAD ATTRIBUTES\/MISFORTUNE>:|<REMEDIES\/MITIGATION>:|<REMEDY FOR THIS TRECENA>:|<RITUALS DURING THIS TRECENA>:|<CIHUATETEOH ACTIVITY>:|<ILLNESS DURING THIS SIGN>:|<UNIVERSAL LUCK NOTE FOR THIS TRECENA>:|<NUMERICAL INFLUENCE ON HOUSES>:|<NOTE>:|GENERAL NOTES\/RULERS\/RITUALS:|<GENERAL NOTES\/RULERS\/RITUALS>:)/gi, (match) => `<strong>${match.replace(/[<>:]/g, '').trim()}:</strong>`);

        tonalliMeaningContainerEl.innerHTML = fullMeaningText;
    }
    // --- END OF MEANING DISPLAY ---

    const dateForCycle = result.selectedDate; // Use the stored selectedDate for consistency
    const fireCycleInfo = getNewFireInfo(dateForCycle);
    if (fireCycleInfo) {
        cycleRangeTextEl.textContent = translations[currentLang].cycleDateText.replace('{startYear}', fireCycleInfo.startYear).replace('{endYear}', fireCycleInfo.endYear);
        const nextDateFormatted = fireCycleInfo.nextDate.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        nextCeremonyTextEl.textContent = translations[currentLang].nextCeremonyDateText.replace('{nextDate}', nextDateFormatted);
    } else {
        cycleRangeTextEl.textContent = '';
        nextCeremonyTextEl.textContent = '';
    }

    // SUNS CALCULATION PART - UPDATED
    const sun5_start_calc = new Date(Date.UTC(-legendOfSunsData.sun5_start_year_BC + 1, 0, 1)); // Correct for BC year
    const sun4_start_calc = new Date(sun5_start_calc); sun4_start_calc.setUTCFullYear(sun5_start_calc.getUTCFullYear() - (legendOfSunsData.sun4_duration + legendOfSunsData.sun4_flood));
    const sun3_start_calc = new Date(sun4_start_calc); sun3_start_calc.setUTCFullYear(sun4_start_calc.getUTCFullYear() - legendOfSunsData.sun3_duration);
    const sun2_start_calc = new Date(sun3_start_calc); sun2_start_calc.setUTCFullYear(sun3_start_calc.getUTCFullYear() - legendOfSunsData.sun2_duration);
    const sun1_start_calc = new Date(sun2_start_calc); sun1_start_calc.setUTCFullYear(sun2_start_calc.getUTCFullYear() - legendOfSunsData.sun1_duration);
    const sunDates = [sun1_start_calc, sun2_start_calc, sun3_start_calc, sun4_start_calc, sun5_start_calc];

    let sunsHTML = `<p>${translations[currentLang].daysFromSunsPreamble}</p>`; // Key can remain, placeholder changed
    const currentYearForSuns = dateForCycle.getUTCFullYear();

    sunDates.forEach((sunStartDate, index) => {
        if (sunStartDate && !isNaN(sunStartDate.getTime())) {
            const sunStartYear = sunStartDate.getUTCFullYear(); // Can be negative for BC
            let yearsPassed = currentYearForSuns - sunStartYear;

            // Adjust if one date is BC and other is AD, as there's no year 0 in common counting
            if (currentYearForSuns > 0 && sunStartYear <= 0) { // sunStartYear can be 0 if it's 1 BC due to Date obj
                 yearsPassed -=1;
            }

            const yearString = Math.abs(Math.floor(yearsPassed)).toLocaleString(currentLang);
            sunsHTML += `<div>${translations[currentLang]['daysFromSun' + (index + 1)].replace('{years}', yearString)}</div>`;
        } else {
             sunsHTML += `<div>${translations[currentLang]['daysFromSun' + (index + 1)].replace('{years}', 'N/A (Date Error)')}</div>`;
        }
    });
    daysFromSunsTextEl.innerHTML = sunsHTML;

    if (dateForCycle.getTime() > legendOfSunsData.fifth_sun_end_date.getTime()) {
        const fifthSunEndYear = legendOfSunsData.fifth_sun_end_date.getUTCFullYear();
        let diffYearsSinceEnd = currentYearForSuns - fifthSunEndYear;
        // No BC/AD adjustment needed here as 2012 AD is the anchor for end
        const yearString = Math.abs(Math.floor(diffYearsSinceEnd)).toLocaleString(currentLang);
        const endDateFormatted = legendOfSunsData.fifth_sun_end_date.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        fifthSunEndTextEl.textContent = translations[currentLang].fifthSunEndedText.replace('{years}', yearString).replace('{endDate}', endDateFormatted);
    } else {
        fifthSunEndTextEl.textContent = translations[currentLang].fifthSunEndText;
    }
    sunsCalculationExplanationEl.textContent = translations[currentLang].sunsCalculationExplanation;
    // END OF SUNS CALCULATION PART - UPDATED


    // XIUHPOHUALLI
    const veintenaData = getXiuhpohualliVeintena(dateForCycle);
    if (veintenaData && veintenaData.nameData) {
        const veintenaDisplayName = currentSpelling === 'ortho' ? veintenaData.nameData.nahuatl_ortho : (veintenaData.nameData.nahuatl_phonetic || veintenaData.nameData.nahuatl_ortho);
        const veintenaTranslatedName = veintenaData.nameData[currentLang] || veintenaData.nameData.es;
        const veintenaApproxGreg = veintenaData.nameData.approx_gregorian || '';

        xiuhpohualliVeintenaNameEl.textContent = `${veintenaDisplayName} (${veintenaTranslatedName})`;
        xiuhpohualliVeintenaApproxGregorianEl.textContent = `(${veintenaApproxGreg})`;
        if (veintenaData.isNemontemi) {
            xiuhpohualliVeintenaDayEl.textContent = translations[currentLang].nemontemiDayText.replace('{day}', veintenaData.day);
        } else {
             xiuhpohualliVeintenaDayEl.textContent = translations[currentLang].veintenaDayText.replace('{day}', veintenaData.day).replace('{veintenaName}', veintenaTranslatedName);
        }
        xiuhpohualliVeintenaMeaningEl.textContent = veintenaData.nameData['meaning_' + currentLang] || veintenaData.nameData.meaning_es || '';
    } else {
        xiuhpohualliVeintenaNameEl.textContent = translations[currentLang].errorCalculation;
        xiuhpohualliVeintenaApproxGregorianEl.textContent = '';
        xiuhpohualliVeintenaDayEl.textContent = '';
        xiuhpohualliVeintenaMeaningEl.textContent = '';
    }
}

function displayError(errorKey) {
    clearGregToTonResults(); // Clear main results area
    clearTonToGregResults(); // Clear reverse results area

    errorMessageEl.dataset.key = errorKey; // Store the key for language changes
    errorMessageEl.textContent = translations[currentLang]?.[errorKey] || translations.es[errorKey]; // Fallback to Spanish if key not in current lang
    errorMessageEl.style.display = 'block';

    // Decide which container to show based on mode, even on error
    if (currentCalculatorMode === 'gregorianToTonalli') {
        resultContainer.style.display = 'block'; // Show result container to hold error message contextually
        // Optionally clear specific result fields further if needed, though clearGregToTonResults does a lot
        const errorElementsToClear = [ resultYearTonalliEl, resultDayTonalliMainEl, resultTrecenaEl];
        errorElementsToClear.forEach(el => { if(el) el.textContent = ''; });
        if (tonalliMeaningContainerEl) tonalliMeaningContainerEl.innerHTML = ''; // Clear prophecy
        if (daySignGlyphEl) daySignGlyphEl.style.display = 'none';
        reverseResultsContainerEl.style.display = 'none';
    } else { // tonalliToGregorian mode
         resultContainer.style.display = 'none';
         reverseResultsContainerEl.style.display = 'block'; // Show reverse result container for error
    }
}

function clearGregToTonResults() {
    lastResult = null; // Clear stored last result
    resultContainer.style.display = 'none';
    const resultElementsToClear = [
        resultYearTonalliEl, resultYearTonalliTransEl,
        resultDayTonalliMainEl, resultDayTonalliTransEl,
        resultTrecenaEl, resultTrecenaTransEl,
        cycleRangeTextEl, nextCeremonyTextEl,
        daysFromSunsTextEl, fifthSunEndTextEl, sunsCalculationExplanationEl,
        xiuhpohualliVeintenaNameEl, xiuhpohualliVeintenaApproxGregorianEl,
        xiuhpohualliVeintenaDayEl, xiuhpohualliVeintenaMeaningEl
    ];
    resultElementsToClear.forEach(el => { if(el) el.textContent = ''; });
    if (tonalliMeaningContainerEl) tonalliMeaningContainerEl.innerHTML = '';
    if (daySignGlyphEl) daySignGlyphEl.style.display = 'none';
}

function clearTonToGregResults() {
    if (reverseResultsListEl) reverseResultsListEl.innerHTML = '';
    if (reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
}

function clearAllErrorMessages(){
     if(errorMessageEl) {
        errorMessageEl.textContent = '';
        errorMessageEl.style.display = 'none';
        errorMessageEl.dataset.key = '';
     }
}

document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
    const todayDay = ('0' + today.getDate()).slice(-2);
    if(dateInput) dateInput.value = `${todayYear}-${todayMonth}-${todayDay}`;

    if(startYearInputEl) startYearInputEl.value = todayYear;
    if(endYearInputEl) endYearInputEl.value = todayYear;

    populateTonalliInputs(); // Populates dropdowns for T->G mode
    setLanguage('es');    // Default language
    setSpelling('ortho'); // Default spelling

    // Hide result containers initially
    if(resultContainer) resultContainer.style.display = 'none';
    if(errorMessageEl) errorMessageEl.style.display = 'none';
    if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
    if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'none'; // Initially hide T->G mode

    if(calculateBtn) calculateBtn.addEventListener('click', calculateTonalli);
    if(todayBtn) todayBtn.addEventListener('click', () => {
        if(modeGregToTonBtn && !modeGregToTonBtn.classList.contains('active')) {
             modeGregToTonBtn.click(); // Switch to G->T mode if not already active
        }
        const today = new Date();
        if(dateInput) dateInput.value = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
        calculateTonalli();
    });
    if(calculateGregorianBtn) calculateGregorianBtn.addEventListener('click', calculateGregorianFromTonalli);

    if(langSwitcher) langSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.lang && !e.target.classList.contains('active')) {
            setLanguage(e.target.dataset.lang);
        }
    });
    if(spellingSwitcher) spellingSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.spelling && !e.target.classList.contains('active')) {
            setSpelling(e.target.dataset.spelling);
        }
    });

    if(modeGregToTonBtn) modeGregToTonBtn.addEventListener('click', () => {
        currentCalculatorMode = 'gregorianToTonalli';
        if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'flex'; // Or 'block' based on your CSS
        if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'none';
        if(resultContainer) resultContainer.style.display = lastResult ? 'block' : 'none';
        if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
        modeGregToTonBtn.classList.add('active');
        if (modeTonToGregBtn) modeTonToGregBtn.classList.remove('active');
        clearAllErrorMessages();
        if (lastResult) {
            displayResult(lastResult);
        } else if (dateInput && dateInput.value && (!errorMessageEl || !errorMessageEl.textContent || errorMessageEl.style.display === 'none') ) {
             // calculateTonalli(); // Recalculate if there's a date and no error
        }
    });

    if(modeTonToGregBtn) modeTonToGregBtn.addEventListener('click', () => {
        currentCalculatorMode = 'tonalliToGregorian';
        if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'none';
        if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'flex'; // Or 'block'
        if(resultContainer) resultContainer.style.display = 'none';
        if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = (reverseResultsListEl && reverseResultsListEl.hasChildNodes()) ? 'block' : 'none';
        modeTonToGregBtn.classList.add('active');
        if(modeGregToTonBtn) modeGregToTonBtn.classList.remove('active');
        clearAllErrorMessages();
    });

    // Initial calculation on page load only if G->T mode is active and there's a date
    if (currentCalculatorMode === 'gregorianToTonalli' && dateInput && dateInput.value && (!errorMessageEl || !errorMessageEl.textContent || errorMessageEl.style.display === 'none') ) {
        calculateTonalli();
    } else {
        // Ensure G->T mode is visibly active by default if no other logic sets it
        if(modeGregToTonBtn) modeGregToTonBtn.classList.add('active');
        if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'flex';
    }
});