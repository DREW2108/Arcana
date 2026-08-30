// ========================================
// ARCANA — TAROT
// SCRIPT PRINCIPAL
// ========================================

const API_URL = "https://tarotapi.dev/api/v1/cards";

let tarotCards = [];
let selectedCard = null;
let currentFilter = "all";


// ========================================
// DATOS COMPLETOS DEL TAROT
// ========================================

const tarotMeanings = {

    // ========================================
    // ARCANOS MAYORES
    // ========================================

    "The Fool": {
        category: "major",
        number: "0",
        upright: "Nuevos comienzos, libertad, aventura, espontaneidad y confianza en el camino.",
        reversed: "Imprudencia, impulsividad, falta de dirección, decisiones arriesgadas o miedo a comenzar."
    },

    "The Magician": {
        category: "major",
        number: "I",
        upright: "Manifestación, habilidad, iniciativa, creatividad y poder personal.",
        reversed: "Manipulación, engaño, falta de confianza, recursos mal utilizados o potencial bloqueado."
    },

    "The High Priestess": {
        category: "major",
        number: "II",
        upright: "Intuición, misterio, conocimiento interior, silencio y sabiduría.",
        reversed: "Secretos, confusión, intuición bloqueada, información oculta o desconexión interior."
    },

    "The Empress": {
        category: "major",
        number: "III",
        upright: "Abundancia, creatividad, naturaleza, crecimiento, fertilidad y cuidado.",
        reversed: "Bloqueo creativo, dependencia, exceso de cuidado hacia otros o falta de autocuidado."
    },

    "The Emperor": {
        category: "major",
        number: "IV",
        upright: "Autoridad, estabilidad, estructura, liderazgo, disciplina y seguridad.",
        reversed: "Control excesivo, rigidez, autoritarismo, abuso de poder o falta de estructura."
    },

    "The Hierophant": {
        category: "major",
        number: "V",
        upright: "Tradición, enseñanza, espiritualidad, conocimiento y valores establecidos.",
        reversed: "Rebeldía, dogmatismo, cuestionamiento de las tradiciones o rechazo de normas."
    },

    "The Lovers": {
        category: "major",
        number: "VI",
        upright: "Unión, decisiones, armonía, conexión y valores compartidos.",
        reversed: "Desacuerdo, conflicto, indecisión, separación o valores incompatibles."
    },

    "The Chariot": {
        category: "major",
        number: "VII",
        upright: "Determinación, movimiento, victoria, voluntad y control.",
        reversed: "Falta de dirección, obstáculos, pérdida de control o impulsividad."
    },

    "Strength": {
        category: "major",
        number: "VIII",
        upright: "Valentía, paciencia, compasión, autocontrol y fortaleza interior.",
        reversed: "Inseguridad, debilidad, miedo, falta de confianza o pérdida de autocontrol."
    },

    "Fortitude": {
        category: "major",
        number: "VIII",
        upright: "Valentía, paciencia, compasión, autocontrol y fortaleza interior.",
        reversed: "Inseguridad, debilidad, miedo, falta de confianza o pérdida de autocontrol."
    },

    "The Hermit": {
        category: "major",
        number: "IX",
        upright: "Introspección, búsqueda interior, sabiduría, reflexión y soledad positiva.",
        reversed: "Aislamiento, soledad excesiva, evasión, desconexión o rechazo de la introspección."
    },

    "Wheel of Fortune": {
        category: "major",
        number: "X",
        upright: "Cambio, ciclos, destino, oportunidades y nuevos movimientos.",
        reversed: "Resistencia al cambio, mala suerte temporal, ciclos repetitivos o estancamiento."
    },

    "Justice": {
        category: "major",
        number: "XI",
        upright: "Equilibrio, justicia, verdad, responsabilidad y consecuencias.",
        reversed: "Injusticia, desequilibrio, falta de responsabilidad, prejuicio o decisiones injustas."
    },

    "The Hanged Man": {
        category: "major",
        number: "XII",
        upright: "Pausa, sacrificio, perspectiva, aceptación y cambio de visión.",
        reversed: "Estancamiento, resistencia, sacrificio innecesario o incapacidad para avanzar."
    },

    "Death": {
        category: "major",
        number: "XIII",
        upright: "Transformación, finales, renovación, transición y cambio profundo.",
        reversed: "Resistencia al cambio, apego al pasado, miedo a cerrar una etapa o estancamiento."
    },

    "Temperance": {
        category: "major",
        number: "XIV",
        upright: "Equilibrio, armonía, paciencia, moderación y adaptación.",
        reversed: "Desequilibrio, exceso, impaciencia, conflicto o falta de armonía."
    },

    "The Devil": {
        category: "major",
        number: "XV",
        upright: "Apegos, deseos, tentaciones, materialismo y patrones restrictivos.",
        reversed: "Liberación, romper cadenas, recuperar el control y superar dependencias."
    },

    "The Tower": {
        category: "major",
        number: "XVI",
        upright: "Cambio repentino, revelación, ruptura, crisis y transformación.",
        reversed: "Resistencia al cambio, miedo, evitar una transformación necesaria o crisis interna."
    },

    "The Star": {
        category: "major",
        number: "XVII",
        upright: "Esperanza, inspiración, renovación, claridad y fe.",
        reversed: "Desánimo, pérdida de esperanza, inseguridad, decepción o falta de inspiración."
    },

    "The Moon": {
        category: "major",
        number: "XVIII",
        upright: "Intuición, sueños, misterio, emociones y mundo interior.",
        reversed: "Confusión, miedo, ilusiones, engaños o verdades que comienzan a revelarse."
    },

    "The Sun": {
        category: "major",
        number: "XIX",
        upright: "Alegría, éxito, claridad, vitalidad, optimismo y felicidad.",
        reversed: "Falta de claridad, retrasos, optimismo bloqueado o felicidad incompleta."
    },

    "Judgement": {
        category: "major",
        number: "XX",
        upright: "Renacimiento, reflexión, decisiones, despertar y liberación del pasado.",
        reversed: "Dudas, culpa, autocrítica, incapacidad para avanzar o rechazo del cambio."
    },

    "The World": {
        category: "major",
        number: "XXI",
        upright: "Finalización, éxito, integración, realización y cierre de un ciclo.",
        reversed: "Ciclo incompleto, falta de cierre, retrasos o sensación de estancamiento."
    },


    // ========================================
    // BASTOS
    // ========================================

    "Ace of Wands": {
        category: "wands",
        upright: "Inspiración, energía, pasión, creatividad y nuevos comienzos.",
        reversed: "Falta de inspiración, retrasos, energía bloqueada o proyecto que pierde fuerza."
    },

    "Two of Wands": {
        category: "wands",
        upright: "Planificación, visión, decisiones y expansión.",
        reversed: "Miedo a salir de la zona de confort, falta de planificación o indecisión."
    },

    "Three of Wands": {
        category: "wands",
        upright: "Expansión, progreso, oportunidades y visión de futuro.",
        reversed: "Retrasos, obstáculos, falta de progreso o expectativas frustradas."
    },

    "Four of Wands": {
        category: "wands",
        upright: "Celebración, estabilidad, comunidad, hogar y logros.",
        reversed: "Inestabilidad, conflictos en el hogar, falta de celebración o transición."
    },

    "Five of Wands": {
        category: "wands",
        upright: "Competencia, conflicto, desafíos y diferentes opiniones.",
        reversed: "Evitar conflictos, tensión interna, agotamiento o conflicto que comienza a resolverse."
    },

    "Six of Wands": {
        category: "wands",
        upright: "Victoria, reconocimiento, éxito, confianza y recompensa.",
        reversed: "Falta de reconocimiento, orgullo, fracaso temporal o inseguridad."
    },

    "Seven of Wands": {
        category: "wands",
        upright: "Defensa, perseverancia, determinación y protección de tus ideales.",
        reversed: "Agotamiento, rendirse, inseguridad o sentirse superado."
    },

    "Eight of Wands": {
        category: "wands",
        upright: "Movimiento rápido, comunicación, progreso y acontecimientos repentinos.",
        reversed: "Retrasos, mala comunicación, frustración o falta de dirección."
    },

    "Nine of Wands": {
        category: "wands",
        upright: "Resistencia, perseverancia, experiencia y preparación.",
        reversed: "Cansancio, paranoia, agotamiento o dificultad para continuar."
    },

    "Ten of Wands": {
        category: "wands",
        upright: "Responsabilidad, esfuerzo, carga, trabajo y compromiso.",
        reversed: "Sobrecarga, agotamiento, incapacidad para delegar o liberación de cargas."
    },

    "Page of Wands": {
        category: "wands",
        upright: "Entusiasmo, exploración, curiosidad, creatividad y nuevas ideas.",
        reversed: "Impaciencia, falta de dirección, inmadurez o entusiasmo pasajero."
    },

    "Knight of Wands": {
        category: "wands",
        upright: "Pasión, aventura, acción, confianza y movimiento.",
        reversed: "Impulsividad, imprudencia, agresividad o falta de constancia."
    },

    "Queen of Wands": {
        category: "wands",
        upright: "Confianza, independencia, creatividad, magnetismo y determinación.",
        reversed: "Celos, inseguridad, comportamiento dominante o pérdida de confianza."
    },

    "King of Wands": {
        category: "wands",
        upright: "Liderazgo, visión, iniciativa, autoridad y ambición.",
        reversed: "Arrogancia, impulsividad, autoritarismo o abuso del liderazgo."
    },


    // ========================================
    // COPAS
    // ========================================

    "Ace of Cups": {
        category: "cups",
        upright: "Amor, emociones nuevas, compasión, apertura emocional y conexión.",
        reversed: "Bloqueo emocional, tristeza, vacío o dificultad para expresar sentimientos."
    },

    "Two of Cups": {
        category: "cups",
        upright: "Unión, conexión, reciprocidad, armonía y asociación.",
        reversed: "Desacuerdo, separación, falta de reciprocidad o conflicto emocional."
    },

    "Three of Cups": {
        category: "cups",
        upright: "Celebración, amistad, comunidad, alegría y apoyo.",
        reversed: "Excesos, aislamiento, conflictos sociales o amistades poco saludables."
    },

    "Four of Cups": {
        category: "cups",
        upright: "Contemplación, apatía, introspección y oportunidades ignoradas.",
        reversed: "Nueva motivación, apertura emocional, aceptación de oportunidades."
    },

    "Five of Cups": {
        category: "cups",
        upright: "Pérdida, tristeza, decepción, arrepentimiento y duelo.",
        reversed: "Aceptación, recuperación emocional, perdón y esperanza."
    },

    "Six of Cups": {
        category: "cups",
        upright: "Nostalgia, recuerdos, infancia, inocencia y generosidad.",
        reversed: "Apego al pasado, idealización, inmadurez o dificultad para avanzar."
    },

    "Seven of Cups": {
        category: "cups",
        upright: "Opciones, sueños, imaginación, posibilidades e ilusiones.",
        reversed: "Claridad, decisión, prioridades o superar ilusiones."
    },

    "Eight of Cups": {
        category: "cups",
        upright: "Abandonar algo, búsqueda interior, transición y crecimiento emocional.",
        reversed: "Miedo a marcharse, estancamiento, regreso al pasado o evitar una decisión."
    },

    "Nine of Cups": {
        category: "cups",
        upright: "Satisfacción, deseos cumplidos, placer, gratitud y bienestar.",
        reversed: "Insatisfacción, exceso, deseos incumplidos o vacío emocional."
    },

    "Ten of Cups": {
        category: "cups",
        upright: "Felicidad, armonía, familia, amor y realización emocional.",
        reversed: "Conflictos familiares, expectativas irreales, tensión o felicidad incompleta."
    },

    "Page of Cups": {
        category: "cups",
        upright: "Sensibilidad, creatividad, intuición, mensajes emocionales y apertura.",
        reversed: "Inmadurez emocional, inseguridad, bloqueo creativo o fantasía excesiva."
    },

    "Knight of Cups": {
        category: "cups",
        upright: "Romanticismo, sensibilidad, propuestas, imaginación y búsqueda emocional.",
        reversed: "Idealización, cambios emocionales, decepción o promesas vacías."
    },

    "Queen of Cups": {
        category: "cups",
        upright: "Empatía, intuición, sensibilidad, compasión y profundidad emocional.",
        reversed: "Dependencia emocional, inseguridad, sensibilidad excesiva o límites débiles."
    },

    "King of Cups": {
        category: "cups",
        upright: "Madurez emocional, equilibrio, compasión, diplomacia y control emocional.",
        reversed: "Manipulación emocional, represión, inestabilidad o falta de control."
    },


    // ========================================
    // ESPADAS
    // ========================================

    "Ace of Swords": {
        category: "swords",
        upright: "Claridad, verdad, nuevas ideas, decisión y comprensión.",
        reversed: "Confusión, desinformación, falta de claridad o pensamiento bloqueado."
    },

    "Two of Swords": {
        category: "swords",
        upright: "Indecisión, equilibrio, bloqueo y necesidad de tomar una decisión.",
        reversed: "Confusión, ansiedad, decisión inevitable o información revelada."
    },

    "Three of Swords": {
        category: "swords",
        upright: "Dolor, tristeza, separación, decepción y verdad difícil.",
        reversed: "Sanación, recuperación, perdón y liberación del dolor."
    },

    "Four of Swords": {
        category: "swords",
        upright: "Descanso, recuperación, reflexión, pausa y tranquilidad.",
        reversed: "Agotamiento, inquietud, incapacidad para descansar o recuperación lenta."
    },

    "Five of Swords": {
        category: "swords",
        upright: "Conflicto, competencia, tensión, victoria con consecuencias.",
        reversed: "Reconciliación, arrepentimiento, resolución de conflictos o evitar confrontaciones."
    },

    "Six of Swords": {
        category: "swords",
        upright: "Transición, viaje, recuperación, alejamiento y avanzar hacia algo mejor.",
        reversed: "Resistencia al cambio, dificultad para avanzar o regresar al pasado."
    },

    "Seven of Swords": {
        category: "swords",
        upright: "Estrategia, independencia, secretos, astucia y planificación.",
        reversed: "Exposición, confesión, engaño descubierto o autoengaño."
    },

    "Eight of Swords": {
        category: "swords",
        upright: "Limitaciones, miedo, pensamientos negativos y sensación de estar atrapado.",
        reversed: "Liberación, nuevas perspectivas, superar miedos y recuperar el control."
    },

    "Nine of Swords": {
        category: "swords",
        upright: "Ansiedad, preocupación, culpa, miedo y pensamientos repetitivos.",
        reversed: "Recuperación, liberación de ansiedad, esperanza o enfrentamiento de los miedos."
    },

    "Ten of Swords": {
        category: "swords",
        upright: "Final doloroso, agotamiento, traición y cierre definitivo.",
        reversed: "Recuperación, renacimiento, resistencia o dificultad para aceptar un final."
    },

    "Page of Swords": {
        category: "swords",
        upright: "Curiosidad, comunicación, observación, aprendizaje y nuevas ideas.",
        reversed: "Chismes, impulsividad, falta de tacto o información poco fiable."
    },

    "Knight of Swords": {
        category: "swords",
        upright: "Acción rápida, determinación, ambición, valentía y pensamiento directo.",
        reversed: "Impulsividad, agresividad, imprudencia o actuar sin pensar."
    },

    "Queen of Swords": {
        category: "swords",
        upright: "Claridad mental, independencia, honestidad, inteligencia y límites.",
        reversed: "Frialdad, resentimiento, crítica excesiva o aislamiento."
    },

    "King of Swords": {
        category: "swords",
        upright: "Autoridad intelectual, lógica, justicia, estrategia y claridad.",
        reversed: "Manipulación, abuso intelectual, rigidez, crueldad o falta de ética."
    },


    // ========================================
    // OROS / PENTÁCULOS
    // ========================================

    "Ace of Pentacles": {
        category: "pentacles",
        upright: "Oportunidad material, prosperidad, estabilidad, trabajo y nuevos comienzos.",
        reversed: "Oportunidad perdida, inestabilidad, mala planificación o problemas materiales."
    },

    "Two of Pentacles": {
        category: "pentacles",
        upright: "Equilibrio, adaptación, organización, flexibilidad y manejo de responsabilidades.",
        reversed: "Desorganización, exceso de responsabilidades, estrés o falta de equilibrio."
    },

    "Three of Pentacles": {
        category: "pentacles",
        upright: "Trabajo en equipo, aprendizaje, habilidad, colaboración y reconocimiento.",
        reversed: "Falta de cooperación, trabajo de baja calidad, conflictos o falta de reconocimiento."
    },

    "Four of Pentacles": {
        category: "pentacles",
        upright: "Seguridad, estabilidad, control, ahorro y protección de recursos.",
        reversed: "Apego, avaricia, miedo a perder, control excesivo o dificultad para compartir."
    },

    "Five of Pentacles": {
        category: "pentacles",
        upright: "Dificultades materiales, aislamiento, pérdida y necesidad de apoyo.",
        reversed: "Recuperación, ayuda, mejora económica o superar una etapa difícil."
    },

    "Six of Pentacles": {
        category: "pentacles",
        upright: "Generosidad, ayuda, equilibrio, intercambio y apoyo.",
        reversed: "Dependencia, desigualdad, deuda, condiciones ocultas o generosidad interesada."
    },

    "Seven of Pentacles": {
        category: "pentacles",
        upright: "Paciencia, esfuerzo, evaluación, crecimiento y resultados a largo plazo.",
        reversed: "Impaciencia, resultados insuficientes, frustración o esfuerzo mal dirigido."
    },

    "Eight of Pentacles": {
        category: "pentacles",
        upright: "Trabajo, práctica, aprendizaje, disciplina y perfeccionamiento.",
        reversed: "Falta de concentración, trabajo repetitivo, errores o falta de dedicación."
    },

    "Nine of Pentacles": {
        category: "pentacles",
        upright: "Independencia, prosperidad, seguridad, disfrute y éxito personal.",
        reversed: "Dependencia, problemas financieros, superficialidad o falta de estabilidad."
    },

    "Ten of Pentacles": {
        category: "pentacles",
        upright: "Abundancia, estabilidad, familia, legado, seguridad y éxito duradero.",
        reversed: "Problemas familiares, pérdidas materiales, inestabilidad o conflictos por dinero."
    },

    "Page of Pentacles": {
        category: "pentacles",
        upright: "Aprendizaje, oportunidades, estudio, ambición y nuevos proyectos.",
        reversed: "Falta de compromiso, procrastinación, oportunidades desperdiciadas o falta de planificación."
    },

    "Knight of Pentacles": {
        category: "pentacles",
        upright: "Responsabilidad, paciencia, constancia, disciplina y trabajo estable.",
        reversed: "Estancamiento, lentitud excesiva, rutina o falta de motivación."
    },

    "Queen of Pentacles": {
        category: "pentacles",
        upright: "Estabilidad, cuidado, prosperidad, practicidad y seguridad.",
        reversed: "Desequilibrio entre trabajo y vida personal, inseguridad o exceso de control."
    },

    "King of Pentacles": {
        category: "pentacles",
        upright: "Prosperidad, estabilidad, liderazgo, seguridad y éxito material.",
        reversed: "Avaricia, materialismo, abuso de poder, obsesión por el dinero o inestabilidad."
    }
};


