// ========================================
// ARCANA — TAROT LEARNING
// ========================================

// API del Tarot
const API_URL = "https://tarotapi.dev/api/v1/cards";

let tarotCards = [];
let selectedCard = null;


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

        tarotCards = data.cards || data;

        console.log("Cartas cargadas:", tarotCards);

        renderLearningCards();
        renderModalCards();

    } catch (error) {
        console.error("Error cargando el tarot:", error);

        // Si la API falla, mostramos las cartas locales
        loadLocalCards();
    }
}


// ========================================
// CARTAS LOCALES
// ========================================

function loadLocalCards() {

    tarotCards = [
        {
            name: "The Fool",
            category: "major",
            number: "0",
            meaning: "Nuevos comienzos, libertad, aventura, espontaneidad.",
            meaning_rev: "Imprudencia, falta de dirección, decisiones impulsivas."
        },

        {
            name: "The Magician",
            category: "major",
            number: "I",
            meaning: "Manifestación, habilidad, iniciativa, poder personal.",
            meaning_rev: "Manipulación, falta de confianza, recursos mal utilizados."
        },

        {
            name: "The High Priestess",
            category: "major",
            number: "II",
            meaning: "Intuición, misterio, conocimiento interior y sabiduría.",
            meaning_rev: "Secretos, confusión, intuición bloqueada."
        },

        {
            name: "The Empress",
            category: "major",
            number: "III",
            meaning: "Abundancia, creatividad, naturaleza, crecimiento y fertilidad.",
            meaning_rev: "Bloqueo creativo, dependencia, falta de cuidado personal."
        },

        {
            name: "The Emperor",
            category: "major",
            number: "IV",
            meaning: "Autoridad, estabilidad, estructura, liderazgo.",
            meaning_rev: "Control excesivo, rigidez, autoritarismo."
        },

        {
            name: "The Hierophant",
            category: "major",
            number: "V",
            meaning: "Tradición, enseñanza, espiritualidad, conocimiento.",
            meaning_rev: "Rebeldía, dogmatismo, cuestionamiento de las tradiciones."
        },

        {
            name: "The Lovers",
            category: "major",
            number: "VI",
            meaning: "Unión, decisiones, armonía, valores compartidos.",
            meaning_rev: "Desacuerdo, conflicto, indecisión."
        },

        {
            name: "The Chariot",
            category: "major",
            number: "VII",
            meaning: "Determinación, movimiento, victoria y control.",
            meaning_rev: "Falta de dirección, obstáculos, pérdida de control."
        },

        {
            name: "Strength",
            category: "major",
            number: "VIII",
            meaning: "Valentía, paciencia, compasión y fortaleza interior.",
            meaning_rev: "Inseguridad, debilidad, falta de confianza."
        },

        {
            name: "The Hermit",
            category: "major",
            number: "IX",
            meaning: "Introspección, búsqueda interior, sabiduría y soledad.",
            meaning_rev: "Aislamiento, soledad excesiva, evasión."
        },

        {
            name: "Wheel of Fortune",
            category: "major",
            number: "X",
            meaning: "Cambio, ciclos, destino, oportunidades.",
            meaning_rev: "Resistencia al cambio, mala suerte temporal, estancamiento."
        },

        {
            name: "Justice",
            category: "major",
            number: "XI",
            meaning: "Equilibrio, justicia, verdad y responsabilidad.",
            meaning_rev: "Injusticia, desequilibrio, falta de responsabilidad."
        },

        {
            name: "The Hanged Man",
            category: "major",
            number: "XII",
            meaning: "Pausa, sacrificio, perspectiva y aceptación.",
            meaning_rev: "Estancamiento, resistencia, falta de progreso."
        },

        {
            name: "Death",
            category: "major",
            number: "XIII",
            meaning: "Transformación, finales, renovación y cambio profundo.",
            meaning_rev: "Resistencia al cambio, apego al pasado."
        },

        {
            name: "Temperance",
            category: "major",
            number: "XIV",
            meaning: "Equilibrio, armonía, paciencia y moderación.",
            meaning_rev: "Desequilibrio, exceso, impaciencia."
        },

        {
            name: "The Devil",
            category: "major",
            number: "XV",
            meaning: "Apegos, deseos, tentaciones y materialismo.",
            meaning_rev: "Liberación, romper cadenas, recuperar el control."
        },

        {
            name: "The Tower",
            category: "major",
            number: "XVI",
            meaning: "Cambio repentino, revelación, ruptura y transformación.",
            meaning_rev: "Resistencia al cambio, miedo, evitar una transformación necesaria."
        },

        {
            name: "The Star",
            category: "major",
            number: "XVII",
            meaning: "Esperanza, inspiración, renovación y fe.",
            meaning_rev: "Desánimo, pérdida de esperanza, inseguridad."
        },

        {
            name: "The Moon",
            category: "major",
            number: "XVIII",
            meaning: "Intuición, sueños, misterio y emociones.",
            meaning_rev: "Confusión, miedo, ilusiones y engaños."
        },

        {
            name: "The Sun",
            category: "major",
            number: "XIX",
            meaning: "Alegría, éxito, claridad, vitalidad y felicidad.",
            meaning_rev: "Falta de claridad, retrasos, optimismo bloqueado."
        },

        {
            name: "Judgement",
            category: "major",
            number: "XX",
            meaning: "Renacimiento, reflexión, decisiones y despertar.",
            meaning_rev: "Dudas, culpa, incapacidad para avanzar."
        },

        {
            name: "The World",
            category: "major",
            number: "XXI",
            meaning: "Finalización, éxito, integración y realización.",
            meaning_rev: "Ciclo incompleto, falta de cierre, estancamiento."
        }
    ];

    console.log("Usando cartas locales:", tarotCards);

    renderLearningCards();
    renderModalCards();
}


