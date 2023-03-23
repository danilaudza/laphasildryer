import React, { useEffect, useState } from "react";
import Select from "react-select";
import Test from "../Components/Test";
import Total from "../Components/Total";
import { init, days, monthNames } from "../Object/initial";
import { copyToClipboard } from "../Object/Function";
import { optGrup } from "../Object/Options";

const Front = () => {
  const [data1, setData1] = useState(init);
  const [data2, setData2] = useState(init);
  const [data3, setData3] = useState(init);
  const [data4, setData4] = useState(init);
  const [data, setData] = useState({
    tgl: "",
    setting: "",
    nosetting: "",
    total: 0,
    keterangan: "",
    mesin: [data1, data2, data3, data4],
  });
  const [settings, setSettings] = useState(["", ""]);
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState({});
  const [grup, setGrup] = useState("")

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

  const getKubikasi = () => {
    let kubikTotal = 0;
    Object.entries(data.mesin).map(([key, mesin]) => {
      kubikTotal += mesin.kubikkasi;
    });
    return kubikTotal;
  };

  const text = () => {
    let arr = [];
    arr.push(`Laporan Hasil Dryer Grup ${grup} Hari ${tanggal["day"]} ${tanggal["date"]} ${tanggal["month"]} ${tanggal["year"]}\n`);
    Object.entries(data.mesin).map(([key, mesin]) => {
      arr.push(`${mesin.mesin}\n`);
      let txt = []
      let stc = []
      Object.entries(mesin.inputFields).map(([key2, values]) => {
        if (values.stockcard.startsWith('L')){
          txt.push(`${values.jenis} ${values.grade} ${values.tebal["label"]} (${values.ukuran["label"]}) Luar ${values.asalLuar}`)
        } else{
          txt.push(`${values.jenis} ${values.grade} ${values.tebal["label"]} (${values.ukuran["label"]}) Rotary`)
        }
        console.log(txt)
        // arr.push(`Jenis                  : ${values.jenis}`);
        // console.log(values.grade);
        // arr.push(`Grade                 : ${values.grade}`);
        // console.log(values.jmlbahan);
        // arr.push(`Jumlah Bahan : ${values.jmlbahan}`);
        // console.log(values.stockcard);
        // arr.push(`StockCard         : ${values.stockcard}`);
        stc.push(`${values.stockcard}`)
        console.log(stc)
        // console.log(values.tebal);
        // arr.push(`Tebal                  : ${values.tebal["label"]}`);
        // console.log(values.ukuran);
        // arr.push(`Ukuran               : ${values.ukuran["label"]}\n`);
      });
      arr.push(`Jenis Bahan : ${txt.join(' / ')}`)
      arr.push(`StockCard     : ${stc.join(' / ')}`)
      arr.push(`Mc1         : ${mesin.mc1}`);
      arr.push(`Mc2         : ${mesin.mc2}`);
      arr.push(`Kubikasi : ${mesin.kubikkasi.toFixed(2)} m³\n`);
      // console.log(kubikTotal)
    });
    arr.push(`Kubikasi Total : ${data.total.toFixed(2)} m³`);
    arr.push(`Non Setting     : ${data.nosetting}`);
    arr.push(`Setting              : ${data.setting}`);
    arr.push(`Keterangan :\n${data.keterangan}`);
    return arr;
  };

  const getSetting = (st: number, nst: number) => {
    let set = 0;
    let noset = 0;
    let all = 0;
    all = st + nst;
    set = (st / all) * 100;
    noset = (nst / all) * 100;
    setSettings([`${st} (${set.toFixed(2)}%)`, `${nst} (${noset.toFixed(2)}%)`]);
  };

  const getKeterangan = (ket) => {
    setKeterangan(ket);
  };

  useEffect(() => {
    setData({
      ...data,
      mesin: [data1, data2, data3, data4],
      total: getKubikasi(),
      setting: settings[0],
      nosetting: settings[1],
      keterangan: keterangan,
    });
  }, [data1, data2, data3, data4, settings, keterangan]);

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
      <div className="text-center font-bold text-4xl my-5">Laporan Hasil Dryer</div>
      <Select
            isSearchable={false}
            placeholder={"Grup"}
            className="mb-4 mx-5"
            onChange={(e) => setGrup(e.value)}
            options={optGrup}
          />
      <Test sendData={sendData1} mesin="Mesin 1"></Test>
      <Test sendData={sendData2} mesin="Mesin 2"></Test>
      <Test sendData={sendData3} mesin="Mesin 3"></Test>
      <Test sendData={sendData4} mesin="Mesin 4"></Test>
      <Total
        getKubikasi={getKubikasi}
        getSetting={getSetting}
        getKeterangan={getKeterangan}
      ></Total>
      <button
        className="flex bg-blue-600 px-4 py-2 text-white  font-bold mx-auto rounded-md mb-12"
        onClick={e => copyToClipboard(e,text)}
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default Front;
