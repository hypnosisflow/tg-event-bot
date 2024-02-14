// var pg = import("pg");
import "dotenv/config.js";
import pg from "pg";
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.DB_STRING;
//Can be found in the Details page
var client = new pg.Client(conString);

console.log("db connnection");

client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("dbfile", result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
  });
});

export default client;
