import { kirimSemaan, pantauSemaan } from "./firebase.js";
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

function getJuzHariIni(){

  const awal = new Date("2026-10-01T00:00:00");
  const sekarang = new Date();

  awal.setHours(0,0,0,0);
  sekarang.setHours(0,0,0,0);

  const selisihHari = Math.floor(
    (sekarang - awal) / (1000 * 60 * 60 * 24)
  );

  const siklus = selisihHari % 30;

  if(siklus <= 6){
    return siklus + 24;
  }

  return siklus - 6;
}
function getMateriHariIni(){
  function tampilkanHAriIni(){
    const sekarang = new Date();

    const tanggal =
      sekarang.toLocaleDatteString("id-ID", {
        weekday: "long",
        day: "numeric" ,
        month: "long",
        year: "numeric"
      });
    document.getElementById("tanggalHariIni"
                           ).innerText = tanggal;

    document.getElementById("juzHariIni").innerText = 
      getMateriHariIni();
  }

  const juz = getJuzHariIni();     
  

  if(juz === 30){
    return "Juz 30 + Do'a";
  }

  return "Juz " + juz;
}

function mulaiPantauSemaan(){

  const sekarang = new Date();

  const tanggal = sekarang.toISOString().split("T")[0];

  pantauSemaan(tanggal, (data) => {

    Object.keys(data).forEach(nama => {

      if(members.hasOwnProperty(nama)){
        members[nama] = data[nama];
      }

    });

    renderStatus();

  });

}

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
  tampilkanHAriIni();

mulaiPantauSemaan();
  
 show("dashboard");

}

function logout(){

 document.getElementById("pin").value="";

 show("login");

}

async function setStatus(status){

  const sekarang = new Date();

  const tanggal = sekarang.toISOString().split("T")[0];

  const juz = getJuzHariIni();
  
  

  members[currentUser]=status;

await kirimSemaan({
  nama: currentUser,
  status: status,
  juz: juz,
  materi: getMateriHariIni(),
  tanggal: tanggal,
  createdAt: new Date()
});
  
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

window.show = show;
window.openLogin = openLogin;
window.login = login;
window.logout = logout;
window.setStatus = setStatus;