window.onload = function(){
    currentLocationWeather()
}

//take the city and put it as a val into the fetch
  let getWeatherForCity = () => {
    var city = $("#location-input").val()
   

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=c01667bce05c8f9db1f572a1b0d317ec`)
            .then(res => res.json())
            .then(res => {
                console.log (res);
                let timezoneOffset = res.city.timezone;
                let currentTime = new Date(); 
                let utcTime =
                  currentTime.getTime() + currentTime.getTimezoneOffset() * 60000; 
                let localTime = new Date(utcTime + timezoneOffset * 1000); 
          
                console.log(localTime);
                // Display local time
                let daysOfWeek = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
                let dayOfWeek = daysOfWeek[localTime.getDay()];
                let time = localTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                });

                $("#datetime").text(`${dayOfWeek} ${time}`);
      $(".dayOne").text(`${daysOfWeek[(localTime.getDay() + 1) % 7]}`);
      $(".dayTwo").text(`${daysOfWeek[(localTime.getDay() + 2) % 7]}`);
      $(".dayThree").text(`${daysOfWeek[(localTime.getDay() + 3) % 7]}`);
      $(".dayFour").text(`${daysOfWeek[(localTime.getDay() + 4) % 7]}`);
                commonWeatherResultProcessing(res)
            })
            .catch(error => {
                console.log(error.message);
                
            });      
    }
$("#location-input").keyup((event) => {
        if (event.key === "Enter") {
            getWeatherForCity();
        }
});



//current location function 
let currentLocationWeather = () => {
    
    navigator.geolocation.getCurrentPosition((position) => {  //added this: &units=metric to take celsius instead of fahrenheit
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=c01667bce05c8f9db1f572a1b0d317ec`).then((data) => {
            return data.json()
         }).then((res) => {
            console.log (res)

            let timezoneOffset = res.city.timezone;
            let currentTime = new Date(); 
            let utcTime =
              currentTime.getTime() + currentTime.getTimezoneOffset() * 60000; 
            let localTime = new Date(utcTime + timezoneOffset * 1000); 
      
            console.log(localTime);
            // Display local time
            let daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            let dayOfWeek = daysOfWeek[localTime.getDay()];
            let time = localTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            });

            $("#datetime").text(`${dayOfWeek} ${time}`);
  $(".dayOne").text(`${daysOfWeek[(localTime.getDay() + 1) % 7]}`);
  $(".dayTwo").text(`${daysOfWeek[(localTime.getDay() + 2) % 7]}`);
  $(".dayThree").text(`${daysOfWeek[(localTime.getDay() + 3) % 7]}`);
  $(".dayFour").text(`${daysOfWeek[(localTime.getDay() + 4) % 7]}`);
            commonWeatherResultProcessing(res)
         })
      }),
     function error (err) {
        console.log (err)
     }
    
}
//weather in current location 
$(".current-location").click(currentLocationWeather);


