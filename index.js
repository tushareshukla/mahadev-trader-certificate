const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");
const { PDFDocument, rgb } = PDFLib; // Removed unnecessary 'degrees'
const capitalize = (str, lower = false) => (
  lower ? str.toLowerCase() : str
).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
  match.toUpperCase()
);

submitBtn.addEventListener("click", async () => { // Added 'async' to the click event listener
  const val = capitalize(inputVal.value); // Fixed variable name from 'userName' to 'inputVal'

  if (val.trim() !== "" && inputVal.checkValidity()) {
    await generatePDF(val); // Added 'await' here
  } else {
    inputVal.reportValidity();
  }
});

const generatePDF = async (name) => {
  const existingBytes = await fetch("./mahadev.pdf").then((res) => res.arrayBuffer()); // Added 'await' here
  const exFont = await fetch("./AlexBrush-Regular.ttf").then((res) => res.arrayBuffer()); // Added 'await' here
  const pdfDoc = await PDFDocument.load(existingBytes); // Fixed variable name from 'exBytes' to 'existingBytes'
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  firstPage.drawText(name, {
    x: 300,
    y: 320,
    size: 59,
    font: myFont,
    color: rgb(0.23, 0.71, 0.14),
  });
  const pdfBytes = await pdfDoc.save();
  console.log("Done Creating");
  var file = new File(
    [pdfBytes],
    "Congratulation from Mahadev Trader.pdf",
    {
      type: "application/pdf; charset=utf-8",
    }
  );
  saveAs(file);
  document.querySelector("#mypdf").src = file; // Fixed variable name from 'uri' to 'file'
};
