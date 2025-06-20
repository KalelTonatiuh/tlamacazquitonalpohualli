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
        tonalliMeaningTitle: "Profecía del Tonalli del Día:",
        trecenaTitle: "Trecena",
        newFireCycleTitle: "Ciclo del Fuego Nuevo (Xiuhmolpilli)",
        cycleDateText: "Esta fecha pertenece al ciclo de 52 años de {startYear} - {endYear}.",
        nextCeremonyDateText: "La próxima ceremonia del Fuego Nuevo será el {nextDate}.",
        legendOfSunsTitle: "Leyenda de los Soles (Codex Chimalpopoca)",
        daysFromSunsPreamble: "La fecha seleccionada está a:",
        daysFromSun1: "{years} años del inicio del 1er Sol (4 Jaguar).",
        daysFromSun2: "{years} años del inicio del 2º Sol (4 Viento).",
        daysFromSun3: "{years} años del inicio del 3er Sol (4 Lluvia).",
        daysFromSun4: "{years} años del inicio del 4º Sol (4 Agua).",
        daysFromSun5: "{years} años del inicio del 5º Sol (4 Movimiento).",
        fifthSunEndText: "El 5º Sol, de acuerdo a la mitología, terminará en un día 4 Movimiento.",
        fifthSunEndedText: "Han pasado {years} años desde el fin interpretado del 5º Sol el {endDate}.",
        sunsCalculationTitle: "Base del Cálculo de los Soles:",
        sunsCalculationExplanation: "Anclaje del Códice (1558): El 5º Sol comenzó 2513 años antes, en el 955 a.C. Las eras anteriores se calculan hacia atrás basándose en las duraciones míticas: 1er Sol (676 años), 2º Sol (364 años), 3er Sol (312 años), 4º Sol (676 años + 52 de diluvio).",
        meaningNotFound: "La profecía para esta entrada específica aún no ha sido añadida.",
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
        tonalliMeaningTitle: "Prophecy of the Day's Tonalli:",
        trecenaTitle: "Trecena",
        newFireCycleTitle: "New Fire Cycle (Xiuhmolpilli)",
        cycleDateText: "This date belongs to the 52-year cycle of {startYear} - {endYear}.",
        nextCeremonyDateText: "The next New Fire Ceremony will be on {nextDate}.",
        legendOfSunsTitle: "Legend of the Suns (Codex Chimalpopoca)",
        daysFromSunsPreamble: "The selected date is:",
        daysFromSun1: "{years} years from the start of the 1st Sun (4 Jaguar).",
        daysFromSun2: "{years} years from the start of the 2nd Sun (4 Wind).",
        daysFromSun3: "{years} years from the start of the 3rd Sun (4 Rain).",
        daysFromSun4: "{years} years from the start of the 4th Sun (4 Water).",
        daysFromSun5: "{years} years from the start of the 5th Sun (4 Movement).",
        fifthSunEndText: "The 5th Sun, according to mythology, will end on a day 4 Movement.",
        fifthSunEndedText: "{years} years have passed since the interpreted end of the 5th Sun on {endDate}.",
        sunsCalculationTitle: "Basis for the Suns Calculation:",
        sunsCalculationExplanation: "Codex Anchor (1558): The 5th Sun began 2513 years prior, in 955 BC. Previous eras are calculated backward based on their mythic durations: 1st Sun (676 yrs), 2nd Sun (364 yrs), 3rd Sun (312 yrs), 4th Sun (676 yrs + 52 for the flood).",
        meaningNotFound: "The prophecy for this specific entry has not yet been added.",
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
    },
    mayaNumeralGlyphs: [
        null, 
        "glyphs/maya_1.png", "glyphs/maya_2.png", "glyphs/maya_3.png", "glyphs/maya_4.png",
        "glyphs/maya_5.png", "glyphs/maya_6.png", "glyphs/maya_7.png", "glyphs/maya_8.png",
        "glyphs/maya_9.png", "glyphs/maya_10.png", "glyphs/maya_11.png", "glyphs/maya_12.png",
        "glyphs/maya_13.png"
    ]
};

const legendOfSunsData = {
    sun1_duration: 676, sun2_duration: 364, sun3_duration: 312, sun4_duration: 676,
    sun4_flood: 52, sun5_start_year_BC: 955,
    fifth_sun_end_date: new Date(Date.UTC(2012, 11, 21))
};

