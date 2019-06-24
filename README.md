<!DOCTYPE html>
<html>
<head>
  <link href="style.css" rel="stylesheet">
  <meta charset="utf-8">  
  <meta name="viewport" content="width=device-width">
  <title>Расчет</title>
</head>
<body>
  <h2>Калькулятор суммы</h2>
  <div class='pageblock pb1'>
    <div class='wrapper'>
      <label for="SD">
        Дата начала гарантии
      </label>
      <input id='SD'>
    
      <label for="ED">
        Дата окончания гарантии
      </label>
      <input id='ED'>
    
      <label for="GV">
        Размер обеспечения
      </label>
      <input id='GV'>
    
      <label for="YR">
        Процентая ставка (годовых)
      </label>
      <input id='YR'>
    
    <button id='pb1button'>Рассчитать</button>
    </div>
    
    <div id='output' class='res'>
      
    </div>
  </div>
  
  
  <h2>Калькулятор срока</h2>
  <div class='pageblock pb2'>
      <div class='wrapper'>
        <label for='calcstart'>
          Дата начала отсчета
        </label>
        <input id='calcstart'>
        
        <div class='select'>
          <input id='diff' type="radio" name='radioselect' checked/>
          <label for='diff'>
            <span>Разница</span>
          </label>        
          
          <input id='sum' type="radio" name='radioselect'/>
          <label for='sum'>
            <span>Прибавить</span>
          </label>
        </div>
        
        <label for='calcdiff' id='difflabel'>
          Ввести конечную дату для расчета разницы
        </label>
        <input id='calcdiff' placeholder='дата формата дд.мм.гггг, пример 22.10.2022'>
        
        <button id='pb2button'>Рассчитать</button>
        
      </div>
      <div id='calcout' class='res'>
        
      </div>
  </div>
  
  
<script src="https://code.jquery.com/jquery-1.9.1.js"></script>
<script src="script.js"></script>
</body>
</html>
