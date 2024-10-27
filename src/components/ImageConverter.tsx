import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";

interface ImageConverterProps {}

const ImageConverter: React.FC<ImageConverterProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("jpeg");
  const [crop, setCrop] = useState<Crop>({ aspect: 1 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resizedWidth, setResizedWidth] = useState<number>(500);
  const [resizedHeight, setResizedHeight] = useState<number>(500);
  const [isBlur, setIsBlur] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile || null);
    setImageUrl(uploadedFile ? URL.createObjectURL(uploadedFile) : null);
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => setFormat(event.target.value);

  const handleCropChange = (newCrop: Crop) => setCrop(newCrop);

  const handleResize = (width: number, height: number) => {
    setResizedWidth(width);
    setResizedHeight(height);
  };

  const handleBlurToggle = () => setIsBlur(!isBlur);

  const convertImage = async () => {
    if (!file) return;

    const options = { maxWidthOrHeight: resizedWidth, fileType: `image/${format}` };
    const compressedFile = await imageCompression(file, options);
    const convertedBlob = new Blob([compressedFile], { type: `image/${format}` });

    saveAs(convertedBlob, `converted-image.${format}`);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      <div>
        <label>Format:</label>
        <select value={format} onChange={handleFormatChange}>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>

      <div>
        <label>Resize:</label>
        <input
          type="number"
          value={resizedWidth}
          onChange={(e) => handleResize(Number(e.target.value), resizedHeight)}
          placeholder="Width"
        />
        <input
          type="number"
          value={resizedHeight}
          onChange={(e) => handleResize(resizedWidth, Number(e.target.value))}
          placeholder="Height"
        />
      </div>

      <ReactCrop src={imageUrl || ""} crop={crop} onChange={handleCropChange} />

      <Stage width={resizedWidth} height={resizedHeight}>
        <Layer>
          <Image image={file} width={resizedWidth} height={resizedHeight} />
          {isBlur && <Rect fill="rgba(0,0,0,0.3)" width={100} height={100} />}
        </Layer>
      </Stage>

      <button onClick={handleBlurToggle}>
        {isBlur ? "Remove Blur" : "Add Blur"}
      </button>
      <button onClick={convertImage}>Convert and Download</button>
    </div>
  );
};

export default ImageConverter;
