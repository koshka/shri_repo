$(document).ready(function(){
  $('#popout').hide();
  $('#trigger').click( function() {
    $("#popout").slideToggle();
     });
});

$(document).ready(function(){
  $('#popout1').hide();
  $('#trigger1').click( function() {
    $("#popout1").slideToggle();
     });
});


$(document).ready(function(){
  $('form').on('submit', function(){
    var result = true;
    var regexp_birth_year = /^19[0-9]{2}$/;
    alert(jQuery('textarea#a1-text').val());
    if(!regexp_birth_year.test($('textarea#a1-text').val())){
      alert("Неверный год рождения!");
      result = false;
    }
    var regexp_email=/^([+a-zA-Z0-9_\.-]+)(@|(\(at\)))([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,6})$/;
    if(!regexp_email.test($('#email').val())) {
      alert("Неверный email!");
      result = false;
    }
    var regexp_url=/^(([a-zA-Z]{3,8}:)?\/\/)?([\da-zA-Z-]+\.){1,2}([a-zA-Z]+\.)?[a-zA-Z]{2,6}(\/[\w\d\%\?\=\&\.\x23-]+)*(\.[a-zA-Z]{1,5})?\/?$/;
    if(!regexp_email.test($('#moikrug').val())) {
      alert("Неверная ссылка на Мой Круг!");
      result = false;
    }
  });
});