import React, { useState } from "react";


export default function Slider() {
  const [value, onChange] = useState(0);

  return (
    <div className="slider-parent">
      <input type="range" min="-1" max="1" step={0.1} value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(radius);
        }}
      />
      <div className="buble">
        {value}
      </div>
    </div>
  );
}