// ========================================
// MAPA DE IMÁGENES
// ========================================

const imageMap = {

    // ARCANOS MAYORES

    "The Fool": "THE FOOL.jpg",
    "The Magician": "THE MAGICIAN.jpg",
    "The High Priestess": "THE HIGH PRIESTESS.jpg",
    "The Empress": "THE EMPRESS.jpg",
    "The Emperor": "THE EMPEROR.jpg",
    "The Hierophant": "THE HIEROPHANT.jpg",
    "The Lovers": "THE LOVERS.jpg",
    "The Chariot": "THE CHARIOT.jpg",
    "Strength": "STRENGTH.jpg",
    "Fortitude": "STRENGTH.jpg",
    "The Hermit": "THE HERMIT.jpg",
    "Wheel of Fortune": "WHEEL OF FORTUNE.jpg",
    "Justice": "JUSTICE.jpg",
    "The Hanged Man": "THE HANGED MAN.jpg",
    "Death": "DEATH.jpg",
    "Temperance": "TEMPERANCE.jpg",
    "The Devil": "THE DEVIL.jpg",
    "The Tower": "THE TOWER.jpg",
    "The Star": "THE STAR.jpg",
    "The Moon": "THE MOON.jpg",
    "The Sun": "THE SUN.jpg",
    "Judgement": "JUDGEMENT.jpg",
    "The World": "THE WORLD.jpg",

    // BASTOS

    "Ace of Wands": "waac.jpg",
    "Two of Wands": "wa02.jpg",
    "Three of Wands": "wa03.jpg",
    "Four of Wands": "wa04.jpg",
    "Five of Wands": "wa05.jpg",
    "Six of Wands": "wa06.jpg",
    "Seven of Wands": "wa07.jpg",
    "Eight of Wands": "wa08.jpg",
    "Nine of Wands": "wa09.jpg",
    "Ten of Wands": "wa10.jpg",
    "Page of Wands": "wapa.jpg",
    "Knight of Wands": "waki.jpg",
    "Queen of Wands": "waqu.jpg",
    "King of Wands": "waking.jpg",

    // COPAS

    "Ace of Cups": "cuac.jpg",
    "Two of Cups": "cu02.jpg",
    "Three of Cups": "cu03.jpg",
    "Four of Cups": "cu04.jpg",
    "Five of Cups": "cu05.jpg",
    "Six of Cups": "cu06.jpg",
    "Seven of Cups": "cu07.jpg",
    "Eight of Cups": "cu08.jpg",
    "Nine of Cups": "cu09.jpg",
    "Ten of Cups": "cu10.jpg",
    "Page of Cups": "cupa.jpg",
    "Knight of Cups": "cuki.jpg",
    "Queen of Cups": "cuqu.jpg",
    "King of Cups": "coking.jpg",

    // ESPADAS

    "Ace of Swords": "swac.jpg",
    "Two of Swords": "sw02.jpg",
    "Three of Swords": "sw03.jpg",
    "Four of Swords": "sw04.jpg",
    "Five of Swords": "sw05.jpg",
    "Six of Swords": "sw06.jpg",
    "Seven of Swords": "sw07.jpg",
    "Eight of Swords": "sw08.jpg",
    "Nine of Swords": "sw09.jpg",
    "Ten of Swords": "sw10.jpg",
    "Page of Swords": "swpa.jpg",
    "Knight of Swords": "swki.jpg",
    "Queen of Swords": "swqu.jpg",
    "King of Swords": "swking.jpg",

    // OROS

    "Ace of Pentacles": "peac.jpg",
    "Two of Pentacles": "pe02.jpg",
    "Three of Pentacles": "pe03.jpg",
    "Four of Pentacles": "pe04.jpg",
    "Five of Pentacles": "pe05.jpg",
    "Six of Pentacles": "pe06.jpg",
    "Seven of Pentacles": "pe07.jpg",
    "Eight of Pentacles": "pe08.jpg",
    "Nine of Pentacles": "pe09.jpg",
    "Ten of Pentacles": "pe10.jpg",
    "Page of Pentacles": "pepa.jpg",
    "Knight of Pentacles": "peki.jpg",
    "Queen of Pentacles": "pequ.jpg",
    "King of Pentacles": "peking.jpg"
};


