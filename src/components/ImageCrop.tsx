import React from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropProps {
  imageUrl: string | null;
  crop: Crop;
  onCropChange: (crop: Crop) => void;
  onNext: () => void;
  onBack: () => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({ imageUrl, crop, onCropChange, onNext, onBack }) => (
  <div>
    <h2>Step 3: Crop the Photo (Optional)</h2>
    {imageUrl && (
      <ReactCrop crop={crop} onChange={onCropChange} aspect={1}>
        <img src={imageUrl} alt="To be cropped" />
      </ReactCrop>
    )}
    <button onClick={onNext}>Next</button>
    <button onClick={onBack}>Back</button>
  </div>
);

export default ImageCrop;
