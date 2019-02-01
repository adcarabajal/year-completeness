'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/percentage/:year', (req, res) => {
  const year = parseInt(req.param.year);
  
  res.send({
    days_of_a_year: days_of_a_year(year),
    days_since: getDay(),
    percentage: ((getDay() * 100) / days_of_a_year(year)).toFixed(2)
  });
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

function getDay() { 
  const today = new Date();
  return Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000); 
}

function days_of_a_year(year)
{
  return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}