// ========================================
// NOMBRES EN ESPAÑOL
// ========================================

const spanishNames = {

    "The Fool": "El Loco",
    "The Magician": "El Mago",
    "The High Priestess": "La Sacerdotisa",
    "The Empress": "La Emperatriz",
    "The Emperor": "El Emperador",
    "The Hierophant": "El Hierofante",
    "The Lovers": "Los Enamorados",
    "The Chariot": "El Carro",
    "Strength": "La Fuerza",
    "Fortitude": "La Fuerza",
    "The Hermit": "El Ermitaño",
    "Wheel of Fortune": "La Rueda de la Fortuna",
    "Justice": "La Justicia",
    "The Hanged Man": "El Colgado",
    "Death": "La Muerte",
    "Temperance": "La Templanza",
    "The Devil": "El Diablo",
    "The Tower": "La Torre",
    "The Star": "La Estrella",
    "The Moon": "La Luna",
    "The Sun": "El Sol",
    "Judgement": "El Juicio",
    "The World": "El Mundo",

    "Ace of Wands": "As de Bastos",
    "Two of Wands": "Dos de Bastos",
    "Three of Wands": "Tres de Bastos",
    "Four of Wands": "Cuatro de Bastos",
    "Five of Wands": "Cinco de Bastos",
    "Six of Wands": "Seis de Bastos",
    "Seven of Wands": "Siete de Bastos",
    "Eight of Wands": "Ocho de Bastos",
    "Nine of Wands": "Nueve de Bastos",
    "Ten of Wands": "Diez de Bastos",
    "Page of Wands": "Sota de Bastos",
    "Knight of Wands": "Caballero de Bastos",
    "Queen of Wands": "Reina de Bastos",
    "King of Wands": "Rey de Bastos",

    "Ace of Cups": "As de Copas",
    "Two of Cups": "Dos de Copas",
    "Three of Cups": "Tres de Copas",
    "Four of Cups": "Cuatro de Copas",
    "Five of Cups": "Cinco de Copas",
    "Six of Cups": "Seis de Copas",
    "Seven of Cups": "Siete de Copas",
    "Eight of Cups": "Ocho de Copas",
    "Nine of Cups": "Nueve de Copas",
    "Ten of Cups": "Diez de Copas",
    "Page of Cups": "Sota de Copas",
    "Knight of Cups": "Caballero de Copas",
    "Queen of Cups": "Reina de Copas",
    "King of Cups": "Rey de Copas",

    "Ace of Swords": "As de Espadas",
    "Two of Swords": "Dos de Espadas",
    "Three of Swords": "Tres de Espadas",
    "Four of Swords": "Cuatro de Espadas",
    "Five of Swords": "Cinco de Espadas",
    "Six of Swords": "Seis de Espadas",
    "Seven of Swords": "Siete de Espadas",
    "Eight of Swords": "Ocho de Espadas",
    "Nine of Swords": "Nueve de Espadas",
    "Ten of Swords": "Diez de Espadas",
    "Page of Swords": "Sota de Espadas",
    "Knight of Swords": "Caballero de Espadas",
    "Queen of Swords": "Reina de Espadas",
    "King of Swords": "Rey de Espadas",

    "Ace of Pentacles": "As de Oros",
    "Two of Pentacles": "Dos de Oros",
    "Three of Pentacles": "Tres de Oros",
    "Four of Pentacles": "Cuatro de Oros",
    "Five of Pentacles": "Cinco de Oros",
    "Six of Pentacles": "Seis de Oros",
    "Seven of Pentacles": "Siete de Oros",
    "Eight of Pentacles": "Ocho de Oros",
    "Nine of Pentacles": "Nueve de Oros",
    "Ten of Pentacles": "Diez de Oros",
    "Page of Pentacles": "Sota de Oros",
    "Knight of Pentacles": "Caballero de Oros",
    "Queen of Pentacles": "Reina de Oros",
    "King of Pentacles": "Rey de Oros"
};


