// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0z-Z63u_jHXe7RZO80MLGN_kLIUd6BDK",
  authDomain: "rutinan-semaan-tahfidz-rh.firebaseapp.com",
  projectId: "rutinan-semaan-tahfidz-rh",
  storageBucket: "rutinan-semaan-tahfidz-rh.firebasestorage.app",
  messagingSenderId: "60415685704",
  appId: "1:60415685704:web:233cb0824f96b6a91dd47d"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi kirim data ke Firestore
export async function kirimSemaan(data) {
  try {
    await addDoc(collection(db, "dailyReports"), data);
    alert("Alhamdulillah, laporan berhasil dikirim.");
  } catch (e) {
    console.error(e);
    alert("Gagal mengirim laporan.");
  }
}