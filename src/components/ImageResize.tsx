import React from "react";

interface ImageResizeProps {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  onResize: (width: number, height: number) => void;
  onToggleAspectRatio: () => void;
  onNext: () => void;
  onBack: () => void;
}

const ImageResize: React.FC<ImageResizeProps> = ({
  width,
  height,
  maintainAspectRatio,
  onResize,
  onToggleAspectRatio,
  onNext,
  onBack,
}) => (
  <div>
    <h2>Step 2: Resize the Photo (Optional)</h2>
    <label>
      Maintain Aspect Ratio
      <input type="checkbox" checked={maintainAspectRatio} onChange={onToggleAspectRatio} />
    </label>
    <input
      type="number"
      value={width}
      onChange={(e) => onResize(Number(e.target.value), height)}
      placeholder="Width"
    />
    <input
      type="number"
      value={height}
      onChange={(e) => onResize(width, Number(e.target.value))}
      placeholder="Height"
    />
    <button onClick={onNext}>Next</button>
    <button onClick={onBack}>Back</button>
  </div>
);

export default ImageResize;
