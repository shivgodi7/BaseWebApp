$(document).ready(function(){
 // getWeather();
})

function getWeather(searchQuery){
  url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=metric&appid="+apiKey;
  
  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("");

  $.ajax(url, {success: function(data){
    console.log(data);
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
  }, error: function(error){
      $(".error-message").text("An error occured");
  }})
}

function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
 }




function getCurrencies(){
  url = "https://api.coinbase.com/v2/currencies";
  
  $.ajax(url, {success: function(data){
    console.log(data);
    $(".crypto").text("");
    $('.crypto').append('<h2>Currency ID             Currency Name</h2>');  
    for(let i = 0; i < data.data.length; i++){
      $('.crypto').append('<div>' + data.data[i]['id'] + ' : ' + data.data[i]['name'] + '</div>');
    }
  }, error: function(error){
    console.log(error);
    $(".crypto").text("An error occured");
  }})
 }

 function getCurrenciesIds(){
  url = "https://api.coinbase.com/v2/currencies";
  var ids = [];
  $.ajax(url, {success: function(data){
    //$(".crypto").text(data.name);
    //console.log(data);
    for(let i = 0; i < data.data.length; i++){
      ids.push(data.data[i]['id']);
    }
    //console.log(ids);
  }, error: function(error){
    console.log(error);
    $(".crypto").text("An error occured");
    return null;
  }}); 
  return ids; 
}

 function getExRates(){

  ids = getCurrenciesIds();
  //console.log(ids);  

  url = "https://api.coinbase.com/v2/exchange-rates";
  $(".crypto").text("");
  $('.crypto').append('<h2>Exchange Rates</h2>');
  $.ajax(url, {success: function(data){
    console.log(data);
    console.log(data.data);
    console.log(data.data.rates);

    for(let i = 0; i < ids.length; i++){
      $('.crypto').append('<div>' + ids[i] + ' : ' + data.data.rates[ids[i]] + '</div>');
    }
    
  }, error: function(error){
    console.log(error);
    $(".crypto").text("An error occured");
  }})
 }
