// # FUNZIONI

// Funzione per creare le immagini
const createImages = destination => {
  const { name, description, image } = destination;

  const img = `<img src="img/${image}" alt="${name}" />`;
  images += img;

  galleryElements += `
  <figure>
    <figcaption>
      <h2>${name}</h2>
      <h3>${description}</h3>
    </figcaption>
    ${img}
  </figure>
  `;
}

// Funzione per cambiare immagine
const changeActivePic = target => {
  //  Rimuovo la classe active dall'immagine attuale e dal thumbnail attuale
  galleryFigures[currentActiveIndex].classList.remove('active');
  thumbnails[currentActiveIndex].classList.remove('active');


  switch (target) {
    case 'next':
      currentActiveIndex++;
      if (currentActiveIndex === galleryFigures.length) currentActiveIndex = 0;
      break;
    case 'prev':
      currentActiveIndex--;
      if (currentActiveIndex < 0) currentActiveIndex = galleryFigures.length - 1;
      break;
    default:
      currentActiveIndex = target;
  }

  // Aggiungo active alla nuova immagine attiva
  galleryFigures[currentActiveIndex].classList.add('active');
  thumbnails[currentActiveIndex].classList.add('active');
}

// Funzione per far partire l'autoplay
const startAutoplay = () => {
  isPlaying = true;
  autoplayButton.innerText = 'STOP AUTOPLAY';
  autoplay = setInterval(() => {
    changeActivePic('next')
  }, 3000);
}

// Funzione per far stoppare l'autoplay
const stopAutoplay = () => {
  isPlaying = false;
  clearInterval(autoplay);
  autoplayButton.innerText = 'RESUME AUTOPLAY';
}


// #----------------------------------- RECUPERO ELEMENTI IN PAGINA
// Recupero la galleria principale
const mainGallery = document.querySelector('#carousel .gallery');
// Recupero la galleria dei thumbnails
const thumbnailsGallery = document.getElementById('thumbnails');

// Recupero i bottoni prev e next
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Recupero il bottone dell'autoplay
const autoplayButton = document.getElementById('autoplay-button');

// # -------------------------- GENERIAMO DINAMICAMENTE LE IMMIAGINI

// Genero le figures
let galleryElements = '';
let images = '';


// Genero le immagini
destinations.forEach(createImages);

// Inserisco le figures nella gallery
mainGallery.innerHTML = galleryElements;

// Inserisco le images nei thumbnails
thumbnailsGallery.innerHTML = images;



// # --------------------- PARTENZA (mettiamo le classi active di partena)

// Recupero tutte le immagini dalla galleria e dei thumbnails
const galleryFigures = document.querySelectorAll('#carousel figure');
const thumbnails = document.querySelectorAll('#thumbnails img');

// Imposto una variabile per "tenere d'occhio" qual è l'immagine attiva
let currentActiveIndex = 0;

// Metto la classe active alla prima immagine e al primo thumbnail
galleryFigures[currentActiveIndex].classList.add('active');
thumbnails[currentActiveIndex].classList.add('active');

// # AUTOPLAY
// Implementiamo l'autoplay
let autoplay;
let isPlaying;
startAutoplay();



// # --------------------- EVENTI DINAMICI
// Reagisco al click sul prev
prevButton.addEventListener('click', () => {
  stopAutoplay();
  changeActivePic('prev');

});

// Reagisco al click sul next
nextButton.addEventListener('click', () => {
  stopAutoplay();
  changeActivePic('next');
})

// Reagisco al click sui thumbnails
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    stopAutoplay();
    changeActivePic(i);

  })
});

// Reagisco al click sull'autoplay
autoplayButton.addEventListener('click', () => {
  // Inverto il booleano
  isPlaying = !isPlaying;
  isPlaying ? startAutoplay() : stopAutoplay();
})