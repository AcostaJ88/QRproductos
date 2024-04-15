const video = document.getElementById('video');
const qrData = document.querySelector('#qr-data tbody');

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(tick);
    })
    .catch(function (err) {
        console.log('Error: ' + err);
    });

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvasElement = document.createElement('canvas');
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        const canvas = canvasElement.getContext('2d');
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
            qrData.innerHTML += `<tr><td>${code.data}</td></tr>`;
        }
    }
    requestAnimationFrame(tick);
}
