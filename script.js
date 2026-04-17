const video = document.getElementById('video');
const snapBtn = document.getElementById('snap');
const strip = document.getElementById('photo-strip');
const countdownEl = document.getElementById('countdown');

// Akses Kamera
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    } catch (err) {
        alert("Akses kamera ditolak atau tidak ditemukan.");
    }
}

// Fungsi Mengambil Foto
function takePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Gambar dari video ke canvas (efek mirror)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imgUrl = canvas.toDataURL('image/jpeg');
    const img = document.createElement('img');
    img.src = imgUrl;
    strip.appendChild(img);
}

// Prosedur 4 Kali Foto dengan Delay
snapBtn.addEventListener('click', async () => {
    strip.innerHTML = ""; // Reset strip
    snapBtn.disabled = true;
    
    for (let i = 0; i < 4; i++) {
        let count = 3;
        // Countdown 3 detik
        while (count > 0) {
            countdownEl.innerText = count;
            await new Promise(r => setTimeout(r, 1000));
            count--;
        }
        countdownEl.innerText = "SMILE! 📸";
        takePhoto();
        await new Promise(r => setTimeout(r, 500));
        countdownEl.innerText = "";
    }
    
    snapBtn.disabled = false;
    alert("Selesai! Foto kamu sudah jadi.");
});

setupCamera();
