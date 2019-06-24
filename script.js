// переменные - startDate, endDate, garValue, yearRate
// вывод - garValue. endDate, price
// расчет стоимости гарантии исходя из суммы, срока и процента с выводом части
// части комерческого предложения

// Получение сегодняшнего дня в формате дд.мм.гггг
const today = () => {
  const currentDay = new Date();
  const dd = String(currentDay.getDate()).padStart(2, '0');
  const mm = String(currentDay.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = currentDay.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

// Нормализация значений, для возможности ввода в удобном формате
const normalize = (x) => x.replace(/\s+/g, '').replace(/[,-/]/g, ".")

// Функция создания массива из даты
const dateArr = (date) => date.split(".").map(el => Number(el));

//Функция рассчета и вывода стоимости гарантии
const price = (startDate, endDate, garValue, yearRate) => {
  const SDarr = dateArr(startDate);
  const EDarr = dateArr(endDate);
  const monthDiff = (EDarr[2] - SDarr[2]) * 12 + EDarr[1] - SDarr[1] + 1;
  const res = Math.floor(monthDiff / 12 * yearRate / 100 * Number(garValue));
  return `${res.toLocaleString()} руб.`
}

//Функция преобразования даты в формат, подходящий для вывода
const outDate = (d) => {
  const monthArr = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const arr = dateArr(d);
  return `${arr[0]} ${monthArr[arr[1] - 1]} ${arr[2]} года`;
}

//Функция преобразования размера обеспечения в формат, подходящий для вывода
const outGarValue = (val) => {
  return `${Number(val).toLocaleString()} руб.`;
}

// Ф-ции калькулятора дней
const diff = (date1, date2) => {
  const d1arr = dateArr(date1);
  const d2arr = dateArr(date2);
  let d2 = new Date(d1arr[2], d1arr[1] - 1, d1arr[0]);
  let d1 = new Date(d2arr[2], d2arr[1] - 1, d2arr[0])
  return `${(d1-d2)/1000/3600/24}`
}

const sum = (date, val) => {  
  const arr = dateArr(date);
  let d = new Date(arr[2], arr[1] - 1, arr[0]);
  d.setDate(d.getDate() + Number(val));
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}


$(document).ready(function() {
// автоматическое заполнение форм "дата начала" и "годовой процент" самыми распространенными значениями
  $('#SD').val(today());
  $('#YR').val('2');
  $('#calcstart').val(today());
  
   $('#pb1button').click(function() {
// получение значений из форм
  let SD = $('#SD').val();
  let nSD = normalize(SD);
     
  let ED = $('#ED').val();
  let nED = normalize(ED);
     
  let GV = $('#GV').val();
  let nGV = normalize(GV);
     
  let YR = $('#YR').val();
  let nYR = normalize(YR);
  
//  let res = price(nSD, nED, nGV, nYR)
// Формирование результата  
  let output = `При сумме гарантии в
    <span style='background-color:#00ff00'>${outGarValue(nGV)}</span>
    и сроке действия гарантии до 
    <span style='background-color:#00ff00'>${outDate(nED)}</span>
    стоимость составит 
    <span style='background-color:#00ff00'>${price(nSD, nED, nGV, nYR)}</span>`
// Окончательный вывод
  $('#output').html(output);
   });

//Калькулятор дней
  $('#diff').click(function () {
    $('#difflabel').text('Ввести конечную дату для расчета разницы');
    $('#calcdiff').val('');
    $('#calcdiff').prop('placeholder', 'дата формата дд.мм.гггг, пример 22.10.2022');
  });

  $('#sum').click(function () {
    $('#difflabel').text('Ввести кол-во дней, которое необходимо прибавить');
    $('#calcdiff').val('');
    $('#calcdiff').prop('placeholder', 'кол-во дней, пример:365');
  });

  $('#pb2button').click(function() {
    let f1 = $('#calcstart').val();
    let nf1 = normalize(f1);
    let f2 = $('#calcdiff').val();
    let nf2 = normalize(f2);

    let check = $('#diff').prop('checked');
    let x = check ? diff(nf1, nf2) : sum(nf1, f2);
    $('#calcout').html(x);
  })

})

