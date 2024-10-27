import React from "react";

interface ImageFormatProps {
  format: string;
  onFormatChange: (format: string) => void;
  onConvert: () => void;
  onBack: () => void;
}

const ImageFormat: React.FC<ImageFormatProps> = ({ format, onFormatChange, onConvert, onBack }) => (
  <div>
    <h2>Step 5: Choose File Format</h2>
    <label>
      Format:
      <select value={format} onChange={(e) => onFormatChange(e.target.value)}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>
    </label>
    <button onClick={onConvert}>Convert and Download</button>
    <button onClick={onBack}>Back</button>
  </div>
);

export default ImageFormat;