// --- XIUHPOHUALLI DATA (FULL) ---
const xiuhpohualliData = {
    anchorGregorianDate: new Date(Date.UTC(1922, 1, 26)), // Example: Feb 26, 1922
    veintenas: [
        {
            nahuatl_ortho: "Atlcahualo", es: "Atlcahualo", en: "Atlcahualo",
            approx_gregorian: "ca. Feb 26–Mar 17",
            meaning_es: "Dedicado a las deidades del agua. Los niños eran ataviados con ricas galas y llevados en literas adornadas con plumas y flores. La gente caminaba delante tocando música, cantando y bailando. Si los niños lloraban, se consideraba un buen augurio para las lluvias. Los dueños de cautivos, ricamente adornados con plumas, desfilaban y bailaban demostrando su valor. Estas ceremonias se realizaban diariamente durante este mes.",
            meaning_en: "Dedicated to the water deities. Children were dressed in rich finery and carried on litters adorned with feathers and flowers. People walked ahead playing music, singing, and dancing. If children cried, it was taken as a good omen for rain. Owners of captives, splendidly adorned with feathers, would parade and dance, displaying their courage. These ceremonies took place daily during this month."
        },
        {
            nahuatl_ortho: "Tlacaxipehualiztli", es: "Tlacaxipehualiztli", en: "Tlacaxipehualiztli",
            approx_gregorian: "ca. Mar 18–Abr 6",
            meaning_es: "En el calpul, frente al fuego, los dueños de los cautivos guardaban cabello de la coronilla de estos como reliquias. Los señores de los cautivos los arrastraban por el cabello hacia el templo. Algunos participantes se vestían con pieles (de rituales anteriores) y realizaban escaramuzas y simulacros de batallas, capturándose unos a otros. Otros participantes luchaban atados por la cintura con una cuerda a una piedra redonda, usando armas contra cuatro guerreros que los enfrentaban uno por uno.",
            meaning_en: "At the calpul, in front of the fire, owners of captives kept hair from their crowns as relics. The captives' lords would drag them by their hair towards the temple. Some participants would wear skins (from previous rituals) and engage in skirmishes and mock battles, capturing one another. Other participants fought while tied by the waist with a rope to a round stone, using weapons against four warriors who confronted them one by one."
        },
        {
            nahuatl_ortho: "Tozoztontli", es: "Tozoztontli", en: "Tozoztontli",
            approx_gregorian: "ca. Abr 7–26",
            meaning_es: "Dedicado a Coatlicue (o Coatlantonan) por los especialistas en flores (xochimanque). Se ofrecían las primeras flores del año en el templo Yopico; nadie osaba oler una flor antes de esta ofrenda. Los que habían portado pieles el mes anterior, se las quitaban y las llevaban en procesión ceremonial a una cueva en Yopico, despidiendo mal olor; luego se lavaban ceremoniosamente. Algunos enfermos hacían votos de asistir a esta procesión para sanar. Los dueños de cautivos y sus familias hacían penitencia por veinte días, sin bañarse ni lavarse la cabeza, hasta que las pieles eran depositadas en la cueva. Finalizada la penitencia, se bañaban, lavaban, e invitaban a parientes y amigos a un festín, realizando ceremonias con reliquias de los cautivos. Durante estos veinte días, ensayaban cantos sentados en el cuicacalli, alabando a sus deidades.",
            meaning_en: "Dedicated to Coatlicue (or Coatlantonan) by flower specialists (xochimanque). The first flowers of the year were offered at the Yopico temple; no one dared to smell a flower before this offering. Those who had worn skins the previous month removed them and carried them in a ceremonial procession to a cave at Yopico, giving off a foul odor; afterward, they washed ceremoniously. Some sick people vowed to attend this procession to heal. Captive owners and their households performed penance for twenty days, not bathing or washing their heads until the skins were placed in the cave. After the penance, they bathed, washed, and invited relatives and friends to a feast, performing ceremonies with relics of the captives. During these twenty days, they rehearsed songs while seated in the cuicacalli, praising their deities."
        },
        {
            nahuatl_ortho: "Huey Tozoztli", es: "Huey Tozoztli", en: "Huey Tozoztli",
            approx_gregorian: "ca. Abr 27–May 16",
            meaning_es: "Dedicado a Chicomecoatl (deidad del maíz). Se colocaban cañas en las puertas de las casas. Los nobles y ricos cubrían sus casas con ramas de acxoyatl. También ponían ramas para sus deidades y arreglaban flores para las que tenían en casa. Hecho esto, iban a los maizales, traían tallos de maíz pequeños, los adornaban con flores y los colocaban ante sus deidades en el calpulli, junto con comida. Después, iban al templo de Chicomecoatl y escaramuzaban ante ella como en batalla. Las jóvenes llevaban mazorcas del año anterior en sus espaldas en procesión para ofrecerlas a Chicomecoatl, luego las regresaban a casa como objetos benditos para semilla del próximo año, guardándolas en el corazón de los graneros. Con masa de tzoalli, hacían una imagen de esta deidad en el patio de su templo y ofrecían ante ella todo tipo de maíz, frijol y chía, por ser ella la inventora y dadora de estos alimentos.",
            meaning_en: "Dedicated to Chicomecoatl (deity of maize). Reeds were placed at the doors of houses. Nobles and wealthy people covered their houses with acxoyatl branches. They also set out branches for their deities and arranged flowers for those they had in their homes. After this, they went to the maize fields, brought back small maize stalks, adorned them with flowers, and placed them before their deities in the calpulli, along with food. Afterward, they went to the temple of Chicomecoatl and skirmished before her as if in battle. Young girls carried maize cobs from the previous year on their backs in a procession to offer them to Chicomecoatl, then brought them back home as blessed items for next year's seed, storing them in the heart of the granaries. With tzoalli dough, they made an image of this deity in the patio of her temple and offered before her every type of maize, bean, and chia, as she was considered the inventor and giver of these life-sustaining foods."
        },
        {
            nahuatl_ortho: "Toxcatl", es: "Toxcatl", en: "Toxcatl",
            approx_gregorian: "ca. May 17–Jun 5",
            meaning_es: "Festival muy importante, dedicado a Tezcatlipoca. Un joven apuesto, elegido y criado durante un año, representaba a la deidad. Caminaba por la ciudad bien ataviado, con flores en mano y sirvientes, saludando cortésmente; la gente se postraba y lo adoraba. Veinte días antes del festival, se le daban cuatro jóvenes hermosas como compañeras; le cambiaban la ropa, le cortaban el cabello como a un capitán y le daban vestiduras más elegantes. Cinco días antes de la ceremonia principal, se le celebraban fiestas y banquetes en lugares frescos, acompañado por muchos nobles. El día señalado, era llevado al templo Tlacochcalco. En un lugar llamado Tlapitzahuayan, las mujeres se apartaban de él. Al llegar al lugar de la ceremonia, subía los escalones solo, rompiendo en cada uno una de las flautas que había tocado durante el año.",
            meaning_en: "A very important festival, dedicated to Tezcatlipoca. A handsome young man, chosen and reared for a year, impersonated the deity. He would walk through the town well-attired, holding flowers, with attendants, graciously greeting those he met; people would prostrate themselves and worship him. Twenty days before the festival, he was given four beautiful maidens as companions; his clothes were changed, his hair cut like a captain's, and he was given more gallant garments. Five days before the main ceremony, feasts and banquets were held for him in cool places, accompanied by many nobles. On the appointed day, he was taken to the Tlacochcalco temple. At a place called Tlapitzahuayan, the women would leave him. Upon reaching the place of ceremony, he would climb the steps alone, smashing one of the flutes he had played all year on each step."
        },
        {
            nahuatl_ortho: "Etzalcualiztli", es: "Etzalcualiztli", en: "Etzalcualiztli",
            approx_gregorian: "ca. Jun 6–25",
            meaning_es: "Para celebrar este festival, los sátrapas y ministros de los ídolos iban a Citlaltepec a recoger juncos de un cuerpo de agua llamado Temilco para adornar los templos. Nadie aparecía en su camino; si encontraban a alguien, le quitaban sus pertenencias, y si se defendía, lo maltrataban. Esto no se castigaba por ser ministros. Realizaban muchas ceremonias durante cuatro días. Al comenzar el festival de Etzalcualiztli, todos hacían una especie de potaje llamado etzalli, comían en casa y daban a los visitantes, cometiendo 'mil locuras'. Los ministros que erraban en su servicio eran severamente castigados en el agua de la laguna; sus parientes los llevaban medio muertos a casa.",
            meaning_en: "To celebrate this festival, the satraps and ministers of the idols went to Citlaltepec to gather reeds from a body of water called Temilco to adorn the temples. No one would appear on their path; if they met someone, they would take their belongings, and if the person defended themselves, they would be roughed up. This was not punished as they were ministers. They performed many ceremonies for four days. When the festival of Etzalcualiztli began, everyone made a type of porridge called etzalli, ate at home, and gave some to visitors, committing 'a thousand follies'. Ministers who erred in their service were severely punished in the lagoon water; their relatives would take them home half-dead."
        },
        {
            nahuatl_ortho: "Tecuilhuitontli", es: "Tecuilhuitontli", en: "Tecuilhuitontli",
            approx_gregorian: "ca. Jun 26–Jul 15",
            meaning_es: "Dedicado a Huixtocíhuatl, deidad de la sal y hermana mayor de los Tlaloque (deidades de la lluvia). En la víspera, todas las mujeres (ancianas, doncellas y niñas) cantaban y danzaban, sujetándose con cuerdas cortas llamadas xochimecatl. Llevaban guirnaldas de flores de iztauhyatl (ajenjo de esta tierra). Hombres mayores guiaban el canto. Una mujer, imagen de la diosa, iba en medio ricamente ataviada. La noche anterior, las mujeres velaban con la personificadora, cantando y bailando. Al amanecer, los sátrapas se vestían y realizaban un areito solemne, todos con flores cempoalxóchitl. El báculo de caña de Huixtocíhuatl se decoraba con papel y Olli. Las mujeres salineras danzaban para honrarla, portando sobre sus cabezas un cordón de flores (Xochimecatl) y una guirnalda de Iztauhyatl; estas personificadoras se llamaban Huixtoti. Había gran borrachera.",
            meaning_en: "Dedicated to Huixtocihuatl, deity of salt and elder sister of the Tlaloque (rain deities). On the eve, all women (elderly, maidens, and young girls) would sing and dance, holding short ropes called xochimecatl. They wore garlands of iztauhyatl (wormwood) flowers. Older men guided the singing. A woman, impersonating the goddess, was in the middle, richly adorned. The night before, women kept vigil with the impersonator, singing and dancing. At daybreak, satraps dressed up and performed a solemn areito, everyone holding cempoalxochitl flowers. Huixtocihuatl's reed staff was decorated with paper and Olli. Women salt-makers danced to honor her, carrying a cord of flowers (Xochimecatl) over their heads and a garland of Iztauhyatl; these impersonators were called Huixtoti. There was great revelry and drinking."
        },
        {
            nahuatl_ortho: "Huey Tecuilhuitl", es: "Huey Tecuílhuitl", en: "Huey Tecuílhuitl",
            approx_gregorian: "ca. Jul 16–Ago 4",
            meaning_es: "Dedicado a Xilonen. Se alimentaba a hombres y mujeres, jóvenes y viejos, por ocho días antes del festival. Por la mañana, bebían chianpinolli (atole de maíz). Al mediodía, se sentaban en hileras por rango y recibían tamales (los que cupieran en una mano; tomar más era castigado). Esto era para consolar a los pobres. Danzaban y giraban por ocho días, hombres y mujeres juntos en el areito, muy bien vestidos con ropas ricas y joyas. Las mujeres llevaban el cabello suelto. El areito comenzaba al atardecer hasta la novena hora, con muchas luces, antorchas de resina y braseros en el patio. Los danzantes se tomaban de las manos o se abrazaban. Un día antes de la ceremonia principal para Xilonen, las servidoras del templo (cihuatlamacazqueh) realizaban un areito en el patio del templo, cantando alabanzas a la diosa, rodeando a la mujer que la personificaba, quien iba vestida con los ornamentos de la diosa. Velaban toda la noche cantando y bailando. Al amanecer, nobles y guerreros realizaban un areito en el mismo patio. La personificadora danzaba con ellos y otras mujeres vestidas como ella; los hombres adelante, las mujeres detrás.",
            meaning_en: "Dedicated to Xilonen. Men and women, young and old, were fed for eight days before the festival. In the morning, they drank chianpinolli (maize porridge). At noon, they sat in rows by rank and received tamales (as many as one hand could hold; taking more was punished). This was to console the poor. They danced and twirled for eight days, men and women together in the areito, very finely dressed in rich clothes and jewels. Women wore their hair unbound. The areito began at sunset until the ninth hour, with many lights, resin torches, and braziers in the patio. Dancers held hands or embraced. One day before the main ceremony for Xilonen, temple servant women (cihuatlamacazqueh) performed an areito in the temple patio, singing praises to the goddess, surrounding the woman impersonating her, who was dressed in the goddess's ornaments. They kept vigil all night, singing and dancing. At daybreak, nobles and warriors performed an areito in the same patio. The impersonator danced with them and other women dressed like her; men danced ahead, women behind."
        },
        {
            nahuatl_ortho: "Tlaxochimaco", es: "Tlaxochimaco", en: "Tlaxochimaco",
            approx_gregorian: "ca. Ago 5–24",
            meaning_es: "La noche anterior, todos preparaban comida, incluyendo tamales. En la mañana del festival, los sátrapas adornaban a Huitzilopochtli con muchas flores. Luego, adornaban las estatuas de otros dioses con guirnaldas y collares de flores. También adornaban las estatuas en los calpules y telpuchcales, y la gente adornaba las estatuas en sus casas. Después de adornar todas las estatuas, comenzaban a comer los platillos preparados. Poco después, iniciaba una danza o baile donde los nobles bailaban con las mujeres, tomados de la mano y abrazados. No bailaban al estilo del areite, sino paso a paso al son de los músicos y cantantes, que se situaban cerca de un altar redondo (momoztli). Este canto duraba hasta la noche, tanto en los patios de los templos como en las casas. Los ancianos y ancianas bebían octli (pulque), pero los jóvenes no, bajo pena de castigo.",
            meaning_en: "The night before, everyone prepared food, including tamales. On the morning of the festival, satraps adorned Huitzilopochtli with many flowers. Then, they adorned the statues of other gods with wreaths, strings, and necklaces of flowers. Statues in the calpuls and telpuchcales were also adorned, and people adorned the statues in their homes. After all statues were adorned, they began to eat the prepared dishes. Soon after, a dance or ball began where noblemen danced with women, holding hands and embracing. They did not dance in the style of the areite, but step by step to the sound of musicians and singers, who stood near a round altar (momoztli). This singing lasted until nighttime, in temple patios and homes. Older men and women drank octli (pulque), but young people did not, under penalty of punishment."
        },
        {
            nahuatl_ortho: "Xocotl Huetzi", es: "Xócotl Huetzi", en: "Xócotl Huetzi",
            approx_gregorian: "ca. Ago 25–Sep 13",
            meaning_es: "Durante Tlaxochimaco, se cortaba un árbol alto, se llevaba al patio del dios Xocotl, se podaba y se erigía. En la víspera de Xocotl Huetzi, se bajaba con cuidado. En la mañana de la víspera, carpinteros lo alisaban. Adornado con papeles, se ataba con cuerdas y se erigía con gritos. Una imagen del dios (de masa tzoalli) se colocaba en la cima. Aquellos que participarían en el ritual del fuego se adornaban con plumajes y atuendos ricos, tiñendo sus cuerpos de amarillo (librea del fuego). Realizaban un areito todo el día hasta la noche. Los participantes en el ritual velaban toda la noche en el templo y se les empolvaba la cara con yiauhtli. Luego, los jóvenes cargaban con fuerza hacia la estatua en la cima del árbol.",
            meaning_en: "During Tlaxochimaco, a tall tree was cut, taken to the patio of the god Xocotl, pruned, and erected. On the eve of Xocotl Huetzi, it was carefully lowered. On the morning of the eve, carpenters smoothed it. Adorned with papers, it was tied with ropes and erected with shouts. An image of the god (of tzoalli dough) was placed at the top. Those participating in the fire ritual adorned themselves with rich plumages and attire, staining their bodies yellow (livery of fire). They performed an areito all day until night. Participants in the ritual kept vigil all night at the temple and had their faces powdered with yiauhtli. Then, young men charged forcefully towards the statue at the top of the tree."
        },
        {
            nahuatl_ortho: "Ochpaniztli", es: "Ochpaniztli", en: "Ochpaniztli",
            approx_gregorian: "ca. Sep 14–Oct 3",
            meaning_es: "Dedicado a Teteoh innan. Cinco días antes, terminaban las fiestas del mes anterior. Al comenzar Ochpaniztli, se danzaba por ocho días sin canto ni teponaztli. Luego, salía la mujer imagen de la diosa Teteoh innan, con sus ornamentos, acompañada por muchas mujeres, especialmente curanderas y parteras. Se dividían en dos equipos y luchaban arrojándose bolas de pachtli, hojas de nopal, bolas de hojas de tule y flores cempoalxóchitl. Esta alegría duraba cuatro días. En la noche de la ceremonia principal, la mujer personificadora era vestida ricamente y llevada al templo. Un joven realizaba rituales en el templo de Huitzilopochtli. Durante este mes, el señor inspeccionaba un desfile de guerreros y jóvenes que nunca habían ido a la guerra, les daba armas e insignias, y eran promovidos a soldados.",
            meaning_en: "Dedicated to Teteoh innan. Five days before, previous month's festivities ended. As Ochpaniztli began, people danced for eight days without singing or teponaztli. Then, the woman impersonating the goddess Teteoh innan came out with her ornaments, accompanied by many women, especially healers and midwives. They divided into two teams and fought by pelting each other with pachtli balls, prickly pear leaves, cattail leaf balls, and cempoalxochitl flowers. This merrymaking lasted four days. On the night of the main ceremony, the woman impersonator was richly dressed and taken to the temple. A youth then performed rituals at the temple of Huitzilopochtli. During this month, the lord inspected a parade of warriors and young men who had never gone to war, gave them weapons and insignias, and they were promoted to soldiers."
        },
        {
            nahuatl_ortho: "Teotleco", es: "Teotleco", en: "Teotleco",
            approx_gregorian: "ca. Oct 4–23",
            meaning_es: "El día 15, jóvenes cubrían con ramas altares y adoratorios; recibían maíz por ello. El día 18, llegaba el dios joven Tlamatzincatl (Titlacahuan). Se ofrecía comida en su templo. Esa tarde, todos comían, bebían y se alegraban, especialmente los ancianos que bebían vino (lavando los pies del dios). La gran fiesta era el último día del mes, cuando llegaban todos los dioses. La víspera por la noche, hacían un montoncito de harina de maíz en forma de queso sobre un petate; los dioses dejaban una huella como señal de su llegada. El sátrapa principal vigilaba, y al ver la huella, gritaba \"¡Nuestro señor ha llegado!\". Los ministros tocaban instrumentos. La gente ofrecía comida en todos los templos y adoratorios, alegrándose de nuevo (lavando los pies de los dioses). Los dioses mayores llegaban al día siguiente.",
            meaning_en: "On the 15th day, young men and boys covered altars and shrines with branches, receiving maize for this service. On the 18th day, the young god Tlamatzincatl (Titlacahuan) arrived. Food was offered in his temple. That evening, everyone ate, drank, and made merry, especially the elders who drank wine (washing the god's feet). The great festival was on the last day of the month, when all the gods arrived. On the eve, at night, a small mound of cornmeal shaped like cheese was made on a petate; the gods would leave a footprint as a sign of arrival. The head satrap watched, and upon seeing the footprint, cried, \"Our lord has arrived!\" Temple ministers played instruments. People offered food at all temples and shrines, again making merry (washing the gods' feet). The older gods arrived the next day."
        },
        {
            nahuatl_ortho: "Tepeilhuitl", es: "Tepeílhuitl", en: "Tepeílhuitl",
            approx_gregorian: "ca. Oct 24–Nov 12",
            meaning_es: "En honor a las montañas y a los que morían ahogados o no podían ser cremados. Hacían serpientes de madera o raíces, y trozos de madera largos llamados Ehecatotontin. Los vestían con masa tzoal como montañas con cabeza de persona. Estas imágenes se colocaban en altares con ceremonias, se les ofrecían tamales y otros platillos, se cantaban alabanzas y se bebía vino en su honor. En el festival, cuatro mujeres (Tepoxoch, Matlacueye, Xochtecatl, Mayahuel) y un hombre (Milnahuatl) eran adornados con papeles con ulli y llevados en literas por mujeres ricamente vestidas. Después de las ceremonias con ellos, los papeles que adornaban las imágenes de las montañas se colgaban en el calpul.",
            meaning_en: "In honor of the mountains and those who drowned or could not be cremated. They made snakes of wood or roots, and long pieces of wood called Ehecatotontin. These and the snakes were dressed with tzoal dough, shaped like mountains with a person's head. These images were placed on altars with ceremonies, offered tamales and other dishes; praises were sung, and wine was drunk in their honor. At the festival, four women (Tepoxoch, Matlacueye, Xochtecatl, Mayahuel) and one man (Milnahuatl) were adorned with papers with ulli and carried on litters by richly dressed women. After the ceremonies with them, the papers that adorned the mountain images were hung in the calpul."
        },
        {
            nahuatl_ortho: "Quecholli", es: "Quecholli", en: "Quecholli",
            approx_gregorian: "ca. Nov 13–Dic 2",
            meaning_es: "Dedicado a Mixcoatl. Durante cuatro días se hacían flechas y dardos. Durante cinco días, la gente realizaba penitencia para la caza de venados, absteniéndose de ciertas actividades; los que no cumplían eran despojados de sus capas. Al final de los cuatro días de hacer flechas, hacían flechitas y las ataban en manojos de cuatro con cuatro antorchas, ofreciéndolas sobre las tumbas de los muertos con dos tamales; permanecían allí un día y se quemaban por la noche. El décimo día, mexicanos y tlatelolcas iban a los cerros Zacatepec. Al llegar, construían jacales de paja, hacían fogatas. Al día siguiente, desayunaban y salían al monte, formando un gran flanco para rodear venados, conejos y otros animales, acorralándolos y cazando. Se realizaban ceremonias con un hombre y una mujer que eran las imágenes del dios Mixcoatl y su esposa.",
            meaning_en: "Dedicated to Mixcoatl. For four days, arrows and darts were made. For five days, people performed penance for deer hunting, abstaining from certain activities; those who did not comply had their capes taken. At the end of the four days of arrow-making, tiny arrows were made and tied in bundles of four with four torches, offered on the graves of the dead with two tamales; they remained there for a day and were burned at night. On the tenth day, Mexicans and Tlatelolcans went to the Zacatepec hills. Upon arrival,
            they built grass cabins (xacales) and made fires. The next day at dawn, they had breakfast and went into the bush, forming a large flank to surround deer, rabbits, and other animals, corralling and hunting them. Ceremonies were performed with a man and a woman who were the images of the god Mixcoatl and his wife."
        },
        {
            nahuatl_ortho: "Panquetzaliztli", es: "Panquetzaliztli", en: "Panquetzaliztli",
            approx_gregorian: "ca. Dic 3–22",
            meaning_es: "Dedicado a Huitzilopochtli. El segundo día, comenzaba un areito y cantos a Huitzilopochtli en el patio de su templo, hombres y mujeres bailando juntos. Empezaba por la tarde y terminaba sobre las diez de la noche, durando veinte días. El noveno día, se preparaba con ceremonias a los que participarían en rituales, pintándolos de colores y adornándolos con papeles; danzaban un areite con ellos, hombre y mujer en pareja cantando y bailando. El día dieciséis, los dueños de esclavos ayunaban. El diecinueve, comenzaban danzas donde todos, hombres y mujeres, se tomaban de las manos y bailaban en línea serpenteante en el patio del templo. Ancianos cantaban y tocaban música. Uno vestido con los ornamentos del dios Painal realizaba rituales en el juego de pelota Teutlachtli. Luego corría, rodeaba la ciudad y realizaba rituales en ciertos lugares. Dos facciones comenzaban una escaramuza. Al final, había cantos, bailes, comida y bebida.",
            meaning_en: "Dedicated to Huitzilopochtli. On the second day, an areito and songs to Huitzilopochtli began in his temple patio, men and women dancing together. It started in the afternoon and ended around ten at night, lasting for twenty days. On the ninth day, those who would participate in rituals were prepared with ceremonies, painted with various colors, and adorned with papers; they danced an areite with them, a man and a woman as a pair singing and dancing. On the sixteenth day, slave owners fasted. On the nineteenth, dances began where everyone, men and women, held hands and danced in a snaking line in the temple patio. Older men sang and played music. One dressed in the ornaments of the god Painal performed rituals in the Teutlachtli ball court. Then he ran, circled the city, and performed rituals in certain places. Two factions would start a skirmish. At the end, there was singing, dancing, eating, and drinking."
        },
        {
            nahuatl_ortho: "Atemoztli", es: "Atemoztli", en: "Atemoztli",
            approx_gregorian: "ca. Dic 23–Ene 11",
            meaning_es: "Dedicado a los Tlaloques (dioses de las montañas y la lluvia). Cuando tronaba, los sátrapas ofrecían copal y perfumes a sus dioses y estatuas. La gente común hacía votos de hacer imágenes de las montañas (tepictli). El día dieciséis, la gente preparaba ofrendas a Tlaloc; hacían penitencia por cuatro días (abstinencia). En la fiesta (último día del mes), cortaban tiras de papel, las ataban a postes en los patios. Hacían imágenes de montañas con tzoal (dientes de semillas de calabaza, ojos de frijoles ayecotli). Presentaban ofrendas de comida, adoraban. Velaban las imágenes con música y cantos. [Simbólicamente] abrían sus pechos con un tzotzopaztli (instrumento de tejer) y [simbólicamente] sacaban corazones y cortaban cabezas. Distribuían el cuerpo de la imagen y lo comían. Quemaban otros ornamentos de las imágenes en los patios. Llevaban cenizas e instrumentos a los adoratorios ayauhcalco. Luego comían, bebían y se alegraban.",
            meaning_en: "Dedicated to the Tlaloques (gods of mountains and rain). When it thundered, satraps offered copal and perfumes to their gods and statues. Common people vowed to make images of the mountains (tepictli). On the sixteenth day, people prepared offerings to Tlaloc; they performed penance for four days (abstinence). At the festival (last day of the month), they cut paper strands, tied them to poles in house patios. They made mountain images from tzoal (teeth from squash seeds, eyes from ayecotli beans). They presented food offerings, worshipped. They kept vigil over the images with music and singing. [Symbolically] they opened their chests with a tzotzopaztli (weaving tool) and [symbolically] took out hearts and cut off heads. They distributed the image's body and ate it. They burned other ornaments from the images in patios. They took ashes and instruments to the ayauhcalco shrines. Then they ate, drank, and made merry."
        },
        {
            nahuatl_ortho: "Tititl", es: "Títitl", en: "Títitl",
            approx_gregorian: "ca. Ene 12–31",
            meaning_es: "Dedicado a Ilamatecuhtli (Tona, 'nuestra madre') y Mixcóatl. Una mujer que personificaba a la diosa Ilamatecuhtli era vestida con sus ropajes. Danzaba sola, mientras hombres mayores tocaban música; ella suspiraba y lloraba al danzar. Después del mediodía, los sátrapas vestidos como dioses caminaban delante de ella y la llevaban al templo. Tras las ceremonias con ella, los ministros de los ídolos realizaban escaramuzas y juegos, corriendo por el templo. Al día siguiente, la gente común hacía costales o bolsas atadas con cuerdas, rellenas de cosas blandas como lana, y las llevaban ocultas. Golpeaban con estos sacos a cualquier mujer que encontraban. Los muchachos también golpeaban a las muchachas con sacos hasta hacerlas llorar.",
            meaning_en: "Dedicated to Ilamatecuhtli (Tona, 'our mother') and Mixcóatl. A woman impersonating the goddess Ilamatecuhtli was dressed in her garments. She danced alone while older men played music; she sighed and wept as she danced. After noon, satraps dressed as gods walked before her and took her to the temple. After the ceremonies with her, the idol ministers engaged in skirmishes and merrymaking, running up and down the temple. The next day, common people made sacks or bags tied with strings, filled with soft things like wool, and carried them hidden. They would hit any woman they met on the street with these sacks. Young boys also pummeled girls with sacks until they cried."
        },
        {
            nahuatl_ortho: "Izcalli", es: "Izcalli", en: "Izcalli",
            approx_gregorian: "ca. Feb 1–20",
            meaning_es: "Dedicado a Xiuhteuctli (Ixcozauhqui, dios del fuego). El décimo día, hacían fuego nuevo a medianoche ante la imagen de Xiuhteuctli, ataviada de forma peculiar. Al amanecer, jóvenes y muchachos traían animales variados cazados los diez días anteriores (acuáticos y terrestres). Los ofrecían a los ancianos que guardaban al dios. Los ancianos arrojaban los animales al fuego para asarlos. A cada joven se le daba un tamal de amaranto (huauhquiltamalli), que todos ofrecían y comían muy calientes en honor a la fiesta, bebiendo y alegrándose. En años ordinarios, no había muertes rituales. En año bisiesto (cada cuatro años), nobles, señores, ilustres y el emperador se vestían ricamente y comenzaban un areito solemne y grave (netecuhitotiliztli, 'areito de los señores'), solo cada cuatro años. Ese mismo día (bisiesto), muy de madrugada, perforaban las orejas de niños y niñas, y les ponían en la cabeza un casquete de plumas de loro pegadas con resina de pino (ocotzotl).",
            meaning_en: "Dedicated to Xiuhteuctli (Ixcozauhqui, god of fire). On the tenth day, a new fire was made at midnight before the image of Xiuhteuctli, which was peculiarly attired. At dawn, young men and boys brought various animals hunted over the preceding ten days (aquatic and terrestrial). They offered them to the older men guarding the god. These older men threw all these animals into the fire to roast them. Each young man and boy was given a tamale made of amaranth seeds (huauhquiltamalli), which all the people offered that day; they all ate them very hot in honor of the festival, drinking and making merry. In ordinary years, there were no ritual killings. In a leap year (every four years), nobles, lords, illustrious people, and the emperor himself would be very richly dressed and adorned, and they would begin a solemn and grave areito (netecuhitotiliztli, 'areito of the lords'), performed only every four years. That same day (leap year), very early before dawn, they would pierce the ears of boys and girls, and place on their heads a skullcap made of parrot feathers glued with pine resin (ocotzotl)."
        }
    ],
    nemontemi: {
        nahuatl_ortho: "Nemontemi", es: "Nemontemi", en: "Nemontemi",
        approx_gregorian: "ca. Feb 21-25",
        meaning_es: "Cinco (o seis en año bisiesto) días considerados aciagos y de mala suerte. Los nacidos en ellos tendrían malos resultados y serían pobres y miserables (llamados Nenoquich los hombres, Nencihuatl las mujeres). Generalmente no se hacía nada. Se abstenían especialmente de reñir (augurio de seguir con ese hábito). Tropezar era mal augurio.",
        meaning_en: "Five (or six in a leap year) days considered ill-fated and unlucky. Those born during them would have bad outcomes and be poor and miserable (men called Nenoquich, women Nencihuatl). Generally, nothing was done. They especially abstained from quarreling (omen of keeping that habit). Stumbling was a bad omen."
    }
};

