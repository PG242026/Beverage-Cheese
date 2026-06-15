/*
Beverage & Cheese v1.0 SAFE
Basis logica
Later uitbreiden met:
- AI herkenning
- foto analyse
- kaas database
*/


// controleren of app geladen is
document.addEventListener("DOMContentLoaded", () => {

    console.log("Beverage & Cheese gestart 🍷🧀");


    // alle knoppen vinden
    const buttons = document.querySelectorAll("button");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            if(button.innerText.includes("Scan")) {

                alert(
                    "📸 Etiket herkenning wordt later toegevoegd met AI."
                );

            }


            if(button.innerText.includes("Handmatig")) {

                alert(
                    "✍️ Vul de drankgegevens en locatie in."
                );

            }


            if(button.innerText.includes("Zoek")) {

                alert(
                    "🧀 AI kaasadvies wordt voorbereid."
                );

            }

        });

    });

});
