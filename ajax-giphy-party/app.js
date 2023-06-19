const input = document.querySelector("#giphy-input");
const submit = document.querySelector("#submit-button");
const gifContainer = document.querySelector("#gif-container");
const giphyKey = "qgST3fu6CS8ofEasBWdBCmBwR78Jc8Vd";
const removeButton = document.querySelector("#clear-button");

// console.log("Let's get this party started!");

function addGif(res) {
    let numResults = res.data.length;
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        src: res.data[randomIdx].images.original.url
}

async function giphyReq(){
    let search = input.val;
    let response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${giphyKey}`);
    console.log(response);
    addGif(response.data);
}

$("form").on("submit", async function(evt) {
    evt.preventDefault()
}
)};

// function display(gifs) {
    
// }


function removal(){
    removeButton.on("click", function() {
        gifContainer.empty();
    })
}

const form = document.querySelector("#giphy-search")
form.addEventListener("submit", giphyReq);