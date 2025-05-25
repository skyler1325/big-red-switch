navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256; // Set FFT size for analysis
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const meter = document.getElementById("micMeter");

    function updateMeter() {
        analyser.getByteFrequencyData(dataArray);
        let maxAmplitude = Math.max(...dataArray);
        let meterWidth = (maxAmplitude / 256) * 100; // Normalize to percentage
        meter.style.width = `${meterWidth}%`;

        requestAnimationFrame(updateMeter);
    }

    updateMeter();
}).catch((error) => {
    console.error("Microphone access error:", error);
});
