// script.js

const AUTH_TOKEN = "DEIBJaDx8vV6JY2byaeWadasWkoOfD94";

const GET_URL = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}`;
const UPDATE_URL = `https://blynk.cloud/external/api/update?token=${AUTH_TOKEN}`;

const slotStatus = document.getElementById("slotStatus");
const gateStatus = document.getElementById("gateStatus");
const availableCount = document.getElementById("availableCount");
const occupiedCount = document.getElementById("occupiedCount");
const gateBtn = document.getElementById("gateBtn");

// Fetch Live Data
async function loadData(){

    try{

        const available = await fetch(`${GET_URL}&V0`).then(r=>r.text());
        const occupied = await fetch(`${GET_URL}&V1`).then(r=>r.text());
        const gate = await fetch(`${GET_URL}&V2`).then(r=>r.text());

        // Slot
        if(occupied === "1"){
            slotStatus.innerText = "OCCUPIED";
            slotStatus.className = "badge red";
        }else{
            slotStatus.innerText = "AVAILABLE";
            slotStatus.className = "badge green";
        }

        // Stats
        availableCount.innerText = available;
        occupiedCount.innerText = occupied;

        // Gate
        if(gate.includes("OPEN")){
            gateStatus.innerText = "OPEN";
            gateStatus.className = "badge blue";
        }else{
            gateStatus.innerText = "CLOSED";
            gateStatus.className = "badge red";
        }

    }catch(err){
        console.log("Blynk Error");
    }

}

// Manual Gate Open
gateBtn.addEventListener("click", async ()=>{

    gateBtn.innerText = "Opening...";

    await fetch(`${UPDATE_URL}&V3=1`);

    setTimeout(async ()=>{

        await fetch(`${UPDATE_URL}&V3=0`);
        gateBtn.innerText = "Open Gate";

    },1500);

});

loadData();
setInterval(loadData,2000);
