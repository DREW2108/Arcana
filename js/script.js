const API_URL = "https://tarotapi.dev/api/v1/cards";

const IMAGE_BASE_URL = "https://petaloverflow.github.io/tarot-api/cards/";

let tarotCards = [];
let selectedCard = null;

let selectedNumber = 1;
let selectedSpread = "line";
let selectedMode = "random";


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

        if (Array.isArray(data)) {
            tarotCards = data;
        } else if (data.cards && Array.isArray(data.cards)) {
            tarotCards = data.cards;
        } else {
            tarotCards = [];
        }

        console.log("Cartas cargadas:", tarotCards);

        renderLearningCards();
        renderModalCards();

        updateReadingStatus("Preparada");

    } catch (error) {
        console.error("Error cargando el tarot:", error);
        updateReadingStatus("Error al cargar");
    }
}


// ========================================
// OBTENER IMAGEN DE CARTA
// ========================================

function getCardImage(card) {

    if (!card) {
        return "";
    }

    if (card.image) {
        return card.image;
    }

    if (card.image_url) {
        return card.image_url;
    }

    if (card.imageUrl) {
        return card.imageUrl;
    }

    if (card.name_short) {
        return IMAGE_BASE_URL + card.name_short + ".jpg";
    }

    return "";
}


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
// OBTENER CATEGORIA
// ========================================

function getCardCategory(card) {

    if (!card) {
        return "TAROT";
    }

    if (card.type) {
        return card.type;
    }

    if (card.arcana) {
        return card.arcana;
    }

    if (card.suit) {
        return card.suit;
    }

    if (card.name_short && card.name_short.startsWith("ar")) {
        return "Arcanos Mayores";
    }

    if (card.name_short && card.name_short.startsWith("wa")) {
        return "Bastos";
    }

    if (card.name_short && card.name_short.startsWith("cu")) {
        return "Copas";
    }

    if (card.name_short && card.name_short.startsWith("sw")) {
        return "Espadas";
    }

    if (card.name_short && card.name_short.startsWith("pe")) {
        return "Oros";
    }

    return "TAROT";
}


// ========================================
// CREAR IMAGEN
// ========================================

function createImageHTML(card, className) {

    const image = getCardImage(card);
    const name = getCardName(card);

    if (!image) {
        return `
            <div class="no-image">
                TAROT
            </div>
        `;
    }

    return `
        <img
            class="${className}"
            src="${image}"
            alt="${name}"
            loading="lazy"
            onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
        >
    `;
}


// ========================================
// CARTAS DEL MODAL
// ========================================

function renderModalCards(cardsToRender) {

    const container = document.getElementById("modalCards");

    if (!container) {
        return;
    }

    const cards = cardsToRender || tarotCards;

    container.innerHTML = "";

    if (cards.length === 0) {
        container.innerHTML = `
            <div class="empty-search">
                No se encontraron cartas.
            </div>
        `;

        return;
    }

    cards.forEach(function(card) {

        const button = document.createElement("button");

        button.className = "selector-card";
        button.type = "button";

        const imageHTML = createImageHTML(card, "");

        button.innerHTML = `
            <div class="selector-card-image">
                ${imageHTML}
            </div>

            <strong>
                ${getCardName(card)}
            </strong>
        `;

        button.addEventListener("click", function() {
            selectCard(card);
        });

        container.appendChild(button);
    });
}


// ========================================
// CARTAS DE APRENDIZAJE
// ========================================

