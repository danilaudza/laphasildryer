import React, { useEffect, useState } from "react";
import Select from "react-select";
import MultiField from "../Components/MultiField";
import Total from "../Components/Total";
import { init, days, monthNames } from "../Object/initial";
import {
  copyToClipboard,
  mergingData,
  resultJumlahTotal,
} from "../Object/Function";
import { optGrup, optKrat } from "../Object/Options";

const Front = () => {
  const [data1, setData1] = useState(init);
  const [data2, setData2] = useState(init);
  const [data3, setData3] = useState(init);
  const [data4, setData4] = useState(init);
  const [data, setData] = useState({
    tgl: "",
    grup: "",
    setting: "",
    nosetting: "",
    total: 0,
    krat: 0,
    sisa: 0,
    keterangan: "",
    mesin: [data1, data2, data3, data4],
  });
  const [settings, setSettings] = useState(["", ""]);
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState({});
  const [grup, setGrup] = useState("");
  const [res, setRes] = useState([]);

  const sendData1 = (item) => {
    setData1(item);
  };
  const sendData2 = (item) => {
    setData2(item);
  };
  const sendData3 = (item) => {
    setData3(item);
  };
  const sendData4 = (item) => {
    setData4(item);
  };

  const text = () => {
    let arr = [];
    arr.push(`Laporan Hasil Dryer`);
    arr.push(`  Grup _*${grup}*_`);
    arr.push(
      `Hari ${tanggal["day"]} ${tanggal["date"]} ${tanggal["month"]} ${tanggal["year"]}\n`
    );

    let totalBahan = 0;

    Object.entries(data.mesin).map(([key, mesin]) => {
      arr.push(`*${mesin.mesin}*\n`);

      Object.entries(mesin.inputFields).map(([key2, values]) => {
        if (values.stockcard.length != 0) {
          if (values.stockcard.startsWith("L")) {
            arr.push(
              `Bahan  : ${values.jenis} ${values.grade} ${values.tebal["label"]} (${values.ukuran["label"]}) Luar ${values.asalLuar}`
            );
          } else {
            arr.push(
              `Bahan  : ${values.jenis} ${values.grade} ${values.tebal["label"]} (${values.ukuran["label"]}) Rotary`
            );
          }
        } else {
          arr.push(`Bahan  : `);
        }

        arr.push(`StockCard  : ${values.stockcard}`);
        arr.push(`Jumlah Bahan  : ${values.jmlbahan}`);
        arr.push(`Mc1  : ${values.mc1}`);
        arr.push(`Mc2  : ${values.mc2}`);
        arr.push(`Kubikasi : ${values.kubikasi.toFixed(2)} m³\n`);

        totalBahan += values.jmlbahan;

        return 0;
      });

      return 0;
    });

    arr.push(`*Jumlah Total* :`);
    res.forEach((x) => {
      arr.push(`  ${x["jenis"]} ${x["tebal"]} _${x["jmlbahan"]}_ Pcs`);
    });
    arr.push(`*Krat Total*  :`);
    res.forEach((x) => {
      arr.push(
        `  ${x["jenis"]} ${x["tebal"]} ${Math.floor(
          x["jmlbahan"] / x["pcs"]
        )} Krat + ${x["jmlbahan"] % x["pcs"]}`
      );
    });
    arr.push(`*Kubikasi Total*  : _${data.total.toFixed(2)}_ m³`);
    arr.push(`*Non Setting*  : _${data.nosetting}_`);
    arr.push(`*Setting*  : _${data.setting}_`);
    arr.push(`*Keterangan* :\n${data.keterangan}`);
    return arr;
  };

  const getKubikasi = () => {
    let kubikTotal = 0;
    Object.entries(data.mesin).map(([key, mesin]) =>
      Object.entries(mesin.inputFields).map(
        ([key2, values]) => (kubikTotal += values.kubikasi)
      )
    );
    return kubikTotal;
  };

  const getKrat = () => {
    let krat = 0;
    let sisa = 0;
    Object.entries(data.mesin).map(([key, mesin]) =>
      Object.entries(mesin.inputFields).map(([key2, values]) => {
        if (values.jenis === "OPC") {

          krat += Math.floor(values.jmlbahan / values.tebal["pcs"]);
          sisa += values.jmlbahan % values.tebal["pcs"];
        }
        return 0;
      })
    );
    return [krat, sisa];
  };

  const getJumlahTotal = () => {
    let opcArr = [];
    Object.entries(data.mesin).map(([key, mesin]) => {
      Object.entries(mesin.inputFields).map(([key2, values]) => {
        if (values.jenis === "OPC") {
          let col = [
            values.tebal["label"],
            values.jmlbahan,
            values.ukuran["label"],
          ];
          let appendee = {
            jenis: "OPC",
            tebal: col[0],
            jmlbahan: col[1],
            ukuran: col[2],
            pcs: 0,
          };
          opcArr.push(appendee);
        }
      });
    });
    return opcArr;
  };

  const getSetting = (st: number, nst: number) => {
    let set = 0;
    let noset = 0;
    let all = 0;
    all = st + nst;
    set = (st / all) * 100;
    noset = (nst / all) * 100;
    setSettings([
      `${st} (${set.toFixed(2)}%)`,
      `${nst} (${noset.toFixed(2)}%)`,
    ]);
  };

  const getKeterangan = (ket) => {
    setKeterangan(ket);
  };

  useEffect(() => {
    const opcArr = getJumlahTotal();
    let dataKrat = mergingData(opcArr);
    resultJumlahTotal(dataKrat, optKrat);
    setRes(dataKrat);

    setData({
      ...data,
      grup: grup,
      mesin: [data1, data2, data3, data4],
      total: getKubikasi(),
      krat: getKrat()[0],
      sisa: getKrat()[1],
      setting: settings[0],
      nosetting: settings[1],
      keterangan: keterangan,
    });
  }, [data1, data2, data3, data4, settings, keterangan, grup]);

  useEffect(() => {
    let date = new Date();
    let asd =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    setData({ ...data, tgl: asd });
    setTanggal({
      day: days[date.getDay()],
      date: date.getDate(),
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center font-bold text-4xl my-5">
        Laporan Hasil Dryer
      </div>
      <Select
        isSearchable={false}
        placeholder={"Grup"}
        className="mb-4 mx-5"
        onChange={(e) => setGrup(e.value)}
        options={optGrup}
      />
      <MultiField sendData={sendData1} mesin="Mesin 1"></MultiField>
      <MultiField sendData={sendData2} mesin="Mesin 2"></MultiField>
      <MultiField sendData={sendData3} mesin="Mesin 3"></MultiField>
      <MultiField sendData={sendData4} mesin="Mesin 4"></MultiField>
      <Total
        getKubikasi={getKubikasi}
        getSetting={getSetting}
        getKeterangan={getKeterangan}
        res={res}
      ></Total>
      <button
        className="flex bg-blue-600 px-4 py-2 text-white font-bold mx-auto rounded-md mb-12"
        onClick={(e) => copyToClipboard(e, text, data)}
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default Front;
