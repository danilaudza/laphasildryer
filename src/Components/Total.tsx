import React, { useEffect, useState } from "react";

const Total = ({ getKubikasi, getSetting, getKeterangan, res }) => {
  const [setting, setSetting] = useState<number>(null);
  const [nonSetting, setNonSetting] = useState<number>(null);
  const [keterangan, setKeterangan] = useState<string>("");

  useEffect(() => {
    getSetting(setting, nonSetting);
    getKeterangan(keterangan);
  }, [setting, nonSetting, keterangan]);

  return (
    <div className="flex flex-col p-5">
      <label className="mb-1">Jumlah Total</label>
      <div className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2 pointer-events-none bg-[#fafafa]">
        {res.map((item, index) => (
          <div key={index}>
            {item["jenis"]} {item["tebal"]} {item["jmlbahan"]} Pcs
          </div>
        ))}
      </div>
      <label className="mb-1">Total Kubikasi</label>
      <div
        className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2 pointer-events-none bg-[#fafafa]"
      >
        {getKubikasi()}
      </div>
      <label className="mb-1">Total Krat</label>
      <div className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2 pointer-events-none bg-[#fafafa]">
        {res.map((item, index) => (
          <div key={index}>
            {item["jenis"]} {item["tebal"]}{" "}
            {Math.floor(item["jmlbahan"] / item["pcs"])} Krat +{" "}
            {item["jmlbahan"] % item["pcs"]}`
          </div>
        ))}
      </div>
      <label className="mb-1">Setting</label>
      <input
        type="number"
        className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2"
        placeholder="Tulis Angka Setting"
        value={setting || ''}
        onChange={(e) => setSetting(parseInt(e.target.value))}
      />
      <label className="mb-1">Non Setting</label>
      <input
        type="number"
        className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2"
        placeholder="Tulis Angka non Setting"
        value={nonSetting || ''}
        onChange={(e) => setNonSetting(parseInt(e.target.value))}
      />
      <label className="mb-1">Keterangan</label>
      <textarea
        className="h-48 border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-2"
        name="keterangan"
        placeholder="keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Total;
