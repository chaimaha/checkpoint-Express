// a middleware function takes 3 parameters
// req + res +next
// si la condition est vrai
// next to the callback function
// else the middleware send the the response
let current = new Date();

let cTime =
  current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
let dateTime = cTime;
console.log(dateTime);
var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];
console.log(n);
const testDate = () => {
  if (n !== "Saturday" && n !== "Sunday" && 9 < current.getHours() < 17) {
    console.log("true");
    return true;
  } else {
    return false;
  }
};
// const auth = () => {
//   if (testDate === true) console.log("ok");
//   else console.log("sorry");
// };

const IsAuth = (req, res, next) => {
  testDate();
  if (testDate() === true) {
    next();
  } else {
    res.status(401).send("not authorised");
  }
};
export default IsAuth;
