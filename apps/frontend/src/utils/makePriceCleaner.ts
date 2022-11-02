const makePriceCleaner: (price: number | string) => string = (price) => {
  const [integerPart, decimalPart] = price.toString().split(".");

  const digits = integerPart.split("").reverse();

  const modifiedDigits = digits.reduce((prevVal, currVal, i, arr) => {
    const index: number = i + 1;
    return (
      prevVal +
      (index % 3 == 0 && i !== arr.length - 1 ? currVal + "," : currVal)
    );
  });

  const finalInteger = modifiedDigits
    .split("")
    .reverse()
    .reduce((prevVal, currVal) => prevVal + currVal);

  if (decimalPart && decimalPart !== "00") {
    return finalInteger + "/" + decimalPart;
  }

  return finalInteger;
};

export default makePriceCleaner;
