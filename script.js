import { kirimSemaan } from "./firebase.js";
const members = {
  "Ning Ilmiah":"pending",
  "Afifatul H.":"pending",
  "Amirotul M.":"pending",
  "Nur Maimanah":"pending",
  "Millatul I.":"pending",
  "Ana Mustafidah":"pending",
  "Arinirrahmah":"pending",
  "Fitri Ayu Ningsih":"pending",
  "Shafira Chairani":"pending"
};

let currentUser="";

function show(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

function openLogin(){
 show("login");
}

function login(){

 const pin=document.getElementById("pin").value;

 if(pin!=="1234"){
  alert("PIN demo: 1234");
  return;
 }

 currentUser=document.getElementById("member").value;

 document.getElementById("namaUser").innerText=currentUser;

 renderStatus();

 show("dashboard");

}

function logout(){

 document.getElementById("pin").value="";

 show("login");

}

function setStatus(status){
  kirimSemaan({
  nama: currentUser,
  status: status,
  juz: 17,
  tanggal: "2026-09-29",
  createdAt: new Date()
});

 members[currentUser]=status;

 renderStatus();

}

function renderStatus(){

 const list=document.getElementById("memberList");

 if(!list) return;

 list.innerHTML="";

 let selesai=0;

 Object.keys(members).forEach(nama=>{

  const s=members[nama];

  let emoji="⏳";

  let text="Belum";

  if(s==="done"){emoji="💞";text="Selesai";selesai++;}
  if(s==="sick"){emoji="💔";text="Sakit";}
  if(s==="haid"){emoji="⛔";text="Haid";}

  list.innerHTML += `
  <div class="row">
    <span>${emoji} ${nama}</span>
    <span>${text}</span>
  </div>
  `;

 });

 document.getElementById("progressText").innerText=`${selesai}/9 selesai`;

 document.getElementById("progressBar").style.width=`${selesai/9*100}%`;

}
