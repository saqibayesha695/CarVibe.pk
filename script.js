// Firebase Config (replace storageBucket with .appspot.com)
const firebaseConfig = {
   apiKey: "AIzaSyD-LmmD7M9GM2PgZi-_2K_N0SaapHAaVgw",
   authDomain: "cardealerproject-80a33.firebaseapp.com",
   projectId: "cardealerproject-80a33",
   storageBucket: "cardealerproject-80a33.appspot.com", // fixed
   messagingSenderId: "748864580133",
   appId: "1:748864580133:web:87bb0b0a1966be68396dcc",
   measurementId: "G-DVVHSC0V8V"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const carsContainer = document.getElementById("carsContainer");

if(carsContainer){
  db.collection("cars").where("status", "==", "Available")
    .onSnapshot(snapshot => {
      let html = "";

      snapshot.forEach(doc => {
        const car = doc.data();

        // Build image carousel
        let imagesHTML = '';
        if(car.images && car.images.length > 0){
          car.images.forEach((img, index) => {
            imagesHTML += `<img src="${img}" alt="${car.title}" class="car-img" style="display:${index===0?'block':'none'}">`;
          });

          // Navigation arrows
          imagesHTML = `
            <div class="car-carousel">
              ${imagesHTML}
              ${car.images.length > 1 ? `
              <button class="prev">&#10094;</button>
              <button class="next">&#10095;</button>
              ` : ''}
            </div>
          `;
        } else {
          imagesHTML = `<img src="placeholder.jpg" alt="${car.title}" class="car-img">`;
        }

        html += `
          <div class="car-card">
            ${imagesHTML}
            <h3>${car.title}</h3>
            <p><strong>Brand:</strong> ${car.brand}</p>
            <p><strong>Year:</strong> ${car.year} | <strong>Mileage:</strong> ${car.mileage}</p>
            <p><strong>Fuel:</strong> ${car.fuel} | <strong>Transmission:</strong> ${car.transmission}</p>
            <p><strong>City:</strong> ${car.city}</p>
            <p>${car.description}</p>
            <a href="https://wa.me/923001234567?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(car.title)}" target="_blank" class="btn whatsapp-btn">
              Buy This Car
            </a>
          </div>
        `;
      });

      carsContainer.innerHTML = html;

      // Carousel functionality
      document.querySelectorAll('.car-carousel').forEach(carousel => {
        const imgs = carousel.querySelectorAll('.car-img');
        let current = 0;

        const showImage = (index) => {
          imgs.forEach((img, i) => img.style.display = i===index ? 'block' : 'none');
        };

        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        if(prevBtn) prevBtn.addEventListener('click', () => {
          current = (current - 1 + imgs.length) % imgs.length;
          showImage(current);
        });
        if(nextBtn) nextBtn.addEventListener('click', () => {
          current = (current + 1) % imgs.length;
          showImage(current);
        });
      });

    });
}