// ========================================
// OBTENER IMAGEN DE LA CARTA
// ========================================

function getCardImage(card) {

    const name = getCardName(card);

    const imageMap = {

        "The Fool": "THE FOOL.jpg",

        "The Magician": "THE MAGICIAN.jpg",

        "The High Priestess": "THE HIGH PRIESTESS.jpg",

        "The Empress": "THE EMPRESS.jpg",

        "The Emperor": "THE EMPEROR.jpg",

        "The Hierophant": "THE HIEROPHANT.jpg",

        "The Lovers": "THE LOVERS.jpg",

        "The Chariot": "THE CHARIOT.jpg",

        "Fortitude": "STRENGTH.jpg",

        "The Hermit": "THE HERMIT.jpg",

        "Justice": "JUSTICE.jpg",

        "The Hanged Man": "THE HANGED MAN.jpg",

        "Death": "DEATH.jpg",

        "Temperance": "TEMPERANCE.jpg",

        "The Devil": "THE DEVIL.jpg",

        "The Tower": "THE TOWER.jpg",

        "The Star": "THE STAR.jpg",

        "The Moon": "THE MOON.jpg",

        "The Sun": "THE SUN.jpg",

        "The World": "THE WORLD.jpg",

        "Ace of Wands": "waac.jpg",

        "Queen of Wands": "waqu.jpg",

        "Knight of Wands": "waki.jpg",

        "Page of Wands": "wapa.jpg",

        "Two of Wands": "wa02.jpg",

        "Three of Wands": "wa03.jpg",

        "Four of Wands": "wa04.jpg",

        "Five of Wands": "wa05.jpg",

        "Six of Wands": "wa06.jpg",

        "Seven of Wands": "wa07.jpg",

        "Eight of Wands": "wa08.jpg",

        "Nine of Wands": "wa09.jpg",

        "Ten of Wands": "wa10.jpg",

        "Ace of Cups": "cuac.jpg",

        "Queen of Cups": "cuqu.jpg",

        "Knight of Cups": "cuki.jpg",

        "Page of Cups": "cupa.jpg",
        
        "Two of Cups": "cu02.jpg",

        "Three of Cups": "cu03.jpg",

        "Four of Cups": "cu04.jpg",

        "Five of Cups": "cu05.jpg",

        "Six of Cups": "cu06.jpg",

        "Seven of Cups": "cu07.jpg",

        "Eight of Cups": "cu08.jpg",

        "Nine of Cups": "cu09.jpg",

        "Ten of Cups": "cu10.jpg",

        "Ace of Swords": "swac.jpg",

        "Queen of Swords": "swqu.jpg",

        "Knight of Swords": "swki.jpg",

        "Page of Swords": "swpa.jpg",

        "Two of Swords": "sw02.jpg",

        "Three of Swords": "sw03.jpg",

        "Four of Swords": "sw04.jpg",

        "Five of Swords": "sw05.jpg",

        "Six of Swords": "sw06.jpg",

        "Seven of Swords": "sw07.jpg",

        "Eight of Swords": "sw08.jpg",

        "Nine of Swords": "sw09.jpg",

        "Ten of Swords": "sw10.jpg",

        "Ace of Pentacles": "peac.jpg",

        "Queen of Pentacles": "pequ.jpg",

        "Knight of Pentacles": "peki.jpg",

        "Page of Pentacles": "pepa.jpg",

        "Two of Pentacles": "pe02.jpg",

        "Three of Pentacles": "pe03.jpg",

        "Four of Pentacles": "pe04.jpg",

        "Five of Pentacles": "pe05.jpg",

        "Six of Pentacles": "pe06.jpg",

        "Seven of Pentacles": "pe07.jpg",

        "Eight of Pentacles": "pe08.jpg",

        "Nine of Pentacles": "pe09.jpg",

        "Ten of Pentacles": "pe10.jpg",

        "King of Wands": "waki.jpg",

        "King of Cups": "cuki.jpg",

        "King of Swords": "swki.jpg",
        
        "King of Pentacles": "peki.jpg",

        "Judgement": "ar20.jpg",

        "Wheel of Fortune": "ar10.jpg",
        
            

        

        
    };

    if (imageMap[name]) {
        return `assets/${imageMap[name]}`;
    }

    return "";
}


