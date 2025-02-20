import React, { useState } from "react";

const HexToRgbConverter = () => {
  const [hexColor, setHexColor] = useState("");
  const [rgbColor, setRgbColor] = useState("");
  const [error, setError] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexColor(value);

    if (value.length === 7) {
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        setRgbColor(`rgb(${r}, ${g}, ${b})`);
        setError(false);
      } else {
        setRgbColor("Error!");
        setError(true);
      }
    } else {
      setRgbColor("");
      setError(false);
    }
  };

  const getContainerClassName = () => {
    if (error) return "container container--error";
    if (hexColor.length === 7 && !error) return "container container--color";
    return "container container--default";
  };

  return (
    <div 
      className={getContainerClassName()}
      style={hexColor.length === 7 && !error ? { "--hex-color": hexColor } as React.CSSProperties : {}}
    >
      <div className="card">
        <input
          type="text"
          value={hexColor}
          onChange={handleInputChange}
          placeholder="here input, e.g.  #FFFFFF"
          maxLength={7}
          className={`input ${error ? "input--error" : ""}`}
        />
        <div className={`result ${error ? "result--error" : ""}`}>
          {rgbColor}
        </div>
      </div>
    </div>
  );
};

export default HexToRgbConverter;