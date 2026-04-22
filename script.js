
# script.js

```js
let available=1,gateOpen=false;
const hour=new Date().getHours();
document.getElementById('greeting').textContent=(hour<12?'Good Morning':'Good Evening')+' Driver 👋';
function render(){document.getElementById('slots').textContent=available;document.getElementById('gate').textContent=gateOpen?'Open':'Closed';document.getElementById('occ').textContent=(2-available)+' / 2';const a1=document.getElementById('a1');a1.textContent=available>0?'A1 Available':'A1 Occupied';a1.className='slot '+(available>0?'free':'busy');}
function toggleGate(){gateOpen=!gateOpen;render();}
function simulate(){available=available===1?0:1;render();}
render();
```
