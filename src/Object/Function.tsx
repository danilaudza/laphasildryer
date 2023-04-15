import copy from "copy-to-clipboard";
import axios from "axios";

export const copyToClipboard = (e, text, data) => {
  e.preventDefault();

  let grup = data["grup"]
  let jsonData = {
    'msg' : `Grup ${grup} sedang mengisi data.`
  }
  axios
    .post("http://127.0.0.1:5000/sendReport", jsonData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  copy(text().join("\n"));
  
  alert(`Sudah di copy 👏`);
};

export const resultJumlahTotal = (res, optKrat) => {
  
  res.forEach((input) => {
    let pcsValue = null;

    optKrat.forEach((opt) => {
      if (opt["tebal"] === input["tebal"] && opt["ukuran"] === input["ukuran"]) {
        pcsValue = opt["pcs"];
        input["pcs"] = pcsValue;
      }
    });
  });
}

export const mergingData = (opcArr) => {
  let res = Object.values(
    opcArr.reduce((acc, { jmlbahan, ...r }) => {
      let key = Object.entries(r).join("-");
      acc[key] = acc[key] || { ...r, jmlbahan: 0 };
      return (acc[key].jmlbahan += jmlbahan), acc;
    }, {})
  );
  return res
}
