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
    const infoElement = document.querySelector("#info"); // Tämä on uusi elementti metatiedoille

    // Valitaan satunnainen kuva ja kuvateksti
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    const randomCaptionIndex = Math.floor(Math.random() * captions.length);
    const newCaption = captions[randomCaptionIndex];

    // Animaatiot: fade-out, kuvan vaihto ja fade-in
    imageElement.classList.add("fade-out");
    captionElement.classList.add("fade-out");
    infoElement.classList.add("fade-out");

    setTimeout(() => {
        // Päivitetään kuva ja kuvateksti
        imageElement.src = selectedImage.imageURL;
        captionElement.textContent = newCaption;

        // Päivitetään myös kuvaan liittyvät tiedot
        infoElement.innerHTML = `
            <p><strong>Valokuvaaja:</strong> ${selectedImage.user}</p>
            <p><strong>Katselut:</strong> ${selectedImage.views}</p>
            <p><strong>Lataukset:</strong> ${selectedImage.downloads}</p>
            <p><strong>Tykkäykset:</strong> ${selectedImage.likes}</p>
            <p><strong>Avainsanat:</strong> ${selectedImage.tags}</p>
            <p><strong>Koko:</strong> ${selectedImage.width} x ${selectedImage.height} px</p>
        `;

        imageElement.classList.remove("fade-out");
        captionElement.classList.remove("fade-out");
        infoElement.classList.remove("fade-out");
        imageElement.classList.add("fade-in");
        captionElement.classList.add("fade-in");
        infoElement.classList.add("fade-in");
    }, 500); // Aika fade-outille
}

// Käynnistys ja tapahtuman käsittely
async function init() {
    const images = await fetchImages();
    if (images.length > 0) {
        updateImageAndCaption(images); // Näytetään kuva ja kuvateksti sivun latauksen yhteydessä
        document.querySelector("button").addEventListener("click", () => {
            updateImageAndCaption(images);
        });
    } else {
        console.error("Kuvia ei voitu hakea. Tarkista API-avain ja internet-yhteys.");
    }
}

async function fetchImages() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
            return data.hits.map(hit => ({
                imageURL: hit.webformatURL,
                user: hit.user,
                views: hit.views,
                downloads: hit.downloads,
                likes: hit.likes,
                tags: hit.tags,
                width: hit.imageWidth,
                height: hit.imageHeight
            }));
        } else {
            console.error("Ei kuvia saatavilla API:sta.");
            return [];
        }
    } catch (error) {
        console.error("Virhe API-haussa:", error);
        return [];
    }
}

window.onload = init();
