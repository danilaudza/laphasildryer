import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const options = [
  { value: "L", label: "L" },
  { value: "M", label: "M" },
];

const Stockcard = () => {
  const [selected, setSelected] = useState(null);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };

  return (
    <div className="grid grid-cols-3">
      <Select
        defaultValue={selected}
        onChange={handleChange}
        options={options}
      />
      <input placeholder="Tahun"></input>
      <input placeholder="ID"></input>
      <input placeholder="Jumlah Bahan"></input>
    </div>
  );
};

export default Stockcard;
