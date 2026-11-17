const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// TEMPORIZADOR
let tempo = 0;
let cronometro;
let iniciado = false;
const timerDisplay = document.querySelector("#timer");

function iniciarCronometro() {
    if (!iniciado) {
        iniciado = true;
        cronometro = setInterval(() => {
            tempo++;
            let minutos = Math.floor(tempo / 60);
            let segundos = tempo % 60;
            timerDisplay.textContent = `Tempo: ${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        }, 1000);
    }
}

function pararCronometro() {
    clearInterval(cronometro);
}

function flipCard({target: clickedCard}) {
    if (cardOne !== clickedCard && !disableDeck && !clickedCard.classList.contains("flip")) {
        iniciarCronometro();
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        const img1 = cardOne.querySelector(".back-view img").src;
        const img2 = cardTwo.querySelector(".back-view img").src;
        matchCards(img1, img2);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        disableDeck = false;
        if (matched === 8) {
            pararCronometro();
            setTimeout(shuffleCard, 1500);
        }
        return;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = null;
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = null;
    pararCronometro();
    tempo = 0;
    iniciado = false;
    timerDisplay.textContent = "Tempo: 00:00";

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, i) => {
        card.classList.remove("flip", "shake");
        card.querySelector(".back-view img").src = `IMG/img${arr[i]}.png`;
        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
