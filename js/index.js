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
//AJAX Carga Busqueda
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

//AJAX Carga Ciudades
function ciudades(){
  $.ajax({
    url: './backend/ciudades.php',
    type: 'post',
    dataType:'json',
    data: {},
    complete: function (response,data) {
      $('#selectCiudad').html(response.responseText);
    },
    error: function () {
      $('#selectCiudad').html('Bummer: there was an error!');
    }
  });
}

//AJAX Carga Tipos
function tipos(){
  $.ajax({
    url: './backend/tipos.php',
    type: 'post',
    dataType:'json',
    data: {},
    complete: function (response,data) {
      $('#selectTipo').html(response.responseText);
    },
    error: function () {
      $('#selectTipo').html('Bummer: there was an error!');
    }
  });
}
inicializarSlider();
playVideoOnScroll();
ciudades();
tipos();

$( document ).ready(function() {
  console.log( "document loaded" );

  $('select').material_select();

  $("#mostrarTodos").click(function(){
      buscar("","","0","100000");
  });

  $(document).on('submit', '#formulario', function(e) {
    e.preventDefault();
    var type = $("#selectTipo").val();
    var city = $("#selectCiudad").val();
    var minimo = $(".irs-from").text();
    var maximo = $(".irs-to").text();
    minimo = minimo.replace("$","");
    minimo = minimo.replace(" ","");
    maximo = maximo.replace("$","");
    maximo = maximo.replace(" ","");
    buscar(city,type,minimo,maximo);
  });
});