// ========================================
// POSICIONES DE LAS TIRADAS
// ========================================

const spreadPositions = {

    line: [
        "Pasado",
        "Presente",
        "Futuro",
        "Consejo",
        "Resultado"
    ],

    vertical: [
        "Situación",
        "Desafío",
        "Consejo",
        "Resultado",
        "Aprendizaje"
    ],

    triangle: [
        "Pasado",
        "Presente",
        "Futuro",
        "Influencia",
        "Resultado"
    ],

    cross: [
        "Situación",
        "Desafío",
        "Centro",
        "Influencia",
        "Resultado"
    ]
};


// ========================================
// OBTENER NOMBRE
// ========================================

function getCardName(card) {

    if (!card) {
        return "Carta";
    }

    return card.name || "Carta";
}


// ========================================
// OBTENER NOMBRE EN ESPAÑOL
// ========================================

function getSpanishCardName(card) {

    const name = getCardName(card);

    return spanishNames[name] || name;
}


// ========================================
// OBTENER CATEGORÍA
// ========================================

function getCardCategory(card) {

    const name = getCardName(card);

    if (tarotMeanings[name]) {
        return tarotMeanings[name].category;
    }

    if (card && card.category) {
        return card.category;
    }

    return "major";
}


// ========================================
// OBTENER IMAGEN
// ========================================

