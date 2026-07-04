
let currentPage = 1;
const totalPages = 5;
function nextPage() {

    if (currentPage < totalPages) {
        document.getElementById(`page${currentPage}`).classList.remove("active");
        currentPage++;
        document.getElementById(`page${currentPage}`).classList.add("active");
    }

    // 🔥 FIX: when entering page 4
    if (currentPage === 4) {
        resetCarousel();
    }

    if (currentPage === 1) {
        startHearts();
    } else {
        stopHearts();
    }
}

function previousPage() {

    if (currentPage > 1) {
        document.getElementById(`page${currentPage}`).classList.remove("active");
        currentPage--;
        document.getElementById(`page${currentPage}`).classList.add("active");
    }

    // 🔥 FIX: when entering page 4
    if (currentPage === 4) {
        resetCarousel();
    }

    if (currentPage === 1) {
        startHearts();
    } else {
        stopHearts();
    }
}

function resetCarousel() {
    photoIndex = 0;

    const image = document.getElementById("carousel-image");
    const caption = document.getElementById("carousel-caption");

    if (image && caption) {
        image.src = photos[0].image;
        caption.innerText = photos[0].caption;

        const dots = document.querySelectorAll(".dot");
        dots.forEach(dot => dot.classList.remove("active-dot"));
        if (dots[0]) dots[0].classList.add("active-dot");
    }
}

const photos = [
    {
        image: "images/ai.jpg",
        caption: "I don’t know why… but this picture just makes me smile."
    },
    {
        image: "images/9.jpg",
        caption: "Cheers to 29 akkooww.. like this you have to celebrate many more"
    },
    {
        image: "images/6.jpg",
        caption: "Laddu Babu:)"
    },
    {
        image: "images/11.jpg",
        caption: "Teesuko 🍫🍫 don't feel:)"
    },
    {
        image: "images/8.jpg",
        caption: "Not every moment needs words… some just feel right."
    },
    {
        image: "images/10.jpg",
        caption: "There is a lot you carry quietly… and still you stand with a smile."
    },
    {
        image: "images/7.jpg",
        caption: "Quiet outside… but there’s so much strength in you."
    },
    {
        image: "images/1.jpg",
        caption: "I think i am looking good ,but i am not sure:))"
    },
    {
        image: "images/4.jpg",
        caption: "Just sitting there… like nothing else matters 😄"
    },
    {
        image: "images/5.jpg",
        caption: "Keep smiling and keep shining like that sunflower 🌻"
    },


];

let photoIndex = 0;

function changePhoto() {

    const image = document.getElementById("carousel-image");
    const caption = document.getElementById("carousel-caption");
    const polaroid = document.querySelector(".polaroid");

    // fade out image + caption
    image.style.opacity = "0";
    image.style.transform = "scale(0.95)";
    caption.style.opacity = "0";
    caption.style.transform = "translateY(10px)";

    setTimeout(() => {

        // next image index
        photoIndex++;
        if (photoIndex >= photos.length) {
            photoIndex = 0;
        }

        // change image
        image.src = photos[photoIndex].image;

        // update dots
        const dots = document.querySelectorAll(".dot");
        dots.forEach(dot => dot.classList.remove("active-dot"));
        dots[photoIndex].classList.add("active-dot");

        //  RANDOM POLAROID ROTATION (MAIN EFFECT)
        let angle = (Math.random() * 6) - 3; // -3deg to +3deg
        polaroid.style.transform = `rotate(${angle}deg)`;

        // fade in image
        image.style.opacity = "1";
        image.style.transform = "scale(1.03)";

        // update caption with animation
        setTimeout(() => {
            caption.innerText = photos[photoIndex].caption;
            caption.style.opacity = "1";
            caption.style.transform = "translateY(0)";
        }, 300);

    }, 400);
}

// auto change
setInterval(changePhoto, 7000);

// initial slight zoom
const firstImage = document.getElementById("carousel-image");

if (firstImage) {
    setTimeout(() => {
        firstImage.style.transform = "scale(1.02)";
    }, 300);
}

document.addEventListener("click", function(e) {

    for(let i = 0; i < 6; i++){   // multiple particles
        let sparkle = document.createElement("div");
        sparkle.style.position = "fixed";
        sparkle.style.width = "10px";
        sparkle.style.height = "10px";
        sparkle.style.background = "#ffd166";
        sparkle.style.borderRadius = "50%";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.left = e.clientX + "px";
        sparkle.style.top = e.clientY + "px";
        document.body.appendChild(sparkle);
        let angle = Math.random() * 2 * Math.PI;
        let distance = 30 + Math.random() * 20;
        let x = Math.cos(angle) * distance;
        let y = Math.sin(angle) * distance;
        let colors = ["#523b05", "#0522a5", "#0fc74c", "#eb02d7"];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.animate([
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
        ], {
            duration: 600,
            easing: "ease-out"
        });
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
});


let startX = 0;
let endX = 0;

const carousel = document.querySelector(".polaroid");

// touch start
carousel.addEventListener("touchstart", function(e) {
    startX = e.touches[0].clientX;
});

// touch end
carousel.addEventListener("touchend", function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {

    let diff = startX - endX;

    // swipe left → next
    if (diff > 50) {
        nextPhoto();
    }

    // swipe right → previous
    else if (diff < -50) {
        prevPhoto();
    }
}

// ❤️ HEART CONTROL SYSTEM
let heartInterval;
let lastLeft = 0;

// Start hearts ONLY on Page 1
function startHearts() {

    const container = document.querySelector("#page1 .hearts-container");
    if (!container) return;

    // clear previous interval
    clearInterval(heartInterval);

    heartInterval = setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");

        // random horizontal position (avoid overlap)
        let left;
        do {
            left = Math.random() * 100;
        } while (Math.abs(left - lastLeft) < 8);
        lastLeft = left;
        heart.style.left = left + "%";

        // random animation speed
        heart.style.animationDuration = (8 + Math.random() * 4) + "s";
        container.appendChild(heart);
        heart.style.opacity = 0.4 + Math.random() * 0.4;
        // remove after animation
        setTimeout(() => {
            heart.remove();
        }, 9000);

    }, 800); // speed of heart creation
}

// Stop hearts when leaving page
function stopHearts() {
    clearInterval(heartInterval);
}

// Start hearts when page loads
window.onload = function () {
    startHearts();
};

