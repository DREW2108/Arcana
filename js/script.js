// ========================================
// ARCANA — TAROT
// ========================================

// API DEL TAROT
const API_URL = "https://tarotapi.dev/api/v1/cards";

let tarotCards = [];
let selectedCard = null;

// Cartas elegidas manualmente en la tirada
let selectedReadingCards = [];

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
            meaning: "Nuevos comienzos, libertad, aventura y espontaneidad.",
            meaning_rev: "Imprudencia, falta de dirección y decisiones impulsivas."
        },

        {
            name: "The Magician",
            category: "major",
            number: "I",
            meaning: "Manifestación, habilidad, iniciativa y poder personal.",
            meaning_rev: "Manipulación, falta de confianza y recursos mal utilizados."
        },

        {
            name: "The High Priestess",
            category: "major",
            number: "II",
            meaning: "Intuición, misterio, conocimiento interior y sabiduría.",
            meaning_rev: "Secretos, confusión e intuición bloqueada."
        },

        {
            name: "The Empress",
            category: "major",
            number: "III",
            meaning: "Abundancia, creatividad, naturaleza, crecimiento y fertilidad.",
            meaning_rev: "Bloqueo creativo, dependencia y falta de cuidado personal."
        },

        {
            name: "The Emperor",
            category: "major",
            number: "IV",
            meaning: "Autoridad, estabilidad, estructura y liderazgo.",
            meaning_rev: "Control excesivo, rigidez y autoritarismo."
        },

        {
            name: "The Hierophant",
            category: "major",
            number: "V",
            meaning: "Tradición, enseñanza, espiritualidad y conocimiento.",
            meaning_rev: "Rebeldía, dogmatismo y cuestionamiento de las tradiciones."
        },

        {
            name: "The Lovers",
            category: "major",
            number: "VI",
            meaning: "Unión, decisiones, armonía y valores compartidos.",
            meaning_rev: "Desacuerdo, conflicto e indecisión."
        },

        {
            name: "The Chariot",
            category: "major",
            number: "VII",
            meaning: "Determinación, movimiento, victoria y control.",
            meaning_rev: "Falta de dirección, obstáculos y pérdida de control."
        },

        {
            name: "Strength",
            category: "major",
            number: "VIII",
            meaning: "Valentía, paciencia, compasión y fortaleza interior.",
            meaning_rev: "Inseguridad, debilidad y falta de confianza."
        },

        {
            name: "The Hermit",
            category: "major",
            number: "IX",
            meaning: "Introspección, búsqueda interior, sabiduría y soledad.",
            meaning_rev: "Aislamiento, soledad excesiva y evasión."
        },

        {
            name: "Wheel of Fortune",
            category: "major",
            number: "X",
            meaning: "Cambio, ciclos, destino y oportunidades.",
            meaning_rev: "Resistencia al cambio, mala suerte temporal y estancamiento."
        },

        {
            name: "Justice",
            category: "major",
            number: "XI",
            meaning: "Equilibrio, justicia, verdad y responsabilidad.",
            meaning_rev: "Injusticia, desequilibrio y falta de responsabilidad."
        },

        {
            name: "The Hanged Man",
            category: "major",
            number: "XII",
            meaning: "Pausa, sacrificio, perspectiva y aceptación.",
            meaning_rev: "Estancamiento, resistencia y falta de progreso."
        },

        {
            name: "Death",
            category: "major",
            number: "XIII",
            meaning: "Transformación, finales, renovación y cambio profundo.",
            meaning_rev: "Resistencia al cambio y apego al pasado."
        },

        {
            name: "Temperance",
            category: "major",
            number: "XIV",
            meaning: "Equilibrio, armonía, paciencia y moderación.",
            meaning_rev: "Desequilibrio, exceso e impaciencia."
        },

        {
            name: "The Devil",
            category: "major",
            number: "XV",
            meaning: "Apegos, deseos, tentaciones y materialismo.",
            meaning_rev: "Liberación, romper cadenas y recuperar el control."
        },

        {
            name: "The Tower",
            category: "major",
            number: "XVI",
            meaning: "Cambio repentino, revelación, ruptura y transformación.",
            meaning_rev: "Resistencia al cambio, miedo y evitar una transformación necesaria."
        },

        {
            name: "The Star",
            category: "major",
            number: "XVII",
            meaning: "Esperanza, inspiración, renovación y fe.",
            meaning_rev: "Desánimo, pérdida de esperanza e inseguridad."
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
            meaning_rev: "Falta de claridad, retrasos y optimismo bloqueado."
        },

        {
            name: "Judgement",
            category: "major",
            number: "XX",
            meaning: "Renacimiento, reflexión, decisiones y despertar.",
            meaning_rev: "Dudas, culpa e incapacidad para avanzar."
        },

        {
            name: "The World",
            category: "major",
            number: "XXI",
            meaning: "Finalización, éxito, integración y realización.",
            meaning_rev: "Ciclo incompleto, falta de cierre y estancamiento."
        }

    ];

    console.log("Usando cartas locales:", tarotCards);

    renderLearningCards();
    renderModalCards();
}

