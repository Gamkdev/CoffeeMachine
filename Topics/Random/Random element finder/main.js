const romanNumbers = ["I", "II", "III", "IV", "V"];

function getRomanNumber(array) {
let index = Math.floor(Math.random() * 4) + 1;
  return array[index]
}
console.log(getRomanNumber(romanNumbers));