// ========================================
// OBTENER NOMBRE
// ========================================

function getCardName(card) {

    return card.name || "Carta";

}


// ========================================
// OBTENER CATEGORÍA
// ========================================

function getCardCategory(card) {

    if (card.category) {
        return card.category;
    }

    if (card.type) {
        return card.type;
    }

    return "major";

}


// ========================================
// MODAL PARA SELECCIONAR CARTA
// ========================================

function renderModalCards() {

    const container = document.getElementById("modalCards");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    tarotCards.forEach(function (card) {

        const button = document.createElement("button");

        button.className = "selector-card";

        const image = getCardImage(card);
        const name = getCardName(card);

        button.innerHTML = `
            <div class="selector-card-image">

                ${image
                ? `<img src="${image}" alt="${name}">`
                : `<div class="no-image">TAROT</div>`
            }

            </div>

            <strong>${name}</strong>

            <small>Arcano Mayor</small>
        `;

        button.addEventListener("click", function () {

            selectCard(card);

        });

        container.appendChild(button);

    });

}


// ========================================
// CARTAS DE APRENDIZAJE
// ========================================

function renderLearningCards(filter = "all") {

    const container =
        document.getElementById("learningGrid");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    let cardsToShow = tarotCards;

    if (filter !== "all") {

        cardsToShow = tarotCards.filter(function (card) {

            return getCardCategory(card) === filter;

        });

    }

    cardsToShow.forEach(function (card) {

        const article =
            document.createElement("article");

        article.className = "learning-card";

        const image = getCardImage(card);
        const name = getCardName(card);

        article.innerHTML = `

            <div class="learning-card-image">

                ${image
                ? `<img src="${image}" alt="${name}">`
                : `<div class="no-image">TAROT</div>`
            }

            </div>

            <div class="learning-card-info">

                <span>ARCANO MAYOR</span>

                <h4>${name}</h4>

            </div>

        `;

        article.addEventListener("click", function () {

            selectedCard = card;

            openCardDetail(card);

        });

        container.appendChild(article);

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

    console.log("Carta seleccionada:", card);

    openCardDetail(card);

}


// ========================================
// ABRIR DETALLE DE CARTA
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

    const meaning =
        document.getElementById("meaningContent");

    if (!modal || !container) {
        return;
    }

    const image = getCardImage(card);
    const name = getCardName(card);

    if (title) {

        title.textContent = name;

    }

    if (category) {

        category.textContent =
            getCardCategory(card) === "major"
                ? "ARCANO MAYOR"
                : "TAROT";

    }

    container.innerHTML = `

        <div class="detail-tarot-card">

            <div class="detail-tarot-inner">

                <div class="detail-tarot-front">

                    ${image
            ? `<img src="${image}" alt="${name}">`
            : `<div class="no-image">TAROT</div>`
        }

                </div>

                <div class="detail-tarot-back">

                    <span class="detail-card-number">
                        ARCANO
                    </span>

                    <h4>
                        ${name}
                    </h4>

                </div>

            </div>

        </div>

    `;

    // Permitir girar la carta
    const detailCard =
        container.querySelector(".detail-tarot-card");

    if (detailCard) {

        detailCard.addEventListener("click", function () {

            detailCard.classList.toggle("flipped");

        });

    }

    if (meaning) {

        showMeaning(card, "upright");

    }

    // Activar modal
    modal.classList.add("active");

    // Volver a crear iconos
    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


// ========================================
// MOSTRAR SIGNIFICADO
// ========================================

function showMeaning(card, type) {

    const container =
        document.getElementById("meaningContent");

    if (!container) {
        return;
    }

    let text = "";

    if (type === "reversed") {

        text =
            card.meaning_rev ||
            card.reversed ||
            card.meaning_reversed ||
            "No hay significado invertido disponible.";

    } else {

        text =
            card.meaning ||
            card.upright ||
            card.meaning_upright ||
            "No hay significado normal disponible.";

    }

    if (Array.isArray(text)) {

        text = text.join(", ");

    }

    container.innerHTML = `

        <p>
            ${text}
        </p>

    `;

}


// ========================================
// TEMA CLARO / OSCURO
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

    button.addEventListener("click", function () {

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

        if (typeof lucide !== "undefined") {

            lucide.createIcons();

        }

    }

}


// ========================================
// NAVEGACIÓN
// ========================================

function setupNavigation() {

    const buttons =
        document.querySelectorAll(".nav-button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            buttons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

            const section =
                button.dataset.section;

            const practice =
                document.getElementById(
                    "practiceSection"
                );

            const learn =
                document.getElementById(
                    "learnSection"
                );

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

        closeButton.addEventListener(
            "click",
            function () {

                modal.classList.remove("active");

            }
        );

    }

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                }

            }
        );

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

        closeButton.addEventListener(
            "click",
            function () {

                modal.classList.remove("active");

            }
        );

    }

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                }

            }
        );

    }

}