// ========================================
// OBTENER IMAGEN
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
        "King of Wands": "waki.jpg",

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
        "King of Cups": "cuki.jpg",

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
        "King of Swords": "swki.jpg",

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
        "King of Pentacles": "peki.jpg"
    };

    if (imageMap[name]) {
        return `assets/${imageMap[name]}`;
    }

    return "";
}

// ========================================
// NOMBRE
// ========================================

function getCardName(card) {
    return card.name || "Carta";
}

// ========================================
// CATEGORÍA
// ========================================

function getCardCategory(card) {

    if (card.category) {
        return card.category.toLowerCase();
    }

    if (card.type) {
        return card.type.toLowerCase();
    }

    const name = getCardName(card).toLowerCase();

    if (
        name.includes("wands") ||
        name.includes("cups") ||
        name.includes("swords") ||
        name.includes("pentacles")
    ) {
        return "minor";
    }

    return "major";
}

// ========================================
// NORMALIZAR CATEGORÍAS
// ========================================

function getFilterCategory(card) {

    const category = getCardCategory(card);
    const name = getCardName(card).toLowerCase();

    if (category === "major" || category === "major arcana") {
        return "major";
    }

    if (
        category === "wands" ||
        name.includes("wands") ||
        name.includes("bastos")
    ) {
        return "wands";
    }

    if (
        category === "cups" ||
        name.includes("cups") ||
        name.includes("copas")
    ) {
        return "cups";
    }

    if (
        category === "swords" ||
        name.includes("swords") ||
        name.includes("espadas")
    ) {
        return "swords";
    }

    if (
        category === "pentacles" ||
        name.includes("pentacles") ||
        name.includes("oros")
    ) {
        return "pentacles";
    }

    return "major";
}

// ========================================
// MODAL DE SELECCIÓN
// ========================================

function renderModalCards() {

    const container = document.getElementById("modalCards");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    tarotCards.forEach(function(card) {

        const button = document.createElement("button");

        button.className = "selector-card";

        const image = getCardImage(card);
        const name = getCardName(card);

        button.innerHTML = `
            <div class="selector-card-image">
                ${
                    image
                    ? `<img src="${image}" alt="${name}">`
                    : `<div class="no-image">TAROT</div>`
                }
            </div>

            <strong>${name}</strong>

            <small>${getCategoryLabel(card)}</small>
        `;

        button.addEventListener("click", function() {

            if (window.currentSelectingSlot !== null) {

                assignCardToSlot(
                    window.currentSelectingSlot,
                    card
                );

            } else {

                selectCard(card);

            }

        });

        container.appendChild(button);
    });
}

// ========================================
// NOMBRE DE CATEGORÍA
// ========================================

