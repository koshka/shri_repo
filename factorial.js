// Определим верхнюю границу таких чисел
// Любое n-значное число не меньше 10^(n-1). Сумма факториалов его цифр не больше 9!*n=362880
// Первая величина возрастает быстрее второй(в зависимости от n)
// 10^7 > 9!*8=2903040 => искомые числа состоят не более чем из 7 цифр, и они меньше, чем 9!*7=2540160
// Далее числа ищем перебором

// массив, в котором хранятся значения факториалов всех цифр 0-9
function fact() {
  var simple_factorials = [];
  var result = [];
  simple_factorials.push(1);
  for (var k = 1; k < 10; ++k) {
    simple_factorials.push(simple_factorials[k - 1] * k);
  }

  for (var i = 0; i < 2540160; ++i) {
    var number = i.toString();
    var sum = 0;
    for (var j = 0; j < number.length; ++j) {
      sum += simple_factorials[parseInt(number[j], 10)];
    }
    if (i == sum) {
      console.log(i + ' ');
      result.push(i);
    }
  }
  return result;
}
fact();