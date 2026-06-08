const targetDate = new Date(2026, 4, 15, 18, 33, 0);

const intro = document.getElementById("intro");
const letterView = document.getElementById("letterView");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const printButton = document.getElementById("printButton");
const statusText = document.getElementById("status");

const fields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const remaining = targetDate.getTime() - now.getTime();
  if (remaining <= 0) {
    fields.days.textContent = "00";
    fields.hours.textContent = "00";
    fields.minutes.textContent = "00";
    fields.seconds.textContent = "00";
    openButton.disabled = false;
    statusText.textContent = "Ya es 15 de junio y son más de las 6:33 PM. La carta está lista para Nataly.";
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  fields.days.textContent = pad(days);
  fields.hours.textContent = pad(hours);
  fields.minutes.textContent = pad(minutes);
  fields.seconds.textContent = pad(seconds);
  statusText.textContent = "El sobre se podrá abrir cuando llegue el 15 de junio a las 6:33 PM";
}

function showLetter() {
  if (openButton.disabled) {
    return;
  }

  intro.classList.add("opening");
  window.setTimeout(() => {
    intro.classList.add("hidden");
    letterView.classList.add("visible");
    letterView.setAttribute("aria-hidden", "false");
  }, 650);
}

function showEnvelope() {
  letterView.classList.remove("visible");
  letterView.setAttribute("aria-hidden", "true");
  intro.classList.remove("hidden");
  window.setTimeout(() => intro.classList.remove("opening"), 30);
}

function printLetter() {
  window.print();
}

openButton.addEventListener("click", showLetter);
closeButton.addEventListener("click", showEnvelope);
printButton.addEventListener("click", printLetter);

updateCountdown();
window.setInterval(updateCountdown, 1000);
