const datesObj = {
  date1 : {
    day : 0,
    month : 0,
    year : 0,
    status : false
  },
    
  date2 : {
      day : 0,
      month : 0,
      year : 0,
      status : false
    }
};

const dateChange = (e) => {
  const enteredValue = e.target.value.trim();
  const dateKey = e.target.id;
  
  if (!checkForCharacters(enteredValue)) {
    datesObj[dateKey].status = false;
    document.getElementById('error_'+dateKey).innerHTML = 'Only numbers are allowed';
    return;
  }
  
  captureDates(enteredValue, dateKey);
}

const checkForCharacters = (val) => {
  const reg = /^(?=.*\d)[\d ]+$/;
  return reg.test(val);
}

const captureDates = (val, dateKey) => {
  const dateObj = datesObj[dateKey];
  const d = val.split(' ');
  
  if(d.length != 3){
    console.log(dateKey);
    document.getElementById('error_'+dateKey).innerHTML = 'Enter date in proper format(DD MM YYYY).';
    datesObj[dateKey].status = false;
    return;
  }
  
  dateObj.day = Number(d[0]);
  dateObj.month = Number(d[1]);
  dateObj.year = Number(d[2]);
  
  if(dateObj.year > 2100 || dateObj.year < 1900) {
    document.getElementById('error_'+dateKey).innerHTML = 'Year must be in between 1900 - 2100.';
    dateObj.status = false;
    return;
  }
    
  if (!verifyMonth(dateObj.month)){
    document.getElementById('error_'+dateKey).innerHTML = 'Month must be in between 1 - 12.';    
    dateObj.status = false;
    return;
  };
  
  const dayStatus = verifyDay(dateObj.day, dateObj.month, dateObj.year);
  if (!dayStatus[0]){
    console.log(dateKey);
    document.getElementById('error_'+dateKey).innerHTML = dayStatus[1];    
    dateObj.status = false;
    return;
  };
  dateObj.status = true;
  document.getElementById('error_'+dateKey).innerHTML = '';    
}

const verifyMonth = (month) => {
  if((month > 12) || (month < 1)) {
    return (false);
  }else{
    return (true);
  }
}

const verifyDay = (day, month, year) => {
  const monthDaysMap = getMonthDaysMap(year);
  
  if(day > monthDaysMap[month] || day < 1){
    return([false, "Date must be between 1 to" + monthDaysMap[month]]);
  }else{
    return ([true]);
  }
}

const getMonthDaysMap = (year) => {
  return {
    '1' : 31,
    '2' : getFebDays(year),
    '3' : 31,
    '4' : 30,
    '5' : 31,
    '6' : 30,
    '7' : 31,
    '8' : 31,
    '9' : 30,
    '10' : 31,
    '11' : 30,
    '12' : 31
  }
}

const getFebDays = (year) => {
  if (isLeapYear(year)){
    return(29);
  }
  return 28;
}

const isLeapYear = (year) => ((year%4 === 0  && year%400 === 0) || (year%4 === 0 && year%100 !== 0));

const captureDifference = () => {
  let days = 0;
  const date1 = datesObj.date1;
  const date2 = datesObj.date2;
  if (date1.status && date2.status) {
    const dates = getLargerDate(date1, date2);
    const d1 = dates[0];
    const d2 = dates[1];
// consider all years    
    for(i = d1.year; i <= d2.year; i++){
      if(isLeapYear(i)){
        days+= 366;
      } else {
        days+= 365;
      }
    }
//    calculate days passed in d1 year
    for(i = 1; i < d1.month; i++){
      days-= getMonthDaysMap(d1.year)[i];
    }
//     removing days
    days-= d1.day
    
//    calculate days passed in d2 year
    for(i = d2.month; i <= 12; i++){
      days-= getMonthDaysMap(d2.year)[i]
    }
//     removing days
    days+= d2.day
    
    document.getElementById('date1Result').innerHTML = String(date1.day)+'/'+date1.month+'/'+date1.year;
    document.getElementById('date2Result').innerHTML = String(date2.day)+'/'+date2.month+'/'+date2.year;
    document.getElementById('result').innerHTML = days;
  } else {
    alert('Update the date.');
  }
}

const getLargerDate = (d1, d2) => {
//   year
  if(d1.year < d2.year){
    return [d1, d2];
  } else if (d1.year > d2.year){
    return [d2, d1];
  } else {
//     month
    if (d1.month < d2.month) {
      return [d1, d2];
    } else if (d1.month > d2.month) {
      return [d2, d1];
    } else {
//       day
       if (d1.day < d2.day) {
         return [d1, d2];
       } else {
         return [d2, d1];
       } 
    }
  }
}