// DOM Elements (Ensure these match your HTML IDs)
const dateInput = document.getElementById('gregorian-date');
const calculateBtn = document.getElementById('calculate-btn');
const todayBtn = document.getElementById('today-btn');
const resultContainer = document.getElementById('result-container');
const resultYearTonalliEl = document.getElementById('result-year-tonalli');
const resultYearTonalliTransEl = document.getElementById('result-year-tonalli-translations');
const resultDayTonalliMainEl = document.getElementById('result-day-tonalli-main');
const daySignGlyphEl = document.getElementById('day-sign-glyph');
const mayaNumeralGlyphEl = document.getElementById('maya-numeral-glyph');
const resultDayTonalliTransEl = document.getElementById('result-day-tonalli-translations');
const resultTrecenaMainEl = document.getElementById('result-trecena-main'); // Wrapper for Trecena glyphs and text
const mayaNumeralTrecenaEl = document.getElementById('maya-numeral-trecena');
const trecenaStartGlyphEl = document.getElementById('trecena-start-glyph');
const resultTrecenaEl = document.getElementById('result-trecena'); // Text part of Trecena
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

// --- FUNCTIONS ---
function getNewFireInfo(selectedDate) {
    const anchorCeremonyYear = 1507; const ceremonyMonth = 10; const ceremonyDay = 19;
    let nextCeremonyYear = anchorCeremonyYear;
    if (selectedDate && !isNaN(selectedDate.getTime())) {
        const selectedDateTime = selectedDate.getTime();
        while (new Date(Date.UTC(nextCeremonyYear, ceremonyMonth, ceremonyDay)).getTime() <= selectedDateTime) {
            nextCeremonyYear += 52;
        }
    } else {
        const currentYear = new Date().getUTCFullYear();
        while(nextCeremonyYear <= currentYear) { nextCeremonyYear += 52; }
    }
    const previousCeremonyYear = nextCeremonyYear - 52;
    const nextCeremonyDate = new Date(Date.UTC(nextCeremonyYear, ceremonyMonth, ceremonyDay));
    return { startYear: previousCeremonyYear, endYear: nextCeremonyYear - 1, nextDate: nextCeremonyDate };
}