function renderLearningCards(cardsToRender) {

    const container = document.getElementById("learningGrid");

    if (!container) {
        return;
    }

    const cards = cardsToRender || tarotCards;

    container.innerHTML = "";

    if (cards.length === 0) {
        container.innerHTML = `
            <div class="empty-search">
                No se encontraron cartas.
            </div>
        `;

        return;
    }

    cards.forEach(function(card) {

        const article = document.createElement("article");

        article.className = "learning-card";

        const imageHTML = createImageHTML(card, "");

        article.innerHTML = `
            <div class="learning-card-image">
                ${imageHTML}
            </div>

            <div class="learning-card-info">

                <span>
                    ${getCardCategory(card)}
                </span>

                <h4>
                    ${getCardName(card)}
                </h4>

            </div>
        `;

        article.addEventListener("click", function() {
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

    const modal = document.getElementById("cardModal");

    if (modal) {
        modal.classList.remove("active");
    }

    openCardDetail(card);
}


// ========================================
// ABRIR DETALLE
// ========================================

function openCardDetail(card) {

    if (!card) {
        return;
    }

    selectedCard = card;

    const modal = document.getElementById("detailModal");

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
    const name = getCardName(card);

    if (title) {
        title.textContent = name;
    }

    if (category) {
        category.textContent = getCardCategory(card);
    }

    container.innerHTML = `
        <div class="detail-tarot-card" id="detailTarotCard">

            <div class="detail-tarot-inner">

                <div class="detail-tarot-front">

                    ${
                        image
                        ? `
                            <img
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

                <div class="detail-tarot-back">

                    <div class="detail-card-number">
                        ARCANA
                    </div>

                    <h4>
                        ${name}
                    </h4>

                    <p>
                        Haz clic para volver
                    </p>

                </div>

            </div>

        </div>
    `;

    const detailCard =
        document.getElementById("detailTarotCard");

    if (detailCard) {

        detailCard.addEventListener("click", function() {

            detailCard.classList.toggle("flipped");

        });

    }

    showMeaning(card, "upright");

    const uprightTab =
        document.querySelector(
            '.meaning-tab[data-meaning="upright"]'
        );

    const reversedTab =
        document.querySelector(
            '.meaning-tab[data-meaning="reversed"]'
        );

    if (uprightTab) {
        uprightTab.classList.add("active");
    }

    if (reversedTab) {
        reversedTab.classList.remove("active");
    }

    modal.classList.add("active");

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

    if (!container || !card) {
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
// NAVEGACION
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
// NUMERO DE CARTAS
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

            selectedNumber =
                parseInt(option.dataset.number, 10);

            updateReadingStatus(
                selectedNumber + " carta" +
                (selectedNumber === 1 ? "" : "s") +
                " seleccionada"
            );

        });

    });
}


// ========================================
// TIPOS DE TIRADA
// ========================================

function setupSpreadOptions() {

    const options =
        document.querySelectorAll(".spread-option");

    options.forEach(function(option) {

        option.addEventListener("click", function() {

            options.forEach(function(item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            selectedSpread =
                option.dataset.spread;

            updateSpreadClass();

        });

    });
}


// ========================================
// ACTUALIZAR POSICION
// ========================================

function updateSpreadClass() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    cardsArea.classList.remove(
        "spread-line",
        "spread-vertical",
        "spread-triangle",
        "spread-cross"
    );

    cardsArea.classList.add(
        "spread-" + selectedSpread
    );
}


// ========================================
// MODO DE SELECCION
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

            selectedMode =
                option.dataset.mode;

            updateReadingStatus(
                selectedMode === "random"
                ? "Tirada automatica"
                : "Seleccion manual"
            );

            renderEmptyCards();

        });

    });
}


// ========================================
// CARTAS VACIAS
// ========================================

function renderEmptyCards() {

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    cardsArea.innerHTML = "";

    for (let i = 0; i < selectedNumber; i++) {

        const slot =
            document.createElement("div");

        slot.className = "tarot-slot";

        const emptyCard =
            document.createElement("div");

        emptyCard.className = "empty-card";

        emptyCard.innerHTML = `
            <div class="empty-card-plus">
                <i data-lucide="plus"></i>
            </div>
        `;

        emptyCard.addEventListener(
            "click",
            function() {

                if (selectedMode === "manual") {

                    openCardSelector();

                }

            }
        );

        slot.appendChild(emptyCard);

        cardsArea.appendChild(slot);
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}


// ========================================
// SACAR CARTAS ALEATORIAS
// ========================================

function drawCards() {

    if (!tarotCards.length) {
        updateReadingStatus("No hay cartas");
        return;
    }

    const cardsArea =
        document.getElementById("cardsArea");

    if (!cardsArea) {
        return;
    }

    const shuffled =
        [...tarotCards].sort(
            () => Math.random() - 0.5
        );

    const selected =
        shuffled.slice(
            0,
            Math.min(selectedNumber, tarotCards.length)
        );

    cardsArea.innerHTML = "";

    selected.forEach(function(card, index) {

        const slot =
            document.createElement("div");

        slot.className = "tarot-slot";

        const cardElement =
            document.createElement("div");

        cardElement.className = "tarot-card";

        const image =
            getCardImage(card);

        const name =
            getCardName(card);

        cardElement.innerHTML = `
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
                        Carta ${index + 1}
                    </div>

                    <div class="selected-card-action">
                        Haz clic para ver
                    </div>

                </div>

            </div>
        `;

        cardElement.addEventListener(
            "click",
            function() {

                cardElement.classList.toggle("flipped");

            }
        );

        cardElement.addEventListener(
            "dblclick",
            function() {

                openCardDetail(card);

            }
        );

        slot.appendChild(cardElement);

        cardsArea.appendChild(slot);

    });

    updateReadingStatus(
        selected.length +
        " carta" +
        (selected.length === 1 ? "" : "s") +
        " seleccionada" +
        (selected.length === 1 ? "" : "s")
    );
}


// ========================================
// BOTON SACAR CARTAS
// ========================================

function setupDrawButton() {

    const button =
        document.getElementById("drawButton");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function() {

            if (selectedMode === "random") {

                drawCards();

            } else {

                openCardSelector();

            }

        }
    );
}


// ========================================
// ABRIR SELECTOR
// ========================================

function openCardSelector() {

    const modal =
        document.getElementById("cardModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

}


// ========================================
// REINICIAR
// ========================================

function setupResetButton() {

    const button =
        document.getElementById("resetButton");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function() {

            selectedNumber = 1;
            selectedSpread = "line";
            selectedMode = "random";

            document.querySelectorAll(
                ".number-option"
            ).forEach(function(item) {

                item.classList.remove("active");

            });

            const numberOne =
                document.querySelector(
                    '.number-option[data-number="1"]'
                );

            if (numberOne) {
                numberOne.classList.add("active");
            }

            document.querySelectorAll(
                ".spread-option"
            ).forEach(function(item) {

                item.classList.remove("active");

            });

            const lineOption =
                document.querySelector(
                    '.spread-option[data-spread="line"]'
                );

            if (lineOption) {
                lineOption.classList.add("active");
            }

            document.querySelectorAll(
                ".selection-mode-option"
            ).forEach(function(item) {

                item.classList.remove("active");

            });

            const randomOption =
                document.querySelector(
                    '.selection-mode-option[data-mode="random"]'
                );

            if (randomOption) {
                randomOption.classList.add("active");
            }

            updateSpreadClass();

            renderEmptyCards();

            updateReadingStatus("Preparada");

        }
    );
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
            function() {

                modal.classList.remove("active");

            }
        );

    }

    if (modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                }

            }
        );

    }
}


// ========================================
// MODAL DE SELECCION
// ========================================

function setupCardModal() {

    const modal =
        document.getElementById("cardModal");

    const closeButton =
        document.getElementById("closeModal");

    if (closeButton && modal) {

        closeButton.addEventListener(
            "click",
            function() {

                modal.classList.remove("active");

            }
        );

    }

    if (modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {

                    modal.classList.remove("active");

                }

            }
        );

    }
}


// ========================================
// BUSQUEDA DE CARTAS
// ========================================

function setupCardSearch() {

    const input =
        document.getElementById("cardSearch");

    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        function() {

            const search =
                input.value
                    .toLowerCase()
                    .trim();

            if (!search) {

                renderModalCards();

                return;

            }

            const filtered =
                tarotCards.filter(
                    function(card) {

                        return getCardName(card)
                            .toLowerCase()
                            .includes(search);

                    }
                );

            renderModalCards(filtered);

        }
    );
}


// ========================================
// FILTROS DE APRENDIZAJE
// ========================================

function setupCategoryFilters() {

    const filters =
        document.querySelectorAll(
            ".category-filter"
        );

    filters.forEach(function(filter) {

        filter.addEventListener(
            "click",
            function() {

                filters.forEach(
                    function(item) {
                        item.classList.remove("active");
                    }
                );

                filter.classList.add("active");

                const category =
                    filter.dataset.category;

                if (category === "all") {

                    renderLearningCards();

                    return;

                }

                const filtered =
                    tarotCards.filter(
                        function(card) {

                            const short =
                                card.name_short || "";

                            if (category === "major") {
                                return short.startsWith("ar");
                            }

                            if (category === "wands") {
                                return short.startsWith("wa");
                            }

                            if (category === "cups") {
                                return short.startsWith("cu");
                            }

                            if (category === "swords") {
                                return short.startsWith("sw");
                            }

                            if (category === "pentacles") {
                                return short.startsWith("pe");
                            }

                            return true;

                        }
                    );

                renderLearningCards(filtered);

            }
        );

    });
}


// ========================================
// TABS NORMAL / INVERTIDA
// ========================================

function setupMeaningTabs() {

    const tabs =
        document.querySelectorAll(
            ".meaning-tab"
        );

    tabs.forEach(function(tab) {

        tab.addEventListener(
            "click",
            function() {

                if (!selectedCard) {
                    return;
                }

                tabs.forEach(
                    function(item) {
                        item.classList.remove("active");
                    }
                );

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
// ESTADO DE LECTURA
// ========================================

function updateReadingStatus(text) {

    const status =
        document.getElementById("readingStatus");

    if (!status) {
        return;
    }

    status.textContent = text;
}


// ========================================
// TECLADO
// ========================================

function setupKeyboard() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {

                const cardModal =
                    document.getElementById("cardModal");

                const detailModal =
                    document.getElementById("detailModal");

                if (cardModal) {
                    cardModal.classList.remove("active");
                }

                if (detailModal) {
                    detailModal.classList.remove("active");
                }

            }

        }
    );
}


// ========================================
// INICIAR APP
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupTheme();

        setupNavigation();

        setupNumberOptions();

        setupSpreadOptions();

        setupSelectionMode();

        setupDrawButton();

        setupResetButton();

        setupDetailModal();

        setupCardModal();

        setupCardSearch();

        setupCategoryFilters();

        setupMeaningTabs();

        setupKeyboard();

        renderEmptyCards();

        loadTarotCards();

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }
);