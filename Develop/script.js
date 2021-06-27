var workDay = {
    "8:00 AM": "",
    "9:00 AM": "",
    "10:00 AM": "",
    "11:00 AM": "",
    "12:00 PM": "",
    "1:00 PM": "",
    "2:00 PM": "",
    "3:00 PM": "",
    "4:00 PM": "",
    "5:00 PM": "",
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('workDay')) {
      updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })
  

 
  var counter = 1;
  for(const property in workDay) {
    var textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    var timeId = "#time" + counter;
    var presentHour = moment().hour();
    var timeString = $(timeId).text();
    var timeNumber = hourNumberFromHourString(timeString);  
    if(timeNumber < presentHour) {
      $(textEntry).addClass("past");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future");
    } else {
      $(textEntry).addClass("present");
    }
    counter ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });
  
  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "8:00 AM": return 8;
      case "9:00 AM": return 9;
      case "10:00 AM": return 10;
      case "11:00 AM": return 11;
      case "12:00 PM": return 12;
      case "1:00 PM": return 13;
      case "2:00 PM": return 14;
      case "3:00 PM": return 15;
      case "4:00 PM": return 16;
      case "5:00 PM": return 17;
    }
  }
  
//   function loadCorrectDataset() {
//     result = localStorage.getItem('workDay')
//     return (result ? result : workDay);
//   }
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }

  $(document).ready(function() {
    var interval = setInterval(function() {
        $('#currentDay').html(moment().format('dddd') +", "+ moment().format('MMMM Do YYYY') + ', '
                            +  moment().format('hh:mm:ss A'));
    }, 100);
  });

function clearbtn() {
    localStorage.clear();
    location.reload();
    // document.getElementsByTagName("textarea").innerHTML = "  ";
}
