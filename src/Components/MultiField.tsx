import React, { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { optGrade, optJenis, optTebal, optUkuran } from "../Object/Options";

const MultiField = ({ sendData, mesin }) => {
  const [inputFields, setInputFields] = useState<any>([
    {
      id: uuidv4(),
      jenis: "",
      grade: "",
      tebal: { value: 0, label: "", pcs: 0 },
      ukuran: { value: 0, label: "" },
      stockcard: "",
      jmlbahan: null,
      asalLuar: "",
      mc1: null,
      mc2: null,
      kubikasi: 0,
    },
  ]);

  const handleSelect = (id, event, check) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[check] = event;
        if(check === "jmlbahan" || check === "tebal" || check === "ukuran"){
          i["kubikasi"] = i["jmlbahan"] * i["tebal"]["value"] * i["ukuran"]["value"]
        }
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  useEffect(() => {
    sendData({ inputFields, mesin });
  }, []);  

  useEffect(() => {
    sendData({ inputFields, mesin });
  }, [inputFields, mesin]);  


  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        jenis: "",
        grade: "",
        tebal: { value: 0, label: "", pcs: 0 },
        ukuran: { value: 0, label: "" },
        stockcard: "",
        jmlbahan: null,
        asalLuar: "",
        mc1: null,
        mc2: null,
        kubikasi: 0,
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
            <div className="w-full lg:w-1/4">
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
            {inputField.stockcard.startsWith("L") ? (
              <div className="w-full lg:w-1/4">
                <label className="mb-1">Asal Luar</label>
                <input
                  type="text"
                  className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full"
                  placeholder={"Asal Luar"}
                  onChange={(e) =>
                    handleSelect(inputField.id, e.target.value, "asalLuar")
                  }
                  value={inputField.asalLuar}
                />
              </div>
            ) : (
              <div className="hidden"></div>
            )}
          </div>
          <label className="mb-1">Jumlah Bahan</label>
          <input
            type="number"
            className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4"
            placeholder={"Jumlah Bahan di " + mesin}
            onChange={(e) =>
              handleSelect(inputField.id, parseInt(e.target.value), "jmlbahan")
            }
            value={inputField.jmlbahan || ''}
          />
          <div className="flex flex-row gap-4">
            <div className="w-full lg:w-1/4">
              <label className="mb-1">Mc1</label>
              <input
                type="number"
                className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full"
                placeholder="Mc1"
                onChange={(e) =>
                  handleSelect(inputField.id, parseInt(e.target.value), "mc1")
                }
                value={inputField.mc1 || ''}
              ></input>
            </div>
            <div className="w-full lg:w-1/4">
              <label className="mb-1">Mc2</label>
              <input
                type="number"
                placeholder="Mc2"
                className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full"
                onChange={(e) =>
                  handleSelect(inputField.id, parseInt(e.target.value), "mc2")
                }
                value={inputField.mc2 || ''}
              ></input>
            </div>
          </div>

          <div>
            <label className="mb-1">Kubikasi</label>
            <br/>
            <input
              className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-1/2"
              onChange={(e) =>
                handleSelect(inputField.id, parseInt(e.target.value), "kubikasi")
              }
              value={inputField.kubikasi}
              disabled
            ></input>
          </div>

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
    </div>
  );
};

export default MultiField;