function getXiuhpohualliVeintena(selectedDate) {
    const anchorDate = xiuhpohualliData.anchorGregorianDate;
    const msPerDay = 1000 * 60 * 60 * 24;
    console.log("Xiuh: selectedDate", selectedDate);
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
         console.error("Xiuh: Invalid selectedDate in getXiuhpohualliVeintena:", selectedDate);
         return null;
    }
    const diffTotalDays = Math.floor((selectedDate.getTime() - anchorDate.getTime()) / msPerDay);
    let dayInXiuhpohualliCycle = ((diffTotalDays % 365) + 365) % 365 + 1;
    console.log("Xiuh: diffTotalDays", diffTotalDays);
    console.log("Xiuh: dayInXiuhpohualliCycle", dayInXiuhpohualliCycle);
    if (dayInXiuhpohualliCycle <= 360) {
        const veintenaIndex = Math.floor((dayInXiuhpohualliCycle -1) / 20);
        const dayInVeintena = (dayInXiuhpohualliCycle -1) % 20 + 1;
        console.log("Xiuh: veintenaIndex", veintenaIndex);
        console.log("Xiuh: dayInVeintena", dayInVeintena);
        const veintenaInfo = xiuhpohualliData.veintenas[veintenaIndex];
        if (!veintenaInfo) {
            console.error("Xiuh: Veintena info not found for index:", veintenaIndex, "Total veintenas:", xiuhpohualliData.veintenas.length);
            return null;
        }
        return { nameData: veintenaInfo, day: dayInVeintena, isNemontemi: false };
    } else {
        const dayInNemontemi = dayInXiuhpohualliCycle - 360;
        console.log("Xiuh: Nemontemi day", dayInNemontemi);
        return { nameData: xiuhpohualliData.nemontemi, day: dayInNemontemi, isNemontemi: true };
    }
}