function getCardImage(card) {

    const name = getCardName(card);

    if (imageMap[name]) {
        return "assets/" + imageMap[name];
    }

    return "";
}


// ========================================
// OBTENER SIGNIFICADOS
// ========================================

function getCardMeaning(card, type) {

    const name = getCardName(card);
    const data = tarotMeanings[name];

    if (!data) {
        return "No hay significado disponible.";
    }

    if (type === "reversed") {
        return data.reversed || "No hay significado invertido disponible.";
    }

    return data.upright || "No hay significado normal disponible.";
}


// ========================================
// CREAR CARTA COMPLETA
// ========================================

function normalizeCard(card) {

    const name = getCardName(card);
    const data = tarotMeanings[name] || {};

    return {
        ...card,
        name: name,
        category: data.category || card.category || "major",
        number: data.number || card.number || "",
        meaning: data.upright || card.meaning || "",
        meaning_rev: data.reversed || card.meaning_rev || ""
    };
}


// ========================================
// CARGAR CARTAS
// ========================================

async function loadTarotCards() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("No se pudieron cargar las cartas");
        }

        const data = await response.json();

        const apiCards = data.cards || data;

        tarotCards = apiCards.map(normalizeCard);

        addMissingCards();

        console.log("Tarot cargado:", tarotCards.length);

    } catch (error) {

        console.error("Error con la API:", error);

        createLocalDeck();
    }

    renderLearningCards(currentFilter);
    renderModalCards();
    initializeEmptyCards();
}


// ========================================
// COMPLETAR CARTAS FALTANTES
// ========================================

function addMissingCards() {

    Object.keys(tarotMeanings).forEach(function(name) {

        const exists = tarotCards.some(function(card) {
            return card.name === name;
        });

        if (!exists && imageMap[name]) {

            const data = tarotMeanings[name];

            tarotCards.push({
                name: name,
                category: data.category,
                number: data.number || "",
                meaning: data.upright,
                meaning_rev: data.reversed
            });
        }
    });

    tarotCards = tarotCards.map(normalizeCard);
}


// ========================================
// CREAR MAZO LOCAL
// ========================================

function createLocalDeck() {

    tarotCards = Object.keys(tarotMeanings).map(function(name) {

        const data = tarotMeanings[name];

        return {
            name: name,
            category: data.category,
            number: data.number || "",
            meaning: data.upright,
            meaning_rev: data.reversed
        };
    });

    console.log("Usando mazo local:", tarotCards.length);
}


// ========================================
// CARTAS DE APRENDIZAJE
// ========================================