// ========================================
// TABS DE SIGNIFICADO
// ========================================

function setupMeaningTabs() {

    const tabs =
        document.querySelectorAll(".meaning-tab");

    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                if (!selectedCard) {
                    return;
                }

                tabs.forEach(function (item) {

                    item.classList.remove("active");

                });

                tab.classList.add("active");

                const type =
                    tab.dataset.meaning;

                showMeaning(
                    selectedCard,
                    type
                );

            }
        );

    });

}


// ========================================
// FILTROS DE CATEGORÍA
// ========================================

function setupCategoryFilters() {

    const filters =
        document.querySelectorAll(".category-filter");

    filters.forEach(function (filter) {

        filter.addEventListener(
            "click",
            function () {

                filters.forEach(function (item) {

                    item.classList.remove("active");

                });

                filter.classList.add("active");

                const category =
                    filter.dataset.category;

                renderLearningCards(category);

            }
        );

    });

}


// ========================================
// BUSCADOR DEL MODAL
// ========================================

function setupCardSearch() {

    const searchInput =
        document.getElementById("cardSearch");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const cards =
                document.querySelectorAll(".selector-card");

            cards.forEach(function (cardElement) {

                const name =
                    cardElement
                        .querySelector("strong")
                        ?.textContent
                        .toLowerCase() || "";

                if (name.includes(query)) {

                    cardElement.style.display = "";

                } else {

                    cardElement.style.display = "none";

                }

            });

        }
    );

}


