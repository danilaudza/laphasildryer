import copy from "copy-to-clipboard";
import axios from "axios";

export const copyToClipboard = (e, text, data) => {
  e.preventDefault();

  // axios
  //   .post("http://127.0.0.1:5000/sendData", data)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  copy(text().join("\n"));
  console.log(data)
  alert(`Sudah di copy 👏`);
};
