'use strict';

const express      = require('express');
const path         = require('path');
const serveStatic  = require('serve-static');
const PORT         = process.env.PORT || 8080
const HOST         = '0.0.0.0';

// App
const app = express();

// app.use(errorhandler);

app.use(serveStatic(path.join(__dirname, '/')));

app.get('/percentage/:year', (req, res) => {
  const year           = parseInt(req.params.year);
  const days_of_a_year = daysOfayear(year);
  const days_since     = getDay(year) < 0 ? 0 : getDay(year);
  const percentage     = days_since >= 365 ? 100 : ((days_since * 100) / days_of_a_year).toFixed(2);

  res.send({
    year,
    days_of_a_year,
    days_since,
    percentage
  });
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

function getDay(year) { 
  const today = new Date();

  return Math.ceil((today - new Date(year,0,1)) / 86400000); 
}

function daysOfayear(year)
{
  return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}