// ========================================
// CONFIGURACIÓN DE NÚMERO DE CARTAS
// ========================================

function setupNumberOptions() {

    const options =
        document.querySelectorAll(".number-option");

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                options.forEach(function (item) {

                    item.classList.remove("active");

                });

                option.classList.add("active");

                console.log(
                    "Número de cartas:",
                    option.dataset.number
                );

            }
        );

    });

}


// ========================================
// CONFIGURACIÓN DE TIRADA
// ========================================

function setupSpreadOptions() {

    const options =
        document.querySelectorAll(".spread-option");

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                options.forEach(function (item) {

                    item.classList.remove("active");

                });

                option.classList.add("active");

                const spread =
                    option.dataset.spread;

                cardsArea.className =
                    `cards-area spread-${spread}`;

            }
        );

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

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                options.forEach(function (item) {

                    item.classList.remove("active");

                });

                option.classList.add("active");

                console.log(
                    "Modo:",
                    option.dataset.mode
                );

            }
        );

    });

}


// ========================================
// SACAR CARTAS
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

    drawButton.addEventListener(
        "click",
        function () {

            if (tarotCards.length === 0) {
                return;
            }

            const numberButton =
                document.querySelector(
                    ".number-option.active"
                );

            const number =
                numberButton
                    ? parseInt(
                        numberButton.dataset.number
                    )
                    : 1;

            const shuffled =
                [...tarotCards]
                    .sort(
                        () => Math.random() - 0.5
                    )
                    .slice(0, number);

            cardsArea.innerHTML = "";

            shuffled.forEach(function (card) {

                const slot =
                    document.createElement("div");

                slot.className = "tarot-slot";

                const image =
                    getCardImage(card);

                const name =
                    getCardName(card);

                slot.innerHTML = `

                    <div class="tarot-card">

                        <div class="tarot-card-inner">

                            <div class="tarot-card-front">

                                ${image
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
                                    CARTA SELECCIONADA
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
                    function () {

                        tarotCard.classList.toggle(
                            "flipped"
                        );

                    }
                );

                cardsArea.appendChild(slot);

            });

            if (status) {

                status.textContent =
                    `${number} carta${number > 1 ? "s" : ""} seleccionada${number > 1 ? "s" : ""}`;

            }

        }
    );


    // REINICIAR

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                cardsArea.innerHTML = "";

                if (status) {

                    status.textContent =
                        "Preparada";

                }

            }
        );

    }

}


// ========================================
// INICIAR APP
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupTheme();

        setupNavigation();

        setupDetailModal();

        setupCardModal();

        setupMeaningTabs();

        setupCategoryFilters();

        setupCardSearch();

        setupNumberOptions();

        setupSpreadOptions();

        setupSelectionMode();

        setupDrawButton();

        loadTarotCards();

        if (typeof lucide !== "undefined") {

            lucide.createIcons();

        }

    }
);