let commonWeatherResultProcessing = (res) => {
   
 let icon = res.list[0].weather[0].icon
 $(".city-name").text(res.city.name + ", " + res.city.country)
 $(".temperature").text((res.list[0].main.temp).toFixed(0))
 $(".weather-description").text(res.list[0].weather[0].main)
 $(".feels-like-content").text(":  " + (res.list[0].main.feels_like).toFixed(0)  + " \u00B0");
$(".humidity-content").text(":  " + res.list[0].main.humidity + "%");
 $(".tempOne").text((res.list[8].main.temp).toFixed(0) + " \u00B0" )
   $(".tempTwo").text((res.list[16].main.temp).toFixed(0) + " \u00B0")
   $(".tempThree").text((res.list[24].main.temp_min).toFixed(0) + " \u00B0")
   $(".tempFour").text((res.list[32].main.temp_min).toFixed(0) + " \u00B0")
   $(".descriptionOne").text(res.list[8].weather[0].description)
   $(".descriptionTwo").text(res.list[16].weather[0].description)
   $(".descriptionThree").text(res.list[24].weather[0].description)
   $(".descriptionFour").text(res.list[32].weather[0].description)
   
 if (icon == "01d") {
   $(".img").attr("src", "./FS-Project-Weather-App/sun.png")
   }
   else if (icon == "01n") {
       $(".img").attr("src", "./FS-Project-Weather-App/moon.png")
   }
   else if (icon == "02d"){
       $(".img").attr("src", "./FS-Project-Weather-App/clouds-and-sun.png")
    }
       else if (icon == "02n") {
           $(".img").attr("src", "./FS-Project-Weather-App/cloudy-night.png")
       }
   else if (icon =="10n" || icon == "09n" || icon == "09d"  || icon == "10d"){
       $(".img").attr("src", "./FS-Project-Weather-App/rain.png")
   }
   else if (icon =="03n" || icon == "04n" || icon == "03d"  || icon == "04d"){
       $(".img").attr("src", "./FS-Project-Weather-App/cloud.png")
   }
   else if (icon == "11d" || icon == "11n") {
       $(".img").attr("src", "./FS-Project-Weather-App/storm.png")
   }
   else if (icon == "13d" || icon == "13n"){
       $(".img").attr("src", "./FS-Project-Weather-App/snowflake.png")
    }
    else if (icon == "50d" || icon == "50n") {
       $(".img").attr("src", "./FS-Project-Weather-App/wind.png")
   }
       let DayOneIcon = res.list[8].weather[0].icon
       if (DayOneIcon == "01d" || DayOneIcon == "01n") {
           $(".iconOne").attr("src", "./FS-Project-Weather-App/sun.png")
           }
           else if (DayOneIcon == "02d" || DayOneIcon == "02n"){
               $(".iconOne").attr("src", "./FS-Project-Weather-App/clouds-and-sun.png")
            }
           else if (DayOneIcon =="10n" || DayOneIcon == "09n" || DayOneIcon == "09d"  || DayOneIcon == "10d"){
               $(".iconOne").attr("src", "./FS-Project-Weather-App/rain.png")
           }
           else if (DayOneIcon =="03n" || DayOneIcon == "04n" || DayOneIcon == "03d"  || DayOneIcon == "04d"){
               $(".iconOne").attr("src", "./FS-Project-Weather-App/cloud.png")
           }
           else if (DayOneIcon == "11d" || DayOneIcon == "11n") {
               $(".iconOne").attr("src", "./FS-Project-Weather-App/storm.png")
           }
           else if (DayOneIcon == "13d" || DayOneIcon == "13n"){
               $(".iconOne").attr("src", "./FS-Project-Weather-App/snowflake.png")
            }
            else if (DayOneIcon == "50d" || DayOneIcon == "50n") {
               $(".iconOne").attr("src", "./FS-Project-Weather-App/wind.png")
           }

           let DayTwoIcon = res.list[16].weather[0].icon
           if (DayTwoIcon == "01d" || DayTwoIcon == "01n") {
               $(".iconTwo").attr("src", "./FS-Project-Weather-App/sun.png")
               }
               else if (DayTwoIcon == "02d" || DayTwoIcon == "02n"){
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/clouds-and-sun.png")
                }
               else if (DayTwoIcon =="10n" || DayTwoIcon == "09n" || DayTwoIcon == "09d"  || DayTwoIcon == "10d"){
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/rain.png")
               }
               else if (DayTwoIcon =="03n" || DayTwoIcon == "04n" || DayTwoIcon == "03d"  || DayTwoIcon == "04d"){
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/cloud.png")
               }
               else if (DayTwoIcon == "11d" || DayTwoIcon == "11n") {
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/storm.png")
               }
               else if (DayTwoIcon == "13d" || DayTwoIcon == "13n"){
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/snowflake.png")
                }
                else if (DayTwoIcon == "50d" || DayTwoIcon == "50n") {
                   $(".iconTwo").attr("src", "./FS-Project-Weather-App/wind.png")
               }

               
               let DayThreeIcon = res.list[24].weather[0].icon
               if (DayThreeIcon == "01d" || DayThreeIcon == "01n") {
                   $(".iconThree").attr("src", "./FS-Project-Weather-App/sun.png")
                   }
                   else if (DayThreeIcon == "02d" || DayThreeIcon == "02n"){
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/clouds-and-sun.png")
                    }
                   else if (DayThreeIcon =="10n" || DayThreeIcon == "09n" || DayThreeIcon == "09d"  || DayThreeIcon == "10d"){
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/rain.png")
                   }
                   else if (DayThreeIcon =="03n" || DayThreeIcon == "04n" || DayThreeIcon == "03d"  || DayThreeIcon == "04d"){
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/cloud.png")
                   }
                   else if (DayThreeIcon == "11d" || DayThreeIcon == "11n") {
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/storm.png")
                   }
                   else if (DayThreeIcon == "13d" || DayThreeIcon == "13n"){
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/snowflake.png")
                    }
                    else if (DayThreeIcon == "50d" || DayThreeIcon == "50n") {
                       $(".iconThree").attr("src", "./FS-Project-Weather-App/wind.png")
                   }

                   let DayFourIcon = res.list[32].weather[0].icon
                   if (DayFourIcon == "01d" || DayFourIcon == "01n") {
                       $(".iconFour").attr("src", "./FS-Project-Weather-App/sun.png")
                       }
                       else if (DayFourIcon == "02d" || DayFourIcon == "02n"){
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/clouds-and-sun.png")
                        }
                       else if (DayFourIcon =="10n" || DayFourIcon == "09n" || DayFourIcon == "09d"  || DayFourIcon == "10d"){
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/rain.png")
                       }
                       else if (DayFourIcon =="03n" || DayFourIcon == "04n" || DayFourIcon == "03d"  || DayFourIcon == "04d"){
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/cloud.png")
                       }
                       else if (DayFourIcon == "11d" || DayFourIcon == "11n") {
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/storm.png")
                       }
                       else if (DayFourIcon == "13d" || DayFourIcon == "13n"){
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/snowflake.png")
                        }
                        else if (DayFourIcon == "50d" || DayFourIcon == "50n") {
                           $(".iconFour").attr("src", "./FS-Project-Weather-App/wind.png")
                       }
}



  