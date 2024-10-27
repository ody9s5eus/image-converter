import React from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";

interface ImageBlurProps {
  imageUrl: string | null;
  width: number;
  height: number;
  isBlur: boolean;
  onToggleBlur: () => void;
  onNext: () => void;
  onBack: () => void;
}

const ImageBlur: React.FC<ImageBlurProps> = ({ imageUrl, width, height, isBlur, onToggleBlur, onNext, onBack }) => {
  const [loadedImage] = useImage(imageUrl || "");

  return (
    <div>
      <h2>Step 4: Blur or Distort a Part of the Photo (Optional)</h2>
      <Stage width={width} height={height}>
        <Layer>
          {loadedImage && <Image image={loadedImage} width={width} height={height} />}
          {isBlur && <Rect fill="rgba(0,0,0,0.3)" width={100} height={100} />}
        </Layer>
      </Stage>
      <button onClick={onToggleBlur}>{isBlur ? "Remove Blur" : "Add Blur"}</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ImageBlur;
