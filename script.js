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

function toonEtiketFoto(event) {
  const foto = event.target.files[0];

  if (foto) {
    const voorbeeld = document.getElementById("etiketFoto");
    voorbeeld.src = URL.createObjectURL(foto);
    voorbeeld.style.display = "block";

    document.getElementById("analyseKnop").style.display = "block";
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
      image: fotoElement.src
    })
  });

  const data = await reactie.json();

  alert(data.resultaat);

  toonDrankgegevens();

  document.getElementById("analyseKnop").innerText =
    "🤖 Analyseer etiket";
}


