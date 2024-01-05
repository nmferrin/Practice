// 1
let favNum = 8;
let baseURL = "http://numbersapi.com";


function first() {
    // let url = "http://numbersapi.com/8?json";
    let promise = axios.get(`${url}/${favNum}?json`);
    console.log(promise);
}
first();

// 2
const nums = [6, 21, 90];
function second() {
    let promise = axios.get(`${url}/${nums}?json`);
    console.log(promise);
}
second();

// 3
function third() {
    for (let i = 1; i < 5; i++) {
          console.log (axios.get(`${url}/${favNum}?json`));
      }
}