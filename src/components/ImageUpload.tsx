import React from "react";

interface ImageUploadProps {
  onFileUpload: (file: File | null) => void;
  onNext: () => void;
  file: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileUpload, onNext, file }) => (
  <div>
    <h2>Step 1: Upload a Photo</h2>
    <input type="file" accept="image/*" onChange={(e) => onFileUpload(e.target.files?.[0] || null)} />
    <button disabled={!file} onClick={onNext}>
      Next
    </button>
  </div>
);

export default ImageUpload;
