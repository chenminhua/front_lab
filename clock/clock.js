var createClock = function(size){
  var clock = document.createElement('div')
  clock.style = `width:${size}px;height:${size}px;border-radius:50%;position:relative;border: ${size/150}px solid #555;`

  //原点
  var dot = document.createElement('div')
  dot.style = `width:${size/30}px;height:${size/30}px;position:absolute;border-radius:50%;background:red;left:50%;top:50%;margin:-${size/60}px 0 0 -${size/60}px;`
  clock.appendChild(dot)
  //时针
  var hour = document.createElement('div');
  hour.style = `width:${size/50}px;height:32%;background:#000;left:50%;top:18%;position:absolute;margin:-${size/100}px 0 0 -${size/100}px; border-radius:${size/100}px;transform-origin:50% bottom;`
  clock.appendChild(hour);

  //分针
  var minute = document.createElement('div')
  minute.style = `width:${size/60}px;height:42%;background:orange;left:50%;top:8%;margin:-${size/120}px 0 0 -${size/120}px;position:absolute; border-radius:${size/120}px;transform-origin:50% bottom;`
  clock.appendChild(minute);

  //绘制秒针
  var second = document.createElement('div');
  second.style = "width:2px;height:60%;left:50%;top:0;margin:-1px 0 0 -1px; background: red; position:absolute; transform-origin:50% 83%;"
  clock.appendChild(second);

  setInterval(function(){
    var nowDate = new Date();
    var nowSecond = nowDate.getSeconds();
    var nowMinute = nowDate.getMinutes();
    var nowHour = nowDate.getHours();
    second.style.transform = 'rotate('+ nowSecond * 6 +'deg)';
    minute.style.transform = 'rotate('+ (nowMinute * 6 + nowSecond * 1/10)+ 'deg)';
    hour.style.transform = 'rotate('+(nowHour * 30 + 1/2 * nowMinute + 1/120 * nowSecond)+'deg)';
  },1000);
  return clock
}
