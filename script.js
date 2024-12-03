// Pixabay API:n tiedot
const API_KEY = "47428494-7b3b5210e0bced2a50ebc2ae0"; // Korvaa omalla API-avaimellasi
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&per_page=10`;

// Kuvatekstit
const captions = [
    "Luonnon kauneutta.",
    "Vihreää ja vehreää.",
    "Metsän rauha.",
    "Taianomainen maisema.",
    "Luonto inspiroi."
];

// Haetaan kuvia Pixabay-API:sta
async function fetchImages() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
            return data.hits.map(hit => hit.webformatURL);
        } else {
            console.error("Ei kuvia saatavilla API:sta.");
            return [];
        }
    } catch (error) {
        console.error("Virhe API-haussa:", error);
        return [];
    }
}

// Päivitä kuva ja kuvateksti
function updateImageAndCaption(images) {
    const imageElement = document.querySelector("img");
    const captionElement = document.querySelector("#caption");

    // Valitaan satunnainen kuva ja kuvateksti
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomCaptionIndex = Math.floor(Math.random() * captions.length);
    const newImage = images[randomIndex];
    const newCaption = captions[randomCaptionIndex];

    // Animaatiot: fade-out, kuvan vaihto ja fade-in
    imageElement.classList.add("fade-out");
    captionElement.classList.add("fade-out");

    setTimeout(() => {
        imageElement.src = newImage;
        captionElement.textContent = newCaption;

        imageElement.classList.remove("fade-out");
        captionElement.classList.remove("fade-out");
        imageElement.classList.add("fade-in");
        captionElement.classList.add("fade-in");
    }, 500); // Aika fade-outille
}

// Käynnistys ja tapahtuman käsittely
async function init() {
    const images = await fetchImages();

    if (images.length > 0) {
        document.querySelector("button").addEventListener("click", () => {
            updateImageAndCaption(images);
        });
    } else {
        console.error("Kuvia ei voitu hakea. Tarkista API-avain ja internet-yhteys.");
    }
}

init();