function renderLearningCards(filter) {

    const container = document.getElementById("learningGrid");

    if (!container) {
        return;
    }

    currentFilter = filter || "all";

    container.innerHTML = "";

    let cardsToShow = tarotCards;

    if (currentFilter !== "all") {

        cardsToShow = tarotCards.filter(function(card) {

            return getCardCategory(card) === currentFilter;

        });
    }

    cardsToShow.forEach(function(card) {

        const article = document.createElement("article");

        article.className = "learning-card";

        const image = getCardImage(card);
        const name = getCardName(card);
        const spanishName = getSpanishCardName(card);
        const category = getCardCategory(card);

        let categoryName = "ARCANO MAYOR";

        if (category === "wands") {
            categoryName = "BASTOS";
        }

        if (category === "cups") {
            categoryName = "COPAS";
        }

        if (category === "swords") {
            categoryName = "ESPADAS";
        }

        if (category === "pentacles") {
            categoryName = "OROS";
        }

        article.innerHTML = `
            <div class="learning-card-image">
                ${
                    image
                        ? `<img src="${image}" alt="${spanishName}">`
                        : `<div class="no-image">TAROT</div>`
                }
            </div>

            <div class="learning-card-info">
                <span>${categoryName}</span>
                <h4>${spanishName}</h4>
            </div>
        `;

        article.addEventListener("click", function() {

            selectedCard = card;

            openCardDetail(card);

        });

        container.appendChild(article);
    });
}


// ========================================
// FILTROS DE CATEGORÍA
// ========================================

function setupCategoryFilters() {

    const filters =
        document.querySelectorAll(".category-filter");

    filters.forEach(function(filter) {

        filter.addEventListener("click", function() {

            filters.forEach(function(item) {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const category =
                filter.dataset.category || "all";

            currentFilter = category;

            renderLearningCards(category);

        });
    });
}


// ========================================
// MODAL DE CARTAS
// ========================================

function renderModalCards() {

    const container =
        document.getElementById("modalCards");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    tarotCards.forEach(function(card) {

        const button =
            document.createElement("button");

        button.className = "selector-card";

        const image = getCardImage(card);
        const name = getCardName(card);
        const spanishName = getSpanishCardName(card);

        let categoryName = "Arcano Mayor";

        const category = getCardCategory(card);

        if (category === "wands") {
            categoryName = "Bastos";
        }

        if (category === "cups") {
            categoryName = "Copas";
        }

        if (category === "swords") {
            categoryName = "Espadas";
        }

        if (category === "pentacles") {
            categoryName = "Oros";
        }

        button.innerHTML = `
            <div class="selector-card-image">
                ${
                    image
                        ? `<img src="${image}" alt="${spanishName}">`
                        : `<div class="no-image">TAROT</div>`
                }
            </div>

            <strong>${spanishName}</strong>

            <small>${categoryName}</small>
        `;

        button.addEventListener("click", function() {

            selectCard(card);

        });

        container.appendChild(button);
    });
}


// ========================================
// SELECCIONAR CARTA
// ========================================

function selectCard(card) {

    selectedCard = card;

    const modal =
        document.getElementById("cardModal");

    if (modal) {
        modal.classList.remove("active");
    }

    openCardDetail(card);
}


// ========================================
// ABRIR DETALLE
// ========================================

function openCardDetail(card) {

    selectedCard = card;

    const modal =
        document.getElementById("detailModal");

    const container =
        document.getElementById("detailCardContainer");

    const title =
        document.getElementById("detailTitle");

    const category =
        document.getElementById("detailCategory");

    if (!modal || !container) {
        return;
    }

    const image = getCardImage(card);
    const spanishName = getSpanishCardName(card);
    const tarotName = getCardName(card);

    if (title) {
        title.textContent = spanishName;
    }

    if (category) {

        const cardCategory =
            getCardCategory(card);

        if (cardCategory === "major") {
            category.textContent = "ARCANO MAYOR";
        }

        if (cardCategory === "wands") {
            category.textContent = "BASTOS";
        }

        if (cardCategory === "cups") {
            category.textContent = "COPAS";
        }

        if (cardCategory === "swords") {
            category.textContent = "ESPADAS";
        }

        if (cardCategory === "pentacles") {
            category.textContent = "OROS";
        }
    }

    container.innerHTML = `
        <div class="detail-tarot-card">

            <div class="detail-tarot-inner">

                <div class="detail-tarot-front">

                    ${
                        image
                            ? `<img src="${image}" alt="${spanishName}">`
                            : `<div class="no-image">TAROT</div>`
                    }

                </div>

                <div class="detail-tarot-back">

                    <span class="detail-card-number">
                        ${card.number || ""}
                    </span>

                    <h4>
                        ${spanishName}
                    </h4>

                </div>

            </div>

        </div>
    `;

    const detailCard =
        container.querySelector(".detail-tarot-card");

    if (detailCard) {

        detailCard.addEventListener("click", function() {

            detailCard.classList.toggle("flipped");

        });
    }

    setupMeaningTabsForCard();

    showMeaning(card, "upright");

    modal.classList.add("active");

    refreshIcons();
}


// ========================================
// SIGNIFICADO
// ========================================

function showMeaning(card, type) {

    const container =
        document.getElementById("meaningContent");

    if (!container) {
        return;
    }

    const text =
        getCardMeaning(card, type);

    const title =
        type === "reversed"
            ? "Significado invertido"
            : "Significado normal";

    container.innerHTML = `
        <h4>${title}</h4>

        <p>
            ${text}
        </p>

        <div class="meaning-keywords">

            ${
                type === "reversed"
                    ? `
                        <span class="meaning-keyword">
                            Invertida
                        </span>
                    `
                    : `
                        <span class="meaning-keyword">
                            Normal
                        </span>
                    `
            }

        </div>
    `;
}


// ========================================
// TABS DE SIGNIFICADO
// ========================================

function setupMeaningTabsForCard() {

    const tabs =
        document.querySelectorAll(".meaning-tab");

    tabs.forEach(function(tab) {

        tab.onclick = function() {

            if (!selectedCard) {
                return;
            }

            tabs.forEach(function(item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const type =
                tab.dataset.meaning || "upright";

            showMeaning(selectedCard, type);
        };
    });
}


// ========================================
// TEMA
// ========================================

function setupTheme() {

    const button =
        document.getElementById("themeToggle");

    const icon =
        document.getElementById("themeIcon");

    if (!button) {
        return;
    }

    const savedTheme =
        localStorage.getItem("arcana-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    updateThemeIcon();

    button.addEventListener("click", function() {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "arcana-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();
    });

    function updateThemeIcon() {

        if (!icon) {
            return;
        }

        const isLight =
            document.body.classList.contains("light");

        icon.setAttribute(
            "data-lucide",
            isLight ? "sun" : "moon"
        );

        refreshIcons();
    }
}


// ========================================
// NAVEGACIÓN
// ========================================

function setupNavigation() {

    const buttons =
        document.querySelectorAll(".nav-button");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            buttons.forEach(function(item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const section =
                button.dataset.section;

            const practice =
                document.getElementById("practiceSection");

            const learn =
                document.getElementById("learnSection");

            if (section === "practice") {

                if (practice) {
                    practice.classList.remove("hidden");
                }

                if (learn) {
                    learn.classList.add("hidden");
                }
            }

            if (section === "learn") {

                if (practice) {
                    practice.classList.add("hidden");
                }

                if (learn) {
                    learn.classList.remove("hidden");
                }
            }
        });
    });
}


// ========================================
// MODAL DE DETALLE
// ========================================

function setupDetailModal() {

    const closeButton =
        document.getElementById("closeDetail");

    const modal =
        document.getElementById("detailModal");

    if (closeButton && modal) {

        closeButton.addEventListener("click", function() {

            modal.classList.remove("active");

        });
    }

    if (modal) {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {
                modal.classList.remove("active");
            }

        });
    }
}


// ========================================
// MODAL DE SELECCIÓN
// ========================================

function setupCardModal() {

    const modal =
        document.getElementById("cardModal");

    const closeButton =
        document.getElementById("closeModal");

    if (closeButton && modal) {

        closeButton.addEventListener("click", function() {

            modal.classList.remove("active");

        });
    }

    if (modal) {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {
                modal.classList.remove("active");
            }

        });
    }
}