function isGregorianLeap(year) { return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0); }

function getYearValue(year) {
    const refYear = 1922, refTrecenaNum = 1, refSignIndex = 0;
    const yearBearers = ['Conejo', 'Caña', 'Pedernal', 'Casa'];
    const yearDiff = year - refYear;
    const mod = (n, m) => ((n % m) + m) % m;
    const finalTrecenaNum = mod(refTrecenaNum - 1 + yearDiff, 13) + 1;
    const finalSignName = yearBearers[mod(refSignIndex + yearDiff, 4)];
    return { trecena: finalTrecenaNum, veintena: sagradoTreceData.signToNumber[finalSignName] };
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    if (langSwitcher.querySelector('.active')) langSwitcher.querySelector('.active').classList.remove('active');
    const activeLangButton = langSwitcher.querySelector(`[data-lang="${lang}"]`);
    if (activeLangButton) activeLangButton.classList.add('active');
    populateTonalliInputs();
    if (currentCalculatorMode === 'gregorianToTonalli' && lastResult) displayResult(lastResult);
    else if (errorMessageEl.dataset.key && errorMessageEl.style.display !== 'none') displayError(errorMessageEl.dataset.key);
}

function setSpelling(spelling) {
    currentSpelling = spelling;
    if(spellingSwitcher.querySelector('.active')) spellingSwitcher.querySelector('.active').classList.remove('active');
    const activeSpellingButton = spellingSwitcher.querySelector(`[data-spelling="${spelling}"]`);
    if(activeSpellingButton) activeSpellingButton.classList.add('active');
    populateTonalliInputs();
    if (currentCalculatorMode === 'gregorianToTonalli' && lastResult) displayResult(lastResult);
}

