/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
//AJAX
function buscar(city,type,min,max){
  $.ajax({
    url: './backend/cargaTodo.php',
    type: 'post',
    dataType:'json',
    data: { "city": city,
            "type": type,
            "min": min,
            "max": max,
          },
    complete: function (response,data) {
      $('#output').html(response.responseText);
    },
    error: function () {
      $('#output').html('Bummer: there was an error!');
    }
  });
}

inicializarSlider();
playVideoOnScroll();

$( document ).ready(function() {
  console.log( "document loaded" );
  $("#mostrarTodos").click(function(){
      buscar("","","0","100000");
  });
/*  $("#submitButton").click(function(){
      var minimo = $(".irs-from").text();
      var maximo = $(".irs-to").text();
      minimo = minimo.replace("$","");
      minimo = minimo.replace(" ","");
      maximo = maximo.replace("$","");
      maximo = maximo.replace(" ","");
      buscar("","",minimo,maximo);
  });*/
});
