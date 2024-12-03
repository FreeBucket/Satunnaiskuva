const images = ["kuva1.jpg", "kuva2.jpg", "kuva3.jpg"];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

document.querySelector("button").addEventListener("click", () => {
    const imageElement = document.querySelector("img");
    const newImage = getRandomImage();
    imageElement.src = newImage;
});