function getCategoryLabel(card) {

    const category = getFilterCategory(card);

    const labels = {
        major: "ARCANO MAYOR",
        wands: "BASTOS",
        cups: "COPAS",
        swords: "ESPADAS",
        pentacles: "OROS"
    };

    return labels[category] || "TAROT";
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

        cardsToShow = tarotCards.filter(function(card) {

            return getFilterCategory(card) === filter;

        });

    }

    if (cardsToShow.length === 0) {

        container.innerHTML = `
            <div class="empty-search">
                No hay cartas disponibles en esta categoría.
            </div>
        `;

        return;
    }

    cardsToShow.forEach(function(card) {

        const article =
            document.createElement("article");

        article.className = "learning-card";

        const image = getCardImage(card);
        const name = getCardName(card);

        article.innerHTML = `
            <div class="learning-card-image">

                ${
                    image
                    ? `<img src="${image}" alt="${name}">`
                    : `<div class="no-image">TAROT</div>`
                }

            </div>

            <div class="learning-card-info">

                <span>${getCategoryLabel(card)}</span>

                <h4>${name}</h4>

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
        category.textContent = getCategoryLabel(card);
    }

    container.innerHTML = `

        <div class="detail-tarot-card">

            <div class="detail-tarot-inner">

                <div class="detail-tarot-front">

                    ${
                        image
                        ? `<img src="${image}" alt="${name}">`
                        : `<div class="no-image">TAROT</div>`
                    }

                </div>

                <div class="detail-tarot-back">

                    <span class="detail-card-number">
                        ${card.number || ""}
                    </span>

                    <h4>${name}</h4>

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

    if (meaning) {
        showMeaning(card, "upright");
    }

    modal.classList.add("active");

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
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
        <p>${text}</p>
    `;
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
// MODAL DETALLE
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
// MODAL SELECCIÓN
// ========================================

function setupCardModal() {

    const modal =
        document.getElementById("cardModal");

    const closeButton =
        document.getElementById("closeModal");

    if (closeButton && modal) {

        closeButton.addEventListener("click", function() {

            modal.classList.remove("active");

            window.currentSelectingSlot = null;

        });

    }

    if (modal) {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {

                modal.classList.remove("active");

                window.currentSelectingSlot = null;

            }

        });

    }
}

// ========================================
// TABS DE SIGNIFICADO
// ========================================

function setupMeaningTabs() {

    const tabs =
        document.querySelectorAll(".meaning-tab");

    tabs.forEach(function(tab) {

        tab.addEventListener("click", function() {

            if (!selectedCard) {
                return;
            }

            tabs.forEach(function(item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const type =
                tab.dataset.meaning;

            showMeaning(
                selectedCard,
                type
            );

        });

    });
}

// ========================================
// FILTROS
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
                filter.dataset.category;

            renderLearningCards(category);

        });

    });
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

            const number =
                parseInt(option.dataset.number);

            createEmptySlots(number);

        });

    });
}

// ========================================
// CREAR CARTAS VACÍAS
// ========================================

function createEmptySlots(number) {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    selectedReadingCards =
        new Array(number).fill(null);

    cardsArea.innerHTML = "";

    for (let i = 0; i < number; i++) {

        const slot =
            document.createElement("div");

        slot.className = "tarot-slot";

        slot.innerHTML = `

            <div
                class="empty-card"
                data-slot="${i}"
                title="Elegir carta"
            >

                <div class="empty-card-plus">

                    <i data-lucide="plus"></i>

                </div>

            </div>

        `;

        const emptyCard =
            slot.querySelector(".empty-card");

        emptyCard.addEventListener("click", function() {

            openCardSelector(i);

        });

        cardsArea.appendChild(slot);
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    updateReadingStatus();
}

// ========================================
// ABRIR SELECTOR PARA UNA POSICIÓN
// ========================================

function openCardSelector(slotIndex) {

    window.currentSelectingSlot = slotIndex;

    const modal =
        document.getElementById("cardModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    const searchInput =
        document.getElementById("cardSearch");

    if (searchInput) {
        searchInput.value = "";

        const cards =
            document.querySelectorAll(".selector-card");

        cards.forEach(function(card) {
            card.style.display = "";
        });
    }
}

// ========================================
// PONER CARTA EN UNA POSICIÓN
// ========================================

function assignCardToSlot(slotIndex, card) {

    if (slotIndex === null || slotIndex === undefined) {
        return;
    }

    const alreadyUsed =
        selectedReadingCards.some(function(item, index) {

            return (
                index !== slotIndex &&
                item &&
                getCardName(item) === getCardName(card)
            );

        });

    if (alreadyUsed) {

        alert("Esa carta ya está utilizada en esta tirada.");

        return;
    }

    selectedReadingCards[slotIndex] = card;

    window.currentSelectingSlot = null;

    const modal =
        document.getElementById("cardModal");

    if (modal) {
        modal.classList.remove("active");
    }

    renderReadingSlots();

    updateReadingStatus();
}

// ========================================
// MOSTRAR CARTAS DE LA TIRADA
// ========================================

function renderReadingSlots() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    cardsArea.innerHTML = "";

    selectedReadingCards.forEach(function(card, index) {

        const slot =
            document.createElement("div");

        slot.className = "tarot-slot";

        if (!card) {

            slot.innerHTML = `

                <div
                    class="empty-card"
                    data-slot="${index}"
                    title="Elegir carta"
                >

                    <div class="empty-card-plus">

                        <i data-lucide="plus"></i>

                    </div>

                </div>

            `;

            const emptyCard =
                slot.querySelector(".empty-card");

            emptyCard.addEventListener("click", function() {

                openCardSelector(index);

            });

        } else {

            const image =
                getCardImage(card);

            const name =
                getCardName(card);

            slot.innerHTML = `

                <div class="tarot-card">

                    <div class="tarot-card-inner">

                        <div class="tarot-card-front">

                            ${
                                image
                                ? `
                                    <img
                                        class="tarot-image"
                                        src="${image}"
                                        alt="${name}"
                                    >
                                  `
                                : `
                                    <div class="no-image">
                                        TAROT
                                    </div>
                                  `
                            }

                        </div>

                        <div class="tarot-card-back">

                            <div class="selected-card-name">
                                ${name}
                            </div>

                            <div class="selected-card-position">
                                POSICIÓN ${index + 1}
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

            tarotCard.addEventListener("click", function() {

                tarotCard.classList.toggle("flipped");

            });

            // Doble clic para cambiar la carta
            tarotCard.addEventListener("dblclick", function(event) {

                event.stopPropagation();

                openCardSelector(index);

            });

        }

        cardsArea.appendChild(slot);

    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// ========================================
// ACTUALIZAR ESTADO
// ========================================

function updateReadingStatus() {

    const status =
        document.getElementById("readingStatus");

    if (!status) {
        return;
    }

    const total =
        selectedReadingCards.length;

    const selected =
        selectedReadingCards.filter(Boolean).length;

    if (total === 0) {

        status.textContent = "Preparada";

    } else if (selected === 0) {

        status.textContent =
            `${total} espacio${total > 1 ? "s" : ""} disponible${total > 1 ? "s" : ""}`;

    } else if (selected < total) {

        status.textContent =
            `${selected} de ${total} cartas seleccionadas`;

    } else {

        status.textContent =
            `${total} carta${total > 1 ? "s" : ""} seleccionada${total > 1 ? "s" : ""}`;

    }
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
                option.dataset.spread;

            cardsArea.className =
                `cards-area spread-${spread}`;

            // Volver a renderizar para conservar las cartas
            renderReadingSlots();

        });

    });
}

