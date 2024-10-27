import React, { useState } from "react";
import { Crop } from "react-image-crop";  // Add this import
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import ImageUpload from "./ImageUpload";
import ImageResize from "./ImageResize";
import ImageCrop from "./ImageCrop";
import ImageBlur from "./ImageBlur";
import ImageFormat from "./ImageFormat";


const ImageConverter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50, x: 0, y: 0 });
  const [resizedWidth, setResizedWidth] = useState<number>(500);
  const [resizedHeight, setResizedHeight] = useState<number>(500);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [isBlur, setIsBlur] = useState<boolean>(false);
  const [format, setFormat] = useState<string>("jpeg");

  const handleFileUpload = (file: File | null) => {
    setFile(file);
    setImageUrl(file ? URL.createObjectURL(file) : null);
  };

  const convertImage = async () => {
    if (!file) return;
    const options = { maxWidthOrHeight: resizedWidth, fileType: `image/${format}` };
    const compressedFile = await imageCompression(file, options);
    const convertedBlob = new Blob([compressedFile], { type: `image/${format}` });
    saveAs(convertedBlob, `converted-image.${format}`);
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <div>
      {currentStep === 1 && <ImageUpload onFileUpload={handleFileUpload} file={file} onNext={nextStep} />}
      {currentStep === 2 && (
        <ImageResize
          width={resizedWidth}
          height={resizedHeight}
          maintainAspectRatio={maintainAspectRatio}
          onResize={(width, height) => {
            setResizedWidth(width);
            setResizedHeight(height);
          }}
          onToggleAspectRatio={() => setMaintainAspectRatio(!maintainAspectRatio)}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && <ImageCrop imageUrl={imageUrl} crop={crop} onCropChange={setCrop} onNext={nextStep} onBack={prevStep} />}
      {currentStep === 4 && <ImageBlur imageUrl={imageUrl} width={resizedWidth} height={resizedHeight} isBlur={isBlur} onToggleBlur={() => setIsBlur(!isBlur)} onNext={nextStep} onBack={prevStep} />}
      {currentStep === 5 && <ImageFormat format={format} onFormatChange={setFormat} onConvert={convertImage} onBack={prevStep} />}
    </div>
  );
};

export default ImageConverter;
