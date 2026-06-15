document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const drinkCard = cards[1];
    const locationCard = cards[2];
    const adviceCard = cards[3];

    const buttons = Array.from(document.querySelectorAll("button"));
    const scanButton = buttons.find(button => button.innerText.includes("Scan"));
    const manualButton = buttons.find(button => button.innerText.includes("Handmatig"));
    const searchButton = buttons.find(button => button.innerText.includes("Zoek"));

    function hide(element) {
        if (element) element.style.display = "none";
    }

    function show(element) {
        if (element) element.style.display = "block";
    }

    hide(drinkCard);
    hide(locationCard);
    hide(adviceCard);

    if (scanButton) {
        scanButton.addEventListener("click", () => {
            alert("Fotoherkenning komt later. Vul nu handmatig de gegevens in.");
            show(drinkCard);
            show(locationCard);
            hide(adviceCard);
        });
    }

    if (manualButton) {
        manualButton.addEventListener("click", () => {
            show(drinkCard);
            show(locationCard);
            hide(adviceCard);
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            show(adviceCard);
        });
    }
});