// ========================================
// BUSCADOR
// ========================================

function setupCardSearch() {

    const searchInput =
        document.getElementById("cardSearch");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function() {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const cards =
            document.querySelectorAll(".selector-card");

        cards.forEach(function(cardElement) {

            const name =
                cardElement
                    .querySelector("strong")
                    ?.textContent
                    .toLowerCase() || "";

            cardElement.style.display =
                name.includes(query)
                    ? ""
                    : "none";
        });
    });
}


// ========================================
// NÚMERO DE CARTAS
// ========================================

function setupNumberOptions() {

    const options =
        document.querySelectorAll(".number-option");

    options.forEach(function(option) {

        option.addEventListener("click", function() {

            options.forEach(function(item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

        });
    });
}


// ========================================
// TIRADAS
// ========================================

function setupSpreadOptions() {

    const options =
        document.querySelectorAll(".spread-option");

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    options.forEach(function(option) {

        option.addEventListener("click", function() {

            options.forEach(function(item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const spread =
                option.dataset.spread || "line";

            cardsArea.className =
                "cards-area spread-" + spread;

            updateEmptyCardsPositions();

        });
    });
}


// ========================================
// MODO DE SELECCIÓN
// ========================================

function setupSelectionMode() {

    const options =
        document.querySelectorAll(
            ".selection-mode-option"
        );

    options.forEach(function(option) {

        option.addEventListener("click", function() {

            options.forEach(function(item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const mode =
                option.dataset.mode;

            if (mode === "manual") {

                initializeEmptyCards();

            }

            if (mode === "random") {

                clearEmptyCards();

            }

        });
    });
}


// ========================================
// INICIAR CARTAS VACÍAS
// ========================================

function initializeEmptyCards() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    const activeNumber =
        document.querySelector(
            ".number-option.active"
        );

    const number =
        activeNumber
            ? parseInt(activeNumber.dataset.number)
            : 1;

    const currentCards =
        cardsArea.querySelectorAll(".tarot-slot");

    if (currentCards.length > 0) {
        return;
    }

    cardsArea.innerHTML = "";

    for (let i = 0; i < number; i++) {

        createEmptyCardSlot(i);

    }

    updateEmptyCardsPositions();
}


// ========================================
// CREAR CARTA VACÍA
// ========================================

function createEmptyCardSlot(index) {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    const slot =
        document.createElement("div");

    slot.className = "tarot-slot empty-slot";

    slot.dataset.position = index;

    slot.innerHTML = `
        <div class="empty-card">

            <div class="empty-card-plus">

                <i data-lucide="plus"></i>

            </div>

        </div>
    `;

    slot.addEventListener("click", function() {

        openCardSelectorForSlot(slot);

    });

    cardsArea.appendChild(slot);

    refreshIcons();
}


// ========================================
// ABRIR SELECTOR PARA UNA POSICIÓN
// ========================================

function openCardSelectorForSlot(slot) {

    const modal =
        document.getElementById("cardModal");

    if (!modal) {
        return;
    }

    modal.dataset.targetSlot =
        slot.dataset.position;

    modal.classList.add("active");

    refreshIcons();
}


// ========================================
// MODIFICAR SELECTOR PARA ASIGNAR CARTA
// ========================================

function assignCardToSlot(card, slot) {

    if (!slot) {
        return;
    }

    const image =
        getCardImage(card);

    const name =
        getSpanishCardName(card);

    const position =
        parseInt(slot.dataset.position || "0");

    const spread =
        getCurrentSpread();

    const positions =
        spreadPositions[spread] || spreadPositions.line;

    const positionName =
        positions[position] ||
        "Posición " + (position + 1);

    slot.className = "tarot-slot selected-slot";

    slot.innerHTML = `
        <div class="tarot-card">

            <div class="tarot-card-inner">

                <div class="tarot-card-front">

                    ${
                        image
                            ? `<img
                                class="tarot-image"
                                src="${image}"
                                alt="${name}"
                              >`
                            : `<div class="no-image">
                                TAROT
                              </div>`
                    }

                </div>

                <div class="tarot-card-back">

                    <div class="selected-card-name">
                        ${name}
                    </div>

                    <div class="selected-card-position">
                        ${positionName}
                    </div>

                    <div class="selected-card-action">
                        Haz clic para girar
                    </div>

                </div>

            </div>

        </div>
    `;

    const tarotCard =
        slot.querySelector(".tarot-card");

    if (tarotCard) {

        tarotCard.addEventListener("click", function(event) {

            event.stopPropagation();

            tarotCard.classList.toggle("flipped");

        });
    }

    slot.dataset.cardName =
        getCardName(card);

    refreshIcons();
}


// ========================================
// SELECCIONAR CARTA PARA SLOT
// ========================================

function selectCardForSlot(card) {

    const modal =
        document.getElementById("cardModal");

    if (!modal) {
        return;
    }

    const position =
        modal.dataset.targetSlot;

    if (
        position === undefined ||
        position === null ||
        position === ""
    ) {
        selectCard(card);
        return;
    }

    const slot =
        document.querySelector(
            `.tarot-slot[data-position="${position}"]`
        );

    if (slot) {

        const alreadyUsed =
            document.querySelector(
                `.tarot-slot[data-card-name="${CSS.escape(
                    getCardName(card)
                )}"]`
            );

        if (alreadyUsed && alreadyUsed !== slot) {

            alert("Esa carta ya está utilizada en la tirada.");

            return;
        }

        assignCardToSlot(card, slot);

    }

    modal.classList.remove("active");

    delete modal.dataset.targetSlot;
}


// ========================================
// REEMPLAZAR CLICK DEL MODAL
// ========================================

function setupSlotSelection() {

    const container =
        document.getElementById("modalCards");

    if (!container) {
        return;
    }

    container.addEventListener("click", function(event) {

        const button =
            event.target.closest(".selector-card");

        if (!button) {
            return;
        }

        const index =
            Array.from(
                container.querySelectorAll(".selector-card")
            ).indexOf(button);

        if (index === -1) {
            return;
        }

        const card =
            tarotCards[index];

        const modal =
            document.getElementById("cardModal");

        if (
            modal &&
            modal.dataset.targetSlot !== undefined
        ) {

            selectCardForSlot(card);

        }

    });
}


// ========================================
// OBTENER TIRADA ACTUAL
// ========================================

function getCurrentSpread() {

    const active =
        document.querySelector(
            ".spread-option.active"
        );

    if (!active) {
        return "line";
    }

    return active.dataset.spread || "line";
}


// ========================================
// ACTUALIZAR POSICIONES
// ========================================

function updateEmptyCardsPositions() {

    const spread =
        getCurrentSpread();

    const positions =
        spreadPositions[spread] ||
        spreadPositions.line;

    const slots =
        document.querySelectorAll(
            "#cardsArea .tarot-slot"
        );

    slots.forEach(function(slot, index) {

        slot.dataset.position = index;

        const selected =
            slot.classList.contains("selected-slot");

        if (selected) {

            const positionElement =
                slot.querySelector(
                    ".selected-card-position"
                );

            if (positionElement) {

                positionElement.textContent =
                    positions[index] ||
                    "Posición " + (index + 1);

            }
        }
    });
}


// ========================================
// BORRAR CARTAS
// ========================================

function clearEmptyCards() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    cardsArea.innerHTML = "";

    initializeEmptyCards();
}


// ========================================
// SACAR CARTAS AUTOMÁTICAMENTE
// ========================================

function setupDrawButton() {

    const drawButton =
        document.getElementById("drawButton");

    const resetButton =
        document.getElementById("resetButton");

    const cardsArea =
        document.getElementById("cardsArea");

    const status =
        document.getElementById("readingStatus");

    if (!drawButton || !cardsArea) {
        return;
    }

    drawButton.addEventListener("click", function() {

        if (tarotCards.length === 0) {
            return;
        }

        const numberButton =
            document.querySelector(
                ".number-option.active"
            );

        const number =
            numberButton
                ? parseInt(numberButton.dataset.number)
                : 1;

        const shuffled =
            [...tarotCards]
                .sort(function() {
                    return Math.random() - 0.5;
                })
                .slice(0, number);

        const spread =
            getCurrentSpread();

        const positions =
            spreadPositions[spread] ||
            spreadPositions.line;

        cardsArea.innerHTML = "";

        shuffled.forEach(function(card, index) {

            const slot =
                document.createElement("div");

            slot.className =
                "tarot-slot selected-slot";

            slot.dataset.position =
                index;

            slot.dataset.cardName =
                getCardName(card);

            const image =
                getCardImage(card);

            const name =
                getSpanishCardName(card);

            const positionName =
                positions[index] ||
                "Posición " + (index + 1);

            slot.innerHTML = `
                <div class="tarot-card">

                    <div class="tarot-card-inner">

                        <div class="tarot-card-front">

                            ${
                                image
                                    ? `<img
                                        class="tarot-image"
                                        src="${image}"
                                        alt="${name}"
                                      >`
                                    : `<div class="no-image">
                                        TAROT
                                      </div>`
                            }

                        </div>

                        <div class="tarot-card-back">

                            <div class="selected-card-name">
                                ${name}
                            </div>

                            <div class="selected-card-position">
                                ${positionName}
                            </div>

                            <div class="selected-card-action">
                                Haz clic para girar
                            </div>

                        </div>

                    </div>

                </div>
            `;

            const tarotCard =
                slot.querySelector(".tarot-card");

            tarotCard.addEventListener(
                "click",
                function() {

                    tarotCard.classList.toggle(
                        "flipped"
                    );

                }
            );

            cardsArea.appendChild(slot);
        });

        if (status) {

            status.textContent =
                number +
                " carta" +
                (number > 1 ? "s" : "") +
                " seleccionada" +
                (number > 1 ? "s" : "");

        }
    });

    if (resetButton) {

        resetButton.addEventListener("click", function() {

            cardsArea.innerHTML = "";

            initializeEmptyCards();

            if (status) {
                status.textContent = "Preparada";
            }

        });
    }
}


// ========================================
// BOTÓN DE CARTA VACÍA
// ========================================

function setupEmptyCardButton() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    cardsArea.addEventListener("click", function(event) {

        const emptyCard =
            event.target.closest(".empty-card");

        if (!emptyCard) {
            return;
        }

        const slot =
            emptyCard.closest(".tarot-slot");

        if (slot) {
            openCardSelectorForSlot(slot);
        }

    });
}


// ========================================
// ICONOS LUCIDE
// ========================================

function refreshIcons() {

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {

        lucide.createIcons();

    }
}


// ========================================
// ESCAPE
// ========================================

function setupEscapeKey() {

    document.addEventListener("keydown", function(event) {

        if (event.key !== "Escape") {
            return;
        }

        const detailModal =
            document.getElementById("detailModal");

        const cardModal =
            document.getElementById("cardModal");

        if (detailModal) {
            detailModal.classList.remove("active");
        }

        if (cardModal) {
            cardModal.classList.remove("active");
        }

    });
}


// ========================================
// INICIAR APP
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupTheme();

        setupNavigation();

        setupDetailModal();

        setupCardModal();

        setupMeaningTabsForCard();

        setupCategoryFilters();

        setupCardSearch();

        setupNumberOptions();

        setupSpreadOptions();

        setupSelectionMode();

        setupDrawButton();

        setupSlotSelection();

        setupEmptyCardButton();

        setupEscapeKey();

        loadTarotCards();

        refreshIcons();

    }
);