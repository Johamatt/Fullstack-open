const reverse = (string: string) => {
    return string.split("").reverse().join("");
  };
  
  const average = (array: Array<number>) => {
    const reducer = (sum: number, item: number) => {
      return sum + item;
    };
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
  };
  
  module.exports = {
    reverse,
    average,
  };
  