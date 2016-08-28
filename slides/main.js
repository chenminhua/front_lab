Presentation = (function(){
  var nanobar = new Nanobar({
    classname:"my-class",
    id: 'my-id',
    target: document.getElementById('myDivId')
  })

  return function(selector){
    var parent = document.querySelector(selector),
    slides = Array.prototype.filter.call(parent.children,function(el){return el.nodeName != 'SCRIPT'}),
    width = window.innerWidth,
    height = window.innerHeight,
    currentIndex = 0
    nanobar.go(100/(slides.length)*(currentIndex+1))
    slides.map(function(sl,i){
      console.log(micromarkdown.parse('# ok \n##ok'))
      console.log('# ok \n##ok')
      console.log(micromarkdown.parse($(sl).html()))
      console.log('# ok \n##ok' === micromarkdown.parse($(sl).html()))

      $(sl).html(micromarkdown.parse($(sl).html()))
      if(i !== 0){
        $(sl).css({position:"absolute"}).css({height: height,width:width,left:width})
      }else{
        $(sl).css({position:"absolute"}).css({height:height, width:width, left:0})
      }

    })

    function next(){
      if(currentIndex<slides.length-1){
        $(slides[currentIndex]).animate({left:-width},500)
        currentIndex++;
        nanobar.go(100/(slides.length)*(currentIndex+1))
        $(slides[currentIndex]).animate({left:0},500)
      }
    }

    function prev(){
      if(currentIndex>0){
        $(slides[currentIndex]).animate({left:width},500)
        currentIndex--;
        nanobar.go(100/(slides.length)*(currentIndex+1))
        $(slides[currentIndex]).animate({left:0},500)
      }
    }

    document.querySelector('body').onkeydown = function(e){
      if(e.keyCode === 39){
        e.preventDefault()
        next()
      }if(e.keyCode === 37){
        e.preventDefault()
        prev()
      }
    }

  }
})()
