let opened = false;
let confettiInterval = null;
let autoScroll = true;
const letterBody = document.querySelector(".letter-body");

const text = `Selamat ulang tahun Keii✨
    Tak terasa waktu kembali membawamu pada satu usia yang baru. 
    Bukan hanya angka yang bertambah, tetapi 
    juga tanggung jawab yang semakin besar,
    pelajaran yang semakin banyak, 
    dan langkah yang semakin jauh dari dirimu yang kemarin.
    
    Hari ini, rayakanlah dirimu, rayakan semua 
    hal yang berhasil kamu lewati, 
    meski tidak semua orang mengetahuinya.
    
    Semoga di usia yang baru,
    hidupmu dipenuhi ketenangan, 
    langkahmu dimudahkan, 
    dan setiap harapan baik 
    yang sedang kamu tunggu 
    perlahan menemukan jalannya.
    
    Selamat bertambah usia, 
    selamat bertumbuh, 
    menjadi versi terbaik dari dirimu.💖`;
// Membuka amplop   
function openLetter() {

    if (opened) return;

    opened = true;

    const env = document.querySelector(".envelope");
    if (env) {
        env.classList.add("open");
        const wrapper = env.parentElement;
        if (wrapper && wrapper.classList.contains('envelope-wrapper')) {
            wrapper.classList.add('open');
        }
    }

    startTyping();

    startConfettiLoop();
    // Try to play music when the envelope is opened.
    // If autoplay is blocked by the browser, the promise will reject
    // and the user can still start playback with the button.
    if (typeof music !== 'undefined') {
        music.play().then(() => {
            const btn = document.querySelector('.music-btn');
            if (btn) btn.textContent = 'Pause music';
        }).catch(() => {
            // autoplay blocked — do nothing, user can click play
        });
    }
}

if (letterBody) {
    letterBody.addEventListener("scroll", () => {
        const distanceFromBottom = letterBody.scrollHeight - letterBody.scrollTop - letterBody.clientHeight;
        autoScroll = distanceFromBottom < 20;
    });
}

// Efek ketik
function startTyping() {

    let i = 0;

    const speed = 35;

    function type() {

        if (i < text.length) {

            document
                .getElementById("typing")
                .innerHTML += text.charAt(i);

            // Auto-scroll to bottom only if the user hasn't scrolled up
            if (letterBody && autoScroll) {
                letterBody.scrollTop = letterBody.scrollHeight;
            }

            i++;

            setTimeout(type, speed);
        }
    }

    type();
}

// Confetti
function launchConfetti() {
    // randomized confetti bursts for continuous effect
    confetti({
        particleCount: Math.floor(60 + Math.random() * 80),
        spread: 100 + Math.random() * 60,
        origin: { x: Math.random(), y: 0.6 - Math.random() * 0.2 }
    });
}

function startConfettiLoop() {
    if (confettiInterval) return;
    // initial burst
    launchConfetti();
    confettiInterval = setInterval(launchConfetti, 1000);
}

function stopConfettiLoop() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
}

// cleanup on page unload
window.addEventListener('beforeunload', function () {
    stopConfettiLoop();
});

// Hati beterbangan
function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "💖";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 3 + 2 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 5000);
}

setInterval(createHeart, 300);

// Musik
const music = document.getElementById("music");
const musicBtn = document.querySelector('.music-btn');
music.volume = 0.5;

function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            musicBtn.textContent = 'Pause music';
        }).catch(() => { });
    } else {
        music.pause();
        musicBtn.textContent = 'Play music';
    }
}

// initialize button label
if (music.paused) musicBtn.textContent = 'Play music';