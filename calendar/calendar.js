var calendar = (function(){
  //today
  var today = new Date()
  var cyear = today.getFullYear()
  var cmonth = today.getMonth() + 1
  var cday = today.getDate()  //1-31
  var wd = today.getDay()  //0,6
  var tyear = cyear;
  var tmonth = cmonth;

  //style
  var calendarMainStyle = "display: none;position: relative;;height: 240px;width: 200px;border: 1px solid #555;border-radius: 10px;"
  var calendarCloseStyle = "position: absolute;right: 3px;top: 3px;height: 10px;width: 10px;font-size: 10px;line-height: 10px;  border: 1px solid #555;border-radius: 50%;text-align: center;"
  var calendarDaysStyle = "position: absolute;top:50px;left: 9px;"
  var calendarDayStyle = "display: inline-block;width: 24px;height: 22px;line-height: 22px;text-align: center;border: 1px solid #555;"

  //html element
  var calendar = document.createElement('div')
  var calendarInput = createCalendarInput()
  var calendarMain = createCalendarMain()
  var calendarClose = createCalendarClose()
  // var calendarYCtrl = createCalendarYCtrl()
  // var calendarMCtrl = createCalendarMCtrl()
  var calendarYCtrl = createCalendarCtrl('y')
  var calendarMCtrl = createCalendarCtrl('m')
  var calendarDays = createCalendarDays(cyear,cmonth,cday)

  function createCalendar(){
    calendarInput.onfocus = function(){
      calendarMain.style.display = 'block'
    }
    calendarClose.onclick = function(){
      calendarMain.style.display = 'none'
    }
    calendar.appendChild(calendarInput)
    calendar.appendChild(calendarMain)
    calendarMain.appendChild(calendarClose)
    calendarMain.appendChild(calendarYCtrl)
    calendarMain.appendChild(calendarMCtrl)
    calendarMain.appendChild(calendarDays)
    document.body.appendChild(calendar)
  }

  function createCalendarInput(){
    var input = document.createElement('input')
    input.style = "height: 25px;line-height: 25px;width: 200px;border-radius: 5px;padding:0;margin:0;"
    return input
  }

  function createCalendarMain(){
    var div = document.createElement('div')
    div.style = calendarMainStyle
    return div
  }

  function createCalendarClose(){
    var div = document.createElement('div')
    div.style = calendarCloseStyle
    div.innerHTML = "*"
    return div
  }

  function createCalendarCtrl(type){
    var div = document.createElement('div')
    var input = document.createElement('input')
    input.disabled = "disabled"
    input.style = "width:30px;text-align:center;"
    var lb = document.createElement('button')
    lb.innerHTML = "<"
    lb.style = "padding:0 5px;"
    var rb = document.createElement('button')
    rb.innerHTML = ">"
    rb.style = "padding:0 5px;"
    div.style = "position: absolute;top:20px;width:80px;height:20px;"
    input.value = (type=="y") ? cyear : cmonth
    function update(){
      calendarMain.lastElementChild.remove()
      calendarMain.appendChild(createCalendarDays(tyear,tmonth))
    }
    if (type == "y"){
      div.style.left = "10px"
      lb.onclick = function(){
        input.value -= 1
        tyear = parseInt(input.value);
        update()
      }
      rb.onclick = function(){
        input.value = parseInt(input.value) + 1
        tyear = parseInt(input.value);
        update()
      }
    }else{
      div.style.right = "10px"
      lb.onclick = function(){
        if (parseInt(input.value) > 1){
          input.value -= 1
          tmonth = parseInt(input.value);
          update()
        }
      }
      rb.onclick = function(){
        if(parseInt(input.value) < 12){
          input.value = parseInt(input.value) + 1
          tmonth = parseInt(input.value);
          update()
        }
      }
    }
    div.appendChild(lb)
    div.appendChild(input)
    div.appendChild(rb)
    return div
  }

  function createCalendarDays(y,m,d){
    var div = document.createElement('div')
    div.style = calendarDaysStyle
    var weekds = ["日","一","二","三","四","五","六"]
    for(var j = 0; j < 7; j++){
      day = document.createElement('div')
      day.style = calendarDayStyle
      day.innerHTML = weekds[j]
      div.appendChild(day)
    }
    //empty block
    for(var j = whatDayforFirstDay(y,m); j>0;j--){
      day = document.createElement('div')
      day.style = calendarDayStyle
      day.innerHTML = '.'
      div.appendChild(day)
    }
    //days
    for(var i = 1; i<daysInMonth(y,m)+1; i++){
      day = document.createElement('div')
      day.style = calendarDayStyle
      if (y==cyear && m==cmonth && i==cday){
        day.style.color = "blue"
      }
      day.onclick = (function(i){
        return function(){
          calendarInput.value = y+'/'+m+'/'+i
        }
      })(i)
      day.innerHTML = i
      div.appendChild(day)
    }
    return div
  }

  //helper function
  function isleapYear(year){
    return (year % 4 === 0 && year % 100 !=0) || (year % 400) === 0
  }
  //how much days in a specific month
  function daysInMonth(year, month){
    switch(month){
      case 4:
      case 6:
      case 9:
      case 11:
      return 30;
      case 2:
      return isleapYear(year) ? 29 : 28
      default:
      return 31;
    }
  }
  function whatDayforFirstDay(year, month){
    var day = new Date(year, month-1, 1)
    return day.getDay()  //1 mon; 0 sun;
  }
  return createCalendar
})()