function populateTonalliInputs() {
    tonalliNumberInputEl.innerHTML = '';
    for (let i = 1; i <= 13; i++) {
        const option = document.createElement('option'); option.value = i;
        option.textContent = sagradoTreceData.nahuatlNumbers[i] ? `${i} (${sagradoTreceData.nahuatlNumbers[i]})` : i;
        tonalliNumberInputEl.appendChild(option);
    }
    tonalliSignInputEl.innerHTML = '';
    sagradoTreceData.numberToSign.forEach((signData, index) => {
        if (index === 0 || !signData) return;
        const option = document.createElement('option'); option.value = index;
        const signNameDisplay = currentSpelling === 'ortho' ? signData.nahuatl_ortho : signData.nahuatl_phonetic;
        option.textContent = `${signNameDisplay} (${signData[currentLang] || signData.es})`;
        tonalliSignInputEl.appendChild(option);
    });
}

function getTonalliForDate(gregorianDate) {
    const year = gregorianDate.getUTCFullYear(), month = gregorianDate.getUTCMonth() + 1, day = gregorianDate.getUTCDate();
    const yearValue = getYearValue(year);
    let dayValue = (month === 2 && day === 29 && isGregorianLeap(year)) ? sagradoTreceData.getDayValue(3, 1) : sagradoTreceData.getDayValue(month, day);
    if (typeof dayValue === 'undefined' || dayValue === null) return null;
    const dayNumValue = { trecena: dayValue[0], veintena: dayValue[1] };
    let adjustment = { trecena: 0, veintena: 0 };
    if (isGregorianLeap(year) && month > 2) adjustment = { trecena: 1, veintena: 1 };
    else if (!isGregorianLeap(year) && isGregorianLeap(year - 1) && (month < 2 || (month === 2 && day <= 19))) adjustment = { trecena: 1, veintena: 1 };
    const totalTrecena = yearValue.trecena + dayNumValue.trecena + adjustment.trecena;
    const totalVeintena = yearValue.veintena + dayNumValue.veintena + adjustment.veintena;
    return { dayTrecena: totalTrecena % 13 || 13, dayVeintena: totalVeintena % 20 || 20 };
}

function calculateTonalli() {
    try {
        clearAllErrorMessages();
        const dateString = dateInput.value; if (!dateString) return displayError('errorInvalidDate');
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (isNaN(date.getTime())) return displayError('errorInvalidDate');
        clearGregToTonResults();
        const tonalliResult = getTonalliForDate(date); if (!tonalliResult) return displayError('errorCalculation');
        const yearValue = getYearValue(date.getUTCFullYear());
        const trecenaStartSignIndex = (tonalliResult.dayVeintena - (tonalliResult.dayTrecena - 1) + 20) % 20 || 20;
        lastResult = {
            yearTrecena: yearValue.trecena, yearVeintena: yearValue.veintena,
            dayTrecena: tonalliResult.dayTrecena, dayVeintena: tonalliResult.dayVeintena,
            trecenaStartSignIndex: trecenaStartSignIndex, selectedDate: date
        };
        displayResult(lastResult);
    } catch (error) { console.error("G->T Calc failed:", error); displayError('errorCalculation'); }
}

function calculateGregorianFromTonalli() {
    clearTonToGregResults(); clearAllErrorMessages();
    const targetNumber = parseInt(tonalliNumberInputEl.value), targetSignIndex = parseInt(tonalliSignInputEl.value);
    let startYear = parseInt(startYearInputEl.value), endYear = parseInt(endYearInputEl.value);
    if (isNaN(targetNumber) || isNaN(targetSignIndex) || isNaN(startYear) || isNaN(endYear)) return displayError('errorMissingInputs');
    if (startYear > endYear) return displayError('errorYearRange');
    if (endYear - startYear > 10) { endYear = startYear + 10; endYearInputEl.value = endYear; }
    let foundDates = [], iterationCount = 0, maxIterations = 366 * (endYear - startYear + 2);
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
            for (let d = 1; d <= daysInMonth; d++) {
                if (++iterationCount > maxIterations) { displayError('errorCalculation'); return; }
                const currentDate = new Date(Date.UTC(y, m, d));
                const tonalli = getTonalliForDate(currentDate);
                if (tonalli && tonalli.dayTrecena === targetNumber && tonalli.dayVeintena === targetSignIndex) foundDates.push(currentDate);
            }
        }
    }
    reverseResultsListEl.innerHTML = '';
    if (foundDates.length > 0) foundDates.forEach(date => {
        const li = document.createElement('li');
        li.textContent = date.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        reverseResultsListEl.appendChild(li);
    }); else reverseResultsListEl.innerHTML = `<li>${translations[currentLang].noGregorianDatesFound}</li>`;
    reverseResultsContainerEl.style.display = 'block';
}

