let available=1, gateOpen=false;

function updateGreeting(){
  const hour=new Date().getHours();
  const greet=hour<12?'Good Morning':(hour<18?'Good Afternoon':'Good Evening');
  document.getElementById('greeting').textContent=greet+' Driver 👋';
}

function render(){
  document.getElementById('slots').textContent=available;
  document.getElementById('gate').textContent=gateOpen?'Open':'Closed';
  document.getElementById('occ').textContent=(2-available)+' / 2';

  const a1=document.getElementById('a1');
  a1.textContent=available>0?'A1 Available':'A1 Occupied';
  a1.className='slot '+(available>0?'free':'busy');
}

function toggleGate(){
  gateOpen=!gateOpen;
  render();
}

function simulate(){
  available=available===1?0:1;
  render();
}

updateGreeting();
render();
