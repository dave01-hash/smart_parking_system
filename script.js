// script.js

/**************************************************
 SMART PARKING SYSTEM - LIVE BLYNK WEB DASHBOARD
**************************************************/

const AUTH_TOKEN = "DEIBJaDx8vV6JY2byaeWadasWkoOfD94";

const GET_URL = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}`;
const UPDATE_URL = `https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}`;

// HTML Elements
const slotStatus     = document.getElementById("slotStatus");
const gateStatus     = document.getElementById("gateStatus");
const availableCount = document.getElementById("availableCount");
const occupiedCount  = document.getElementById("occupiedCount");
const gateBtn        = document.getElementById("gateBtn");

// --------------------------------
// Fetch Live Data from Blynk
// --------------------------------
async function fetchParkingData(){

    try{

        const available = await fetch(`${GET_URL}&V0`).then(r => r.text());
        const occupied  = await fetch(`${GET_URL}&V1`).then(r => r.text());
        const gate      = await fetch(`${GET_URL}&V2`).then(r => r.text());

        // Slot Status
        if(occupied === "1"){
            slotStatus.innerText = "OCCUPIED";
            slotStatus.className = "status occupied";
        }else{
            slotStatus.innerText = "AVAILABLE";
            slotStatus.className = "status available";
        }

        // Statistics
        availableCount.innerText = available;
        occupiedCount.innerText = occupied;

        // Gate Status
        if(gate.includes("OPEN")){
            gateStatus.innerText = "OPEN";
            gateStatus.className = "gate open";
        }else{
            gateStatus.innerText = "CLOSED";
            gateStatus.className = "gate closed";
        }

    }catch(error){
        console.log("Connection Error");
    }
}

// --------------------------------
// Manual Gate Button (V3)
// --------------------------------
gateBtn.addEventListener("click", async ()=>{

    gateBtn.innerText = "Opening...";

    await fetch(`${UPDATE_URL}&V3=1`);

    setTimeout(async ()=>{
        await fetch(`${UPDATE_URL}&V3=0`);
        gateBtn.innerText = "Open Gate";
    },1500);

});

// Initial Load
fetchParkingData();

// Refresh every 2 sec
setInterval(fetchParkingData,2000);
