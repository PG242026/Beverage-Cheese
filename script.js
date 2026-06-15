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

