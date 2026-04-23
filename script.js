// script.js

const token = "DEIBJaDx8vV6JY2byaeWadasWkoOfD94";

let gateOpen = false;

// ---------------- CLOCK ----------------
function updateClock() {
  const now = new Date();

  let time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.getElementById("clock").textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

// ---------------- BLYNK READ ----------------
async function getPin(pin) {
  const url =
    `https://blynk.cloud/external/api/get?token=${token}&${pin}`;

  const res = await fetch(url);
  return await res.text();
}

// ---------------- LOAD LIVE DATA ----------------
async function loadData() {
  try {
    const v0 = (await getPin("V0")).trim(); // available
    const v1 = (await getPin("V1")).trim(); // occupied
    const v2 = (await getPin("V2")).trim(); // gate status

    // LIVE badge
    const badge = document.getElementById("liveBadge");
    badge.textContent = "Online";
    badge.classList.remove("offline");
    badge.classList.add("online");

    // Stats
    document.getElementById("available").textContent = v0;
    document.getElementById("occupied").textContent = v1;

    // Slot box
    const slot = document.getElementById("slotBox");
    const slotText = document.getElementById("slotText");

    if (v0 === "0") {
      slot.textContent = "FULL";
      slot.className = "slot busy";
      slotText.textContent = "No Slots Available";
    } else {
      slot.textContent = "AVAILABLE";
      slot.className = "slot free";
      slotText.textContent = `${v0} Slot Free • Dual IR Detection`;
    }

    // Gate
    const gate = document.getElementById("gateBox");
    const btn = document.querySelector(".mainBtn");

    if (v2.toLowerCase().includes("open")) {
      gate.textContent = "OPEN";
      gate.className = "gate open";
      btn.textContent = "Close Gate";
      gateOpen = true;
    } else {
      gate.textContent = "CLOSED";
      gate.className = "gate closed";
      btn.textContent = "Open Gate";
      gateOpen = false;
    }

  } catch (err) {
    const badge = document.getElementById("liveBadge");
    badge.textContent = "Offline";
    badge.classList.remove("online");
    badge.classList.add("offline");
  }
}

// ---------------- TOGGLE GATE ----------------
async function toggleGate() {
  let value = gateOpen ? 0 : 1;

  const url =
    `https://blynk.cloud/external/api/update?token=${token}&V3=${value}`;

  await fetch(url);

  setTimeout(loadData, 1000);
}

// ---------------- AUTO REFRESH ----------------
loadData();
setInterval(loadData, 3000);
