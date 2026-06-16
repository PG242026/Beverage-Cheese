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
  image: etiketAfbeelding,
land: document.getElementById("land")?.value || "",
  provincie: document.getElementById("provincie")?.value || "",
  plaats: document.getElementById("plaats")?.value || ""
     
}) 
  });

  const data = await reactie.json();

  const aiTekst = data.resultaat || data.advies || data.message || "Geen AI advies ontvangen.";

document.getElementById("advies").innerHTML =
"<h2>🧀 AI Analyse</h2><p>" +
aiTekst.replace(/\n/g, "<br>") +
"</p>";

toonAdvies();
toonLocatie();

  document.getElementById("analyseKnop").innerText =
    "🤖 Analyseer etiket";
}
function gebruikHuidigeLocatie() {

  if (!navigator.geolocation) {
    alert("Locatie wordt niet ondersteund op dit apparaat.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const reactie = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await reactie.json();

      document.getElementById("land").value =
        data.address.country || "";

      document.getElementById("provincie").value =
        data.address.state || data.address.region || "";

      document.getElementById("plaats").value =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "";

    },
    function() {
      alert("Locatie ophalen mislukt.");
    }
  );
}
async function zoekKaascombinatie() {

  const land = document.getElementById("land").value;
  const provincie = document.getElementById("provincie").value;
  const plaats = document.getElementById("plaats").value;

  document.getElementById("advies").innerHTML =
    "<h2>🧀 Kaasadvies</h2><p>🤖 AI zoekt de beste combinaties...</p>";

  const reactie = await fetch("/api/kaas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      image: etiketAfbeelding,
      land: land,
      provincie: provincie,
      plaats: plaats,
      kaasadvies: true
    })
  });

  const data = await reactie.json();

  document.getElementById("advies").innerHTML =
    "<h2>🧀 Kaasadvies</h2><p>" +
    data.resultaat.replace(/\n/g, "<br>") +
    "</p>";

  toonAdvies();
}
 

