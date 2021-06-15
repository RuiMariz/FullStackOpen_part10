const convertToThousands = (number) => {
  if (number === undefined || isNaN(number))
    return undefined;
  if (number < 1000)
    return number.toString();

  const returnedNumber = Math.round(number / 100) / 10;

  return `${returnedNumber}k`;
};

export { convertToThousands };