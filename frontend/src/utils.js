const convertToThousands = (number) => {
  if (number === undefined || isNaN(number))
    return undefined;
  if (number < 1000)
    return number.toString();

  const returnedNumber = Math.round(number / 100) / 10;

  return `${returnedNumber}k`;
};

const convertSortBy = (sortBy) => {
  if (!sortBy)
    return null;

  switch (sortBy) {
    case 'latest':
      return ({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
    case 'highestRated':
      return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
    case 'lowestRated':
      return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
    default:
      return ({});
  }
};

export { convertToThousands, convertSortBy };