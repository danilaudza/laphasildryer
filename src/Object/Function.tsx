import copy from "copy-to-clipboard";

export const copyToClipboard = (e,text) => {
    e.preventDefault()
    // setArr(text())
    // console.log(arrAll)
    // setCopy(text().join('\n'))
    // console.log(copyText)
    copy(text().join('\n'));
    alert(`Sudah di copy 👏`);
  };

