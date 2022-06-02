import React, { useState, useEffect } from "react";

export default function Slider() {
  const [value, onChange] = useState(1);

  useEffect(() => {
    const ele = document.querySelector(".buble");
    if (ele) {
      ele.style.left = `${Number(value / 10)}px`;
    }
  });

  return (
    <div className="w-100  align-items-center pb-2">
      <div className="slider-parent">
        <input
          type="range"
          min="-1"
          max="1"
          step={0.1}
          value={value}
          onChange={({ target: { value: radius } }) => {
            onChange(radius);
          }}
        />
        <div className="buble">{value}</div>
      </div>
    </div>
  );
}