// ========================================
// MODO DE SELECCIÓN
// ========================================

function setupSelectionMode() {

    const options =
        document.querySelectorAll(".selection-mode-option");

    options.forEach(function(option) {

        option.addEventListener("click", function() {

            options.forEach(function(item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            console.log(
                "Modo:",
                option.dataset.mode
            );

        });

    });
}

// ========================================
// SACAR CARTAS ALEATORIAS
// ========================================

function setupDrawButton() {

    const drawButton =
        document.getElementById("drawButton");

    const resetButton =
        document.getElementById("resetButton");

    const cardsArea =
        document.getElementById("cardsArea");

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

        selectedReadingCards = shuffled;

        renderReadingSlots();

        updateReadingStatus();

    });

    if (resetButton) {

        resetButton.addEventListener("click", function() {

            const numberButton =
                document.querySelector(
                    ".number-option.active"
                );

            const number =
                numberButton
                ? parseInt(numberButton.dataset.number)
                : 1;

            selectedReadingCards =
                new Array(number).fill(null);

            renderReadingSlots();

            updateReadingStatus();

        });

    }
}

// ========================================
// INICIAR
// ========================================

document.addEventListener("DOMContentLoaded", function() {

    // Variable utilizada para saber qué espacio estamos editando
    window.currentSelectingSlot = null;

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

});