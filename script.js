const socket = new WebSocket("ws://localhost:8080");

// Function to send AQI value to the server
function sendAQIToServer(aqiValue) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(aqiValue.toString());
        console.log("Sent AQI:", aqiValue);
    } else {
        console.log("WebSocket not ready");
    }
}

function updateAQI() {
    const aqiRegressionValue = Math.floor(Math.random() * 300);
    const aqiGenerationValue = 98+(Math.random()*1);
    const maxAQI = aqiRegressionValue;

    document.getElementById("aqi-regression").textContent = aqiRegressionValue;
    document.getElementById("aqi-generation").textContent = aqiGenerationValue;
    document.getElementById("aqi-value").textContent = maxAQI;

    const gaugeArc = document.getElementById("gauge-arc");
    const maxArc = 251.2;
    gaugeArc.style.strokeDashoffset = maxArc - (maxAQI / 300) * maxArc;

    let color = "#00E400", status = "Good";
    if (maxAQI > 50) { color = "#FFFF00"; status = "Moderate"; }
    if (maxAQI > 100) { color = "#FF7E00"; status = "Unhealthy for Sensitive Groups"; }
    if (maxAQI > 150) { color = "#FF0000"; status = "Unhealthy"; }
    
    gaugeArc.style.stroke = color;
    document.getElementById("aqi-status").textContent = status;
    document.getElementById("aqi-status").style.color = color;

    // Send AQI value to server
    sendAQIToServer(maxAQI);
}

setInterval(updateAQI, 5000);
updateAQI();
