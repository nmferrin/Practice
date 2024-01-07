// 1
let favNum = 8;
let baseURL = "http://numbersapi.com";


async function first() {
    // let url = "http://numbersapi.com/8?json";
    let promise = await $.getJSON(`${baseURL}/${favNum}?json`);
    console.log(promise);
}
first();

// 2
const nums = [6, 21, 90];
async function second() {
    let promise = await $.getJSON(`${baseURL}/${nums}?json`);
    console.log(promise);
}
second();

// 3
async function third() {
    for (let i = 1; i < 5; i++) {
          console.log (await $.getJSON(`${baseURL}/${favNum}?json`));
      }
}