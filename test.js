require("dotenv").config();
require("./utils/date");

const date = new Date();

const weeks = process.env.PRESENCE_WEEKS.split(",");

console.log(weeks.indexOf(date.getWeek().toString()) !== -1);
