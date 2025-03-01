import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css"; // Import CSS

function CustomGradientQR() {
  const [text, setText] = useState("");
  const [startColor, setStartColor] = useState("#8a2be2"); // Purple
  const [midColor, setMidColor] = useState("#ff007f"); // Pink
  const [endColor, setEndColor] = useState("#ff4500"); // Orange
  const canvasRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (text) {
      applyGradientQR();
    }
  }, [text, startColor, midColor, endColor]); // Update when color changes

  const applyGradientQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const size = 300;

    ctx.clearRect(0, 0, size, size); // Clear previous QR

    // Custom Instagram-like Gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, startColor);  // Purple
    gradient.addColorStop(0.5, midColor);  // Pink
    gradient.addColorStop(1, endColor);  // Orange

    // Draw Background with Rounded Corners
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.arcTo(size, 0, size, size, 40);
    ctx.arcTo(size, size, 0, size, 40);
    ctx.arcTo(0, size, 0, 0, 40);
    ctx.arcTo(0, 0, size, 0, 40);
    ctx.closePath();
    ctx.fill();

    // Draw the QR Code
    const qrCanvas = qrRef.current.querySelector("canvas");
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, 50, 50, 200, 200);
    }
  };

  const generateQR = () => {
    if (!text.trim()) {
      alert("Please enter text!");
      return;
    }
    setTimeout(applyGradientQR, 500);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "custom_qr.png";
    link.click();
  };

  return (
    <div className="container">
      <h2>Gradient QR Code</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter URL or Username"
        className="input-box"
      />
      
      {/* Color Pickers */}
      <div className="color-pickers">
        <label>Start Color:</label>
        <input type="color" value={startColor} onChange={(e) => setStartColor(e.target.value)} />
        
        <label>Middle Color:</label>
        <input type="color" value={midColor} onChange={(e) => setMidColor(e.target.value)} />

        <label>End Color:</label>
        <input type="color" value={endColor} onChange={(e) => setEndColor(e.target.value)} />
      </div>

      <button onClick={generateQR} className="generate-btn">Generate QR</button>

      {/* Hidden QR Code */}
      {text && (
        <div ref={qrRef} style={{ display: "none" }}>
          <QRCodeCanvas value={text} size={300} bgColor="transparent" />
        </div>
      )}

      {/* Custom Gradient QR Code */}
      {text && <canvas ref={canvasRef} width="300" height="300"></canvas>}

      {text && (
        <button onClick={downloadQR} className="download-btn">Download QR</button>
      )}
    </div>
  );
}

export default CustomGradientQR;