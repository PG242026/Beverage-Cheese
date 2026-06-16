function toonDrankgegevens() {
  document.getElementById("drankgegevens").style.display = "block";
}

function toonLocatie() {
  document.getElementById("locatie").style.display = "block";
}

function toonAdvies() {
  document.getElementById("advies").style.display = "block";
}

window.onload = function() {
  document.getElementById("drankgegevens").style.display = "none";
  document.getElementById("locatie").style.display = "none";
  document.getElementById("advies").style.display = "none";
};
function verbergDrankgegevens() {
  document.getElementById("drankgegevens").style.display = "none";
}
function scanEtiket() {
  document.getElementById("etiketCamera").click();
}

let etiketAfbeelding = "";

function toonEtiketFoto(event) {
  const foto = event.target.files[0];

  if (foto) {

    const reader = new FileReader();

    reader.onload = function() {

      etiketAfbeelding = reader.result;

      const voorbeeld = document.getElementById("etiketFoto");
      voorbeeld.src = etiketAfbeelding;
      voorbeeld.style.display = "block";

      document.getElementById("analyseKnop").style.display = "block";
    };

    reader.readAsDataURL(foto);
  }
}
async function analyseerEtiket() {

  const fotoElement = document.getElementById("etiketFoto");

  if (!fotoElement.src) {
    alert("Maak eerst een foto van het etiket.");
    return;
  }

  document.getElementById("analyseKnop").innerText =
    "🤖 AI analyseert...";

  const reactie = await fetch("/api/analyse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

   body: JSON.stringify({
  image: etiketAfbeelding
}) 
  });

  const data = await reactie.json();

  document.getElementById("advies").innerHTML =
  "<h2>🤖 AI Analyse</h2><p>" +
  data.resultaat.replace(/\n/g, "<br>") +
  "</p>";

toonAdvies();

  toonDrankgegevens();

  document.getElementById("analyseKnop").innerText =
    "🤖 Analyseer etiket";
}


