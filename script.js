

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show'); // toggle links on mobile
});

// Firebase Config
const firebaseConfig = {
   apiKey: "AIzaSyD-LmmD7M9GM2PgZi-_2K_N0SaapHAaVgw",
   authDomain: "cardealerproject-80a33.firebaseapp.com",
   projectId: "cardealerproject-80a33",
   storageBucket: "cardealerproject-80a33.appspot.com",
   messagingSenderId: "748864580133",
   appId: "1:748864580133:web:87bb0b0a1966be68396dcc",
   measurementId: "G-DVVHSC0V8V"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load Cars
const carsContainer = document.getElementById("carsContainer");
if(carsContainer){
  db.collection("cars").where("status","==","Available")
    .onSnapshot(snapshot => {
      let html = "";
      snapshot.forEach(doc=>{
        const car = doc.data();
        let imagesHTML = '';
        if(car.images && car.images.length>0){
          car.images.forEach((img,index)=>{
            imagesHTML += `<img src="${img}" alt="${car.title}" class="car-img" style="display:${index===0?'block':'none'}">`;
          });
          imagesHTML = `<div class="car-carousel">${imagesHTML}
            ${car.images.length>1?`<button class="prev">&#10094;</button><button class="next">&#10095;</button>`:''}
          </div>`;
        } else imagesHTML = `<img src="placeholder.jpg" alt="${car.title}" class="car-img">`;

        html += `<div class="car-card">${imagesHTML}
          <h3>${car.title}</h3>
          <p><strong>Brand:</strong> ${car.brand}</p>
          <p><strong>Year:</strong> ${car.year} | <strong>Mileage:</strong> ${car.mileage}</p>
          <p><strong>Fuel:</strong> ${car.fuel} | <strong>Transmission:</strong> ${car.transmission}</p>
          <p><strong>City:</strong> ${car.city}</p>
          <p>${car.description}</p>
          <a href="https://wa.me/923001234567?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(car.title)}" target="_blank" class="btn whatsapp-btn">Buy This Car</a>
        </div>`;
      });
      carsContainer.innerHTML = html;

      // Carousel
      document.querySelectorAll('.car-carousel').forEach(carousel=>{
        const imgs = carousel.querySelectorAll('.car-img');
        let current=0;
        const show=(i)=>imgs.forEach((img,j)=>img.style.display=(i===j?'block':'none'));
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        if(prev) prev.addEventListener('click',()=>{ current=(current-1+imgs.length)%imgs.length; show(current); });
        if(next) next.addEventListener('click',()=>{ current=(current+1)%imgs.length; show(current); });
      });
    });
}

// Lightbox
let currentImages=[],currentIndex=0;
document.addEventListener('click', e=>{
  if(e.target.classList.contains('car-img')){
    currentImages=Array.from(e.target.closest('.car-card').querySelectorAll('.car-img')).map(i=>i.src);
    currentIndex=currentImages.indexOf(e.target.src);
    const lb=document.getElementById('lightbox');
    const lbImg=document.getElementById('lightbox-img');
    lb.style.display='flex';
    lbImg.src=currentImages[currentIndex];
  }
});
document.getElementById('close-lightbox').addEventListener('click',()=>{document.getElementById('lightbox').style.display='none';});
document.getElementById('next-img').addEventListener('click',()=>{if(!currentImages.length) return; currentIndex=(currentIndex+1)%currentImages.length; document.getElementById('lightbox-img').src=currentImages[currentIndex];});
document.getElementById('prev-img').addEventListener('click',()=>{if(!currentImages.length) return; currentIndex=(currentIndex-1+currentImages.length)%currentImages.length; document.getElementById('lightbox-img').src=currentImages[currentIndex];});

// Admin Password
function openAdmin(){
  const password = prompt("Enter Admin Password:");
  if(password==="Ayesha123") window.location.href="admin.html";
  else if(password!==null) alert("Wrong Password!");
}



