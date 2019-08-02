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

const monDiff = (startDay, endDay) => {
  const SDarr = dateArr(startDay);
  const EDarr = dateArr(endDay);
  return (EDarr[2] - SDarr[2]) * 12 + EDarr[1] - SDarr[1] + 1;
}

// Определение используемой процентной ставки (считаем по дням или месяцам)
const rate = (startDate, endDate, yearRate, choice) => {
  const monthDiff = monDiff(startDate, endDate);
  const dayDiff = Number(diff(startDate, endDate));
  return choice ? monthDiff / 12 * yearRate : dayDiff / 365 * yearRate;
}

//console.log(rate('25.06.2019', '31.01.2020', '2', false));

//Функция рассчета и вывода стоимости гарантии
const price = (garValue, usedRate) => {
  const res = Math.floor(usedRate / 100 * Number(garValue));
  return `${res.toLocaleString()} руб.`
}

//console.log(price('12345005.56', rate('25.06.2019', '31.01.2020', '2', true)))

//Функция преобразования даты в формат, подходящий для вывода
const outDate = (d) => {
  const monthArr = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const arr = dateArr(d);
  return `${arr[0]} ${monthArr[arr[1] - 1]} ${arr[2]} года`;
}

//Функция преобразования размера обеспечения в формат, подходящий для вывода
const outGarValue = (val) => {
  return `${Number(val).toLocaleString()} руб.`;
};

const Calculate = function (startDate, endDate, garVal, yearRate, dayMonth) {
  this.ogv = outGarValue(garVal);
  this.od = outDate(endDate);
  this.absrate = rate(startDate, endDate, yearRate, dayMonth);
  this.finprice = price(this.absrate, garVal);
  this.validity = dayMonth ? `${monDiff(startDate, endDate)}` 
                  : `${diff(startDate, endDate)}`;
  this.outabsrate = `${Math.round(this.absrate * 100)/100} %`;
  this.uom = dayMonth ? 'месяцах' : 'днях';
}
//console.log(new Calculate('27.06.2019', '31.01.2020', '12365789.55', '2', false));

const Check = function (sDate, eDate, gVal, price) {
  this.absrate = Math.round(Number(price) / Number(gVal) * 10000) / 100;
  this.dayVal = diff(sDate, eDate);
  this.monVal = monDiff(sDate, eDate);
  this.YearRateByMonth = Math.ceil(this.absrate / this.monVal * 12 * 100) / 100; 
  this.YearRateByDay = Math.ceil(this.absrate / this.dayVal * 365 * 100) / 100; 

}

//console.log(new Check('27.06.2019','31.01.2020','10576879.46', '126342'))


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

  if (!(SD && ED && GV && YR)) {
    alert(' Необходимо заполнить все поля в форме "Калькулятор суммы" ');
    $('#output').prepend("<br><span style='background-color:black; color:white'>НЕВЕРНЫЕ ДАННЫЕ</span><br>");
    return;
  }
  
  let choice = $('#bymonth').prop('checked');
  
  let res = new Calculate(nSD, nED, nGV, nYR, choice);
  console.log(res);
// Формирование результата  
  let output = `При сумме гарантии в
    <span style='background-color:#1a1aff; color:white'>${res.ogv}</span>
    и сроке действия гарантии до 
    <span style='background-color:#1a1aff; color:white'>${res.od}</span>
    стоимость составит 
    <span style='background-color:#1a1aff; color:white'>${res.finprice}</span>
    <br><br>Срок гарантии в ${res.uom} - ${res.validity}
    <br><br>Процентная ставка от суммы - ${res.outabsrate}`
//Вывод
  $('#output').html(output);
   });

//Калькулятор срока
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

    if (!(f1 && f2)) {
      alert(' Необходимо заполнить все поля в форме "Калькулятор срока"');
      
      $('#calcout').prepend("<br><span style='background-color:black; color:white'>НЕВЕРНЫЕ ДАННЫЕ</span><br>")
      return
    }

    let check = $('#diff').prop('checked');
    let x = check ? diff(nf1, nf2) : sum(nf1, f2);
//Вывод
      $('#calcout').html(x);
  })
  
//Анализ счета
  $('#pb3button').click(function () {
    let CSD = $('#CSD').val();
    let nCSD = normalize(CSD);
    
    let CED = $('#CED').val();
    let nCED = normalize(CED);
    
    let CGV = $('#CGV').val();
    let nCGV = normalize(CGV);
    
    let CP = $('#CP').val();
    let nCP = normalize(CP);
    
    if (!(CSD && CED && CGV && CP)) {
      alert(' Необходимо заполнить все поля в форме "Анализ счета"');
      $('#checkout').prepend("<br><span style='background-color:black; color:white'>НЕВЕРНЫЕ ДАННЫЕ</span><br>");
      return;
    };

    let respb3 = new Check(nCSD, nCED, nCGV, nCP);
//Формирование результата
    let out = `Процент от суммы - ${respb3.absrate}<br><hr><br>
               Длительность гарантии в днях - ${respb3.dayVal}<br>
               Годовая ставка в рассчете по дням - ${respb3.YearRateByDay}<br><hr><br>
               Длительность гарантии в месяцах - ${respb3.monVal}<br>
               Годовая ставка в рассчете по месяцам - ${respb3.YearRateByMonth}<br><hr><br>
               `
    console.log(respb3);
//Вывод
    $('#checkout').html(out);
  })

})




