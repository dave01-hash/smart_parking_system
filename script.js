let available = 1;
let gateOpen = false;

function render() {
  document.getElementById("slots").textContent = available;
  document.getElementById("gate").textContent = gateOpen ? "Open" : "Closed";
}

function toggleGate() {
  gateOpen = !gateOpen;
  render();
}

render();