function displayResult(result) {
    resultContainer.style.display = 'block';
    errorMessageEl.style.display = 'none'; errorMessageEl.dataset.key = '';

    const tonalliNameDiv = document.querySelector('#result-day-tonalli-main .tonalli-name');

    // YEAR TONALLI
    const yearSignData = sagradoTreceData.numberToSign[result.yearVeintena];
    resultYearTonalliEl.textContent = (yearSignData && sagradoTreceData.nahuatlNumbers[result.yearTrecena]) ? `${sagradoTreceData.nahuatlNumbers[result.yearTrecena]} ${currentSpelling === 'ortho' ? yearSignData.nahuatl_ortho : yearSignData.nahuatl_phonetic}` : 'Error';
    resultYearTonalliTransEl.textContent = (yearSignData) ? `(${result.yearTrecena} / Español: ${yearSignData.es} / English: ${yearSignData.en})` : '';

    // DAY TONALLI (Text, Glyphs, Maya Numeral)
    const daySignData = sagradoTreceData.numberToSign[result.dayVeintena];
    if (daySignData && sagradoTreceData.nahuatlNumbers[result.dayTrecena]) {
        if (tonalliNameDiv) tonalliNameDiv.textContent = `${sagradoTreceData.nahuatlNumbers[result.dayTrecena]} ${currentSpelling === 'ortho' ? daySignData.nahuatl_ortho : daySignData.nahuatl_phonetic}`;
        resultDayTonalliTransEl.textContent = `(${result.dayTrecena} / Español: ${daySignData.es} / English: ${daySignData.en})`;

        const glyphPath = sagradoTreceData.signGlyphs[result.dayVeintena];
        if (glyphPath && daySignGlyphEl) {
            daySignGlyphEl.src = glyphPath; daySignGlyphEl.alt = daySignData[currentLang] || daySignData.es;
            daySignGlyphEl.style.display = 'inline-block';
        } else if (daySignGlyphEl) daySignGlyphEl.style.display = 'none';

        const mayaNumeralPath = sagradoTreceData.mayaNumeralGlyphs[result.dayTrecena];
        if (mayaNumeralPath && mayaNumeralGlyphEl) {
            mayaNumeralGlyphEl.src = mayaNumeralPath; mayaNumeralGlyphEl.alt = `Número Maya ${result.dayTrecena}`;
            mayaNumeralGlyphEl.style.display = 'inline-block';
        } else if (mayaNumeralGlyphEl) mayaNumeralGlyphEl.style.display = 'none';
    } else {
        if (tonalliNameDiv) tonalliNameDiv.textContent = 'Error';
        if (resultDayTonalliTransEl) resultDayTonalliTransEl.textContent = '';
        if (daySignGlyphEl) daySignGlyphEl.style.display = 'none';
        if (mayaNumeralGlyphEl) mayaNumeralGlyphEl.style.display = 'none';
    }

    // TRECENA
    const trecenaSignData = sagradoTreceData.numberToSign[result.trecenaStartSignIndex];
    if (trecenaSignData && sagradoTreceData.nahuatlNumbers[1]) {
        resultTrecenaEl.textContent = `${translations[currentLang].trecenaText} ${sagradoTreceData.nahuatlNumbers[1]} ${currentSpelling === 'ortho' ? trecenaSignData.nahuatl_ortho : trecenaSignData.nahuatl_phonetic}`;
        resultTrecenaTransEl.textContent = `(1 / Español: ${trecenaSignData.es} / English: ${trecenaSignData.en})`;

        const trecenaGlyphPath = sagradoTreceData.signGlyphs[result.trecenaStartSignIndex];
        if (trecenaGlyphPath && trecenaStartGlyphEl) {
            trecenaStartGlyphEl.src = trecenaGlyphPath;
            trecenaStartGlyphEl.alt = `Glifo ${trecenaSignData[currentLang] || trecenaSignData.es}`;
            trecenaStartGlyphEl.style.display = 'inline-block';
        } else if (trecenaStartGlyphEl) {
            trecenaStartGlyphEl.style.display = 'none';
        }

        const mayaNumeralForTrecenaPath = sagradoTreceData.mayaNumeralGlyphs[1];
        if (mayaNumeralForTrecenaPath && mayaNumeralTrecenaEl) {
            mayaNumeralTrecenaEl.src = mayaNumeralForTrecenaPath;
            mayaNumeralTrecenaEl.alt = "Número Maya 1";
            mayaNumeralTrecenaEl.style.display = 'inline-block';
        } else if (mayaNumeralTrecenaEl) {
            mayaNumeralTrecenaEl.style.display = 'none';
        }
    } else {
        resultTrecenaEl.textContent = 'Error';
        resultTrecenaTransEl.textContent = '';
        if (trecenaStartGlyphEl) trecenaStartGlyphEl.style.display = 'none';
        if (mayaNumeralTrecenaEl) mayaNumeralTrecenaEl.style.display = 'none';
    }
    

    // MEANING DISPLAY
    const meaningKey = `${result.dayTrecena}_${result.dayVeintena}`;
    let fullMeaningText = (typeof tonalliMeanings !== 'undefined' && tonalliMeanings[meaningKey]) ? tonalliMeanings[meaningKey] : "";
    if (!fullMeaningText && tonalliMeaningContainerEl) {
        tonalliMeaningContainerEl.innerHTML = `<p>${translations[currentLang].meaningNotFound}</p>`;
    } else if (fullMeaningText && tonalliMeaningContainerEl) {
        fullMeaningText = fullMeaningText.replace(/\n/g, '<br>')
            .replace(/\*\*(TRECENA.*?)\*\*/g, '<h3>$1</h3>')
            .replace(/\*\*([A-Z\s\d\/().:,']+?)\*\*/g, (m, p1) => (p1.trim()==="---"||p1.trim()===""||p1.trim().startsWith("("))?m:`<strong>${p1.trim()}</strong>`)
            .replace(/(LUCK:|BAPTISM:|UMBILICAL CORD RITUALS?:|GOOD ATTRIBUTES\/FORTUNE:|BAD ATTRIBUTES\/MISFORTUNE:|REMEDIES\/MITIGATION:|REMEDY FOR THIS TRECENA:|RITUALS DURING THIS TRECENA:|CIHUATETEOH ACTIVITY:|ILLNESS DURING THIS SIGN:|UNIVERSAL LUCK NOTE FOR THIS TRECENA:|NUMERICAL INFLUENCE ON HOUSES:|NOTE:|<LUCK>:|<BAPTISM>:|<UMBILICAL CORD RITUALS?>:|<GOOD ATTRIBUTES\/FORTUNE>:|<BAD ATTRIBUTES\/MISFORTUNE>:|<REMEDIES\/MITIGATION>:|<REMEDY FOR THIS TRECENA>:|<RITUALS DURING THIS TRECENA>:|<CIHUATETEOH ACTIVITY>:|<ILLNESS DURING THIS SIGN>:|<UNIVERSAL LUCK NOTE FOR THIS TRECENA>:|<NUMERICAL INFLUENCE ON HOUSES>:|<NOTE>:|GENERAL NOTES\/RULERS\/RITUALS:|<GENERAL NOTES\/RULERS\/RITUALS>:)/gi, m => `<strong>${m.replace(/[<>:]/g,'').trim()}:</strong>`);
        tonalliMeaningContainerEl.innerHTML = fullMeaningText;
    }

    // NEW FIRE CYCLE
    const dateForCycle = result.selectedDate;
    const fireCycleInfo = getNewFireInfo(dateForCycle);
    if (fireCycleInfo) {
        cycleRangeTextEl.textContent = translations[currentLang].cycleDateText.replace('{startYear}', fireCycleInfo.startYear).replace('{endYear}', fireCycleInfo.endYear);
        const nextDateFormatted = fireCycleInfo.nextDate.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        nextCeremonyTextEl.textContent = translations[currentLang].nextCeremonyDateText.replace('{nextDate}', nextDateFormatted);
    } else { cycleRangeTextEl.textContent = ''; nextCeremonyTextEl.textContent = ''; }

    // SUNS CALCULATION PART - UPDATED
    const sun5_start_calc = new Date(Date.UTC(-legendOfSunsData.sun5_start_year_BC + 1, 0, 1));
    const sun4_start_calc = new Date(sun5_start_calc); sun4_start_calc.setUTCFullYear(sun5_start_calc.getUTCFullYear() - (legendOfSunsData.sun4_duration + legendOfSunsData.sun4_flood));
    const sun3_start_calc = new Date(sun4_start_calc); sun3_start_calc.setUTCFullYear(sun4_start_calc.getUTCFullYear() - legendOfSunsData.sun3_duration);
    const sun2_start_calc = new Date(sun3_start_calc); sun2_start_calc.setUTCFullYear(sun3_start_calc.getUTCFullYear() - legendOfSunsData.sun2_duration);
    const sun1_start_calc = new Date(sun2_start_calc); sun1_start_calc.setUTCFullYear(sun2_start_calc.getUTCFullYear() - legendOfSunsData.sun1_duration);
    const sunDates = [sun1_start_calc, sun2_start_calc, sun3_start_calc, sun4_start_calc, sun5_start_calc];
    let sunsHTML = `<p>${translations[currentLang].daysFromSunsPreamble}</p>`;
    const currentYearForSuns = dateForCycle.getUTCFullYear();
    sunDates.forEach((sunStartDate, index) => {
        if (sunStartDate && !isNaN(sunStartDate.getTime())) {
            const sunStartYear = sunStartDate.getUTCFullYear();
            let yearsPassed = currentYearForSuns - sunStartYear;
            if (currentYearForSuns > 0 && sunStartYear <= 0) yearsPassed -=1;
            const yearString = Math.abs(Math.floor(yearsPassed)).toLocaleString(currentLang);
            sunsHTML += `<div>${translations[currentLang]['daysFromSun' + (index + 1)].replace('{years}', yearString)}</div>`;
        } else sunsHTML += `<div>${translations[currentLang]['daysFromSun' + (index + 1)].replace('{years}', 'N/A')}</div>`;
    });
    daysFromSunsTextEl.innerHTML = sunsHTML;
    if (dateForCycle.getTime() > legendOfSunsData.fifth_sun_end_date.getTime()) {
        const fifthSunEndYear = legendOfSunsData.fifth_sun_end_date.getUTCFullYear();
        let diffYearsSinceEnd = currentYearForSuns - fifthSunEndYear;
        const yearString = Math.abs(Math.floor(diffYearsSinceEnd)).toLocaleString(currentLang);
        const endDateFormatted = legendOfSunsData.fifth_sun_end_date.toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        fifthSunEndTextEl.textContent = translations[currentLang].fifthSunEndedText.replace('{years}', yearString).replace('{endDate}', endDateFormatted);
    } else fifthSunEndTextEl.textContent = translations[currentLang].fifthSunEndText;
    sunsCalculationExplanationEl.textContent = translations[currentLang].sunsCalculationExplanation;

    // XIUHPOHUALLI
    console.log("Xiuh: veintenaData from function", veintenaData); // DEBUG (Keep or remove after testing)
    if (veintenaData && veintenaData.nameData) {
        const veintenaDisplayName = currentSpelling === 'ortho' ? veintenaData.nameData.nahuatl_ortho : (veintenaData.nameData.nahuatl_phonetic || veintenaData.nameData.nahuatl_ortho);
        const veintenaTranslatedName = veintenaData.nameData[currentLang] || veintenaData.nameData.es;
        xiuhpohualliVeintenaNameEl.textContent = `${veintenaDisplayName} (${veintenaTranslatedName})`;
        xiuhpohualliVeintenaApproxGregorianEl.textContent = `(${(veintenaData.nameData.approx_gregorian || '')})`;
        xiuhpohualliVeintenaDayEl.textContent = veintenaData.isNemontemi ? translations[currentLang].nemontemiDayText.replace('{day}', veintenaData.day) : translations[currentLang].veintenaDayText.replace('{day}', veintenaData.day).replace('{veintenaName}', veintenaTranslatedName);
        if(xiuhpohualliVeintenaMeaningEl) xiuhpohualliVeintenaMeaningEl.textContent = veintenaData.nameData['meaning_' + currentLang] || veintenaData.nameData.meaning_es || '';
    } else {
        console.error("Xiuh: veintenaData or veintenaData.nameData is null/undefined in displayResult"); // DEBUG
        if(xiuhpohualliVeintenaNameEl) xiuhpohualliVeintenaNameEl.textContent = translations[currentLang].errorCalculation;
        if(xiuhpohualliVeintenaApproxGregorianEl) xiuhpohualliVeintenaApproxGregorianEl.textContent = ''; 
        if(xiuhpohualliVeintenaDayEl) xiuhpohualliVeintenaDayEl.textContent = ''; 
        if(xiuhpohualliVeintenaMeaningEl) xiuhpohualliVeintenaMeaningEl.textContent = '';
    }
}

function displayError(errorKey) {
    clearGregToTonResults(); clearTonToGregResults();
    errorMessageEl.dataset.key = errorKey;
    errorMessageEl.textContent = translations[currentLang]?.[errorKey] || translations.es[errorKey];
    errorMessageEl.style.display = 'block';
    if (currentCalculatorMode === 'gregorianToTonalli') {
        resultContainer.style.display = 'block';
        const els = [resultYearTonalliEl, document.querySelector('#result-day-tonalli-main .tonalli-name'), resultTrecenaEl];
        els.forEach(el => { if(el) el.textContent = ''; });
        if(tonalliMeaningContainerEl) tonalliMeaningContainerEl.innerHTML = '';
        if(daySignGlyphEl) daySignGlyphEl.style.display = 'none';
        if(mayaNumeralGlyphEl) mayaNumeralGlyphEl.style.display = 'none';
        if(mayaNumeralTrecenaEl) mayaNumeralTrecenaEl.style.display = 'none';
        if(trecenaStartGlyphEl) trecenaStartGlyphEl.style.display = 'none';
        reverseResultsContainerEl.style.display = 'none';
    } else {
         resultContainer.style.display = 'none';
         reverseResultsContainerEl.style.display = 'block';
    }
}

function clearGregToTonResults() {
    lastResult = null; resultContainer.style.display = 'none';
    const els = [resultYearTonalliEl, resultYearTonalliTransEl, document.querySelector('#result-day-tonalli-main .tonalli-name'), resultDayTonalliTransEl, resultTrecenaEl, resultTrecenaTransEl, cycleRangeTextEl, nextCeremonyTextEl, daysFromSunsTextEl, fifthSunEndTextEl, sunsCalculationExplanationEl, xiuhpohualliVeintenaNameEl, xiuhpohualliVeintenaApproxGregorianEl, xiuhpohualliVeintenaDayEl, xiuhpohualliVeintenaMeaningEl];
    els.forEach(el => { if(el) el.textContent = ''; });
    if(tonalliMeaningContainerEl) tonalliMeaningContainerEl.innerHTML = '';
    if(daySignGlyphEl) daySignGlyphEl.style.display = 'none';
    if(mayaNumeralGlyphEl) mayaNumeralGlyphEl.style.display = 'none';
    if(mayaNumeralTrecenaEl) mayaNumeralTrecenaEl.style.display = 'none';
    if(trecenaStartGlyphEl) trecenaStartGlyphEl.style.display = 'none';
}

function clearTonToGregResults() {
    if(reverseResultsListEl) reverseResultsListEl.innerHTML = '';
    if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
}

function clearAllErrorMessages(){
     if(errorMessageEl) { errorMessageEl.textContent = ''; errorMessageEl.style.display = 'none'; errorMessageEl.dataset.key = ''; }
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const todayY = today.getFullYear(), todayM = ('0'+(today.getMonth()+1)).slice(-2), todayD = ('0'+today.getDate()).slice(-2);
    if(dateInput) dateInput.value = `${todayY}-${todayM}-${todayD}`;
    if(startYearInputEl) startYearInputEl.value = todayY; if(endYearInputEl) endYearInputEl.value = todayY;
    populateTonalliInputs(); setLanguage('es'); setSpelling('ortho');
    if(resultContainer) resultContainer.style.display = 'none';
    if(errorMessageEl) errorMessageEl.style.display = 'none';
    if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
    if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'none';
    if(modeGregToTonBtn) modeGregToTonBtn.classList.add('active');
    if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'flex';

    if(calculateBtn) calculateBtn.addEventListener('click', calculateTonalli);
    if(todayBtn) todayBtn.addEventListener('click', () => {
        if(modeGregToTonBtn && !modeGregToTonBtn.classList.contains('active')) modeGregToTonBtn.click();
        const t = new Date(); if(dateInput) dateInput.value = `${t.getFullYear()}-${('0'+(t.getMonth()+1)).slice(-2)}-${('0'+t.getDate()).slice(-2)}`;
        calculateTonalli();
    });
    if(calculateGregorianBtn) calculateGregorianBtn.addEventListener('click', calculateGregorianFromTonalli);
    if(langSwitcher) langSwitcher.addEventListener('click', e => { if (e.target.tagName==='BUTTON'&&e.target.dataset.lang&&!e.target.classList.contains('active')) setLanguage(e.target.dataset.lang); });
    if(spellingSwitcher) spellingSwitcher.addEventListener('click', e => { if (e.target.tagName==='BUTTON'&&e.target.dataset.spelling&&!e.target.classList.contains('active')) setSpelling(e.target.dataset.spelling); });
    if(modeGregToTonBtn) modeGregToTonBtn.addEventListener('click', () => {
        currentCalculatorMode = 'gregorianToTonalli';
        if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'flex'; if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'none';
        if(resultContainer) resultContainer.style.display = lastResult ? 'block' : 'none';
        if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = 'none';
        modeGregToTonBtn.classList.add('active'); if (modeTonToGregBtn) modeTonToGregBtn.classList.remove('active');
        clearAllErrorMessages(); if (lastResult) displayResult(lastResult);
    });
    if(modeTonToGregBtn) modeTonToGregBtn.addEventListener('click', () => {
        currentCalculatorMode = 'tonalliToGregorian';
        if(gregToTonCalcEl) gregToTonCalcEl.style.display = 'none'; if(tonToGregCalcEl) tonToGregCalcEl.style.display = 'flex';
        if(resultContainer) resultContainer.style.display = 'none';
        if(reverseResultsContainerEl) reverseResultsContainerEl.style.display = (reverseResultsListEl&&reverseResultsListEl.hasChildNodes())?'block':'none';
        modeTonToGregBtn.classList.add('active'); if(modeGregToTonBtn) modeGregToTonBtn.classList.remove('active');
        clearAllErrorMessages();
    });
    if (currentCalculatorMode==='gregorianToTonalli' && dateInput && dateInput.value && (!errorMessageEl || !errorMessageEl.textContent || errorMessageEl.style.display === 'none') ) calculateTonalli();
});