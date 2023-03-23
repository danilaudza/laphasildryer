import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { optGrade, optJenis, optTebal, optUkuran } from "../Object/Options";

const Test = ({ sendData, mesin }) => {
  const [inputFields, setInputFields] = useState<any>([
    {
      id: uuidv4(),
      jenis: "",
      grade: "",
      tebal: { value: 0, label: "" },
      ukuran: { value: 0, label: "" },
      stockcard: "",
      jmlbahan: null,
      asalLuar : ""
    },
  ]);
  const [kubikkasi, setKubikasi] = useState<number>(0);
  const [mc1, setMc1] = useState(null);
  const [mc2, setMc2] = useState(null);

  useEffect(() => {
    let jumlah = 0;
    inputFields.map((i) => {
      jumlah += i.jmlbahan * i.tebal.value * i.ukuran.value;
      return jumlah;
    });
    setKubikasi(jumlah);

    sendData({ inputFields, mc1, mc2, kubikkasi, mesin });
  }, [inputFields, mc1, mc2, kubikkasi, mesin]);

  const handleSelect = (id, event, check) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[check] = event;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        jenis: "",
        grade: "",
        tebal: { value: 0, label: "" },
        ukuran: { value: 0, label: "" },
        stockcard: "",
        jmlbahan: null,
        asalLuar : ""
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div className="p-5">
      <p className="font-bold text-2xl my-5">{mesin}</p>
      {inputFields.map((inputField) => (
        <div
          key={inputField.id}
          className="flex flex-col border-2 rounded-md p-5 my-5"
        >
          <label className="mb-1">Jenis Bahan</label>
          <Select
            isSearchable={false}
            placeholder={"Jenis di " + mesin}
            className="mb-4"
            onChange={(e) => handleSelect(inputField.id, e.value, "jenis")}
            options={optJenis}
          />
          <label className="mb-1">Grade Bahan</label>
          <Select
            isSearchable={false}
            placeholder={"Grade di " + mesin}
            className="mb-4"
            onChange={(e) => handleSelect(inputField.id, e.value, "grade")}
            options={optGrade}
          />
          <label className="mb-1">Ketebalan Bahan</label>
          <Select
            isSearchable={false}
            placeholder={"Tebal di " + mesin}
            className="mb-4"
            onChange={(e) => handleSelect(inputField.id, e, "tebal")}
            options={optTebal}
          />
          <label className="mb-1">Ukuran Bahan</label>
          <Select
            isSearchable={false}
            placeholder={"Ukuran di " + mesin}
            className="mb-4"
            onChange={(e) => handleSelect(inputField.id, e, "ukuran")}
            options={optUkuran}
          />
          <div className="flex flex-row gap-4">
            <div>
              <label className="mb-1">Stock Card</label>
              <input
                type="text"
                className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full"
                placeholder={"StockCard di " + mesin}
                onChange={(e) =>
                  handleSelect(
                    inputField.id,
                    e.target.value.toUpperCase(),
                    "stockcard"
                  )
                }
                value={inputField.stockcard}
              />
            </div>
              { inputField.stockcard.startsWith('L') ?
            <div>
              <label className="mb-1">Asal Luar</label>
              <input
                type="text"
                className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full"
                placeholder={"Asal Luar"}
                onChange={(e) =>
                  handleSelect(
                    inputField.id,
                    e.target.value,
                    "asalLuar"
                  )
                }
                value={inputField.asalLuar}
              />
            </div>
            :
            <div className="hidden"></div>
            }
          </div>
          <label className="mb-1">Jumlah Bahan</label>
          <input
            type="number"
            className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4"
            placeholder={"Jumlah Bahan di " + mesin}
            onChange={(e) =>
              handleSelect(inputField.id, e.target.value, "jmlbahan")
            }
            value={inputField.jmlbahan}
          />
          <div className="ml-auto flex flex-row gap-4">
            <button
              className="bg-blue-600 px-4 py-2 rounded-md font-bold text-white disabled:bg-blue-300 hover:bg-blue-800 transition-all"
              onClick={handleAddFields}
            >
              Tambah
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-md font-bold text-white disabled:bg-red-300 hover:bg-red-800 transition-all"
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label className="mb-1">Mc1</label>
          <input
            type="number"
            placeholder="Mc1"
            className="w-full border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2"
            onChange={(e) => setMc1(parseInt(e.target.value))}
            value={mc1}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Mc2</label>
          <input
            type="number"
            placeholder="Mc2"
            className="w-full border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2"
            onChange={(e) => setMc2(parseInt(e.target.value))}
            value={mc2}
          ></input>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <label className="mb-1">Kubikasi</label>
        <input
          value={kubikkasi}
          className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2 w-1/2"
          disabled
        ></input>
      </div>
    </div>
  );
};

export default Test;
