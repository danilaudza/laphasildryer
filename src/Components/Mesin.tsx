import React from "react";

const Mesin = ({ setMesin, mesin, child, title }) => {
  return (
    <div className="w-full my-5 flex flex-col">
      <p className="text-xl font-bold">{title}</p>
      <p>Tebal</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], tebal: e.target.value },
          })
        }
        className="border-2"
        placeholder={"Tebal " + title}
      />
      <p>No Stoccard</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], stoccard: e.target.value },
          })
        }
        className="border-2"
        placeholder={"No Stoccard " + title}
      />
      <p>Jumlah Bahan</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], jmlbahan: e.target.value },
          })
        }
        className="border-2"
        placeholder={"Jumlah Bahan " + title}
      />
      <p>Hasil M3</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], m3: e.target.value },
          })
        }
        className="border-2"
        placeholder={"Hasil M3 " + title}
      />
      <p>Mc 1</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], mc1: e.target.value },
          })
        }
        className="border-2"
        placeholder={"Mc 1 " + title}
      />
      <p>Mc 2</p>
      <input
        onChange={(e) =>
          setMesin({
            ...mesin,
            [child]: { ...mesin[child], mc2: e.target.value },
          })
        }
        className="border-2"
        placeholder={"Mc 2 " + title}
      />
    </div>
  );
};

export default Mesin;
