let categories = [];
// let categoryIDs = [];
let clues = [];
let catId=[];
const table = document.getElementById("game-table");


async function getCategoryIds() {
    let response = await axios.get('http://jservice.io/api/categories?count=20');
    console.log(response.data);
    NUM_CATEGORIES = _.sampleSize(response.data, [n = 6]);

    for (let num of NUM_CATEGORIES) {
        // let categoryID = num.id;
        catId.push(num.id); 
    }
    return catId;
};
// getCategoryIds();

async function getCategory() {
    for (let id of catId) {
      let response = await axios.get(`http://jservice.io/api/clues?category=${id}`);
      let clueArray = response.data;
  
      let sampledClues = _.sampleSize(clueArray, 5); // Select 5 random clues
      let categoryClues = sampledClues.map(clue => ({
        question: clue.question,
        answer: clue.answer,
        showing: null,
      }));
  
      let category = {
        title: clueArray[0].category.title,
        clueArray: categoryClues,
        showing: null,
      };
  
      categories.push(category);
    }
    
    return categories;
  }
//   getCategory();
  
  function fillTable() {
    const table = document.getElementById("game-table");
    
    // Create table header row with category titles
    const headerRow = document.createElement("tr");
    for (let i = 0; i < 6; i++) {
      const th = document.createElement("th");
      th.textContent = categories[i].title;
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
    
    // Create table rows with question cells
    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 6; j++) {
        const cell = document.createElement("td");
        const question = categories[j].clueArray[i].question;
        const answer = categories[j].clueArray[i].answer;
        
        cell.textContent = "?";
        cell.setAttribute("data-question", question);
        cell.setAttribute("data-answer", answer);
        cell.addEventListener("click", handleCellClick);
        
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  function handleCellClick(event) {
    const cell = event.target;
    
    if (cell.textContent === "?") {
      cell.textContent = cell.getAttribute("data-question");
    } else if (cell.textContent === cell.getAttribute("data-question")) {
      cell.textContent = cell.getAttribute("data-answer");
      cell.removeEventListener("click", handleCellClick);
    }
  }

  async function main() {
    const catIds = await getCategoryIds();
    const categories = await getCategory(catIds);
    fillTable();
  }


function resetGame() {
  categories = []; // Clear the existing categories array
  catId = []; // Clear the existing category IDs array
  table.innerHTML = ""; // Clear the table contents

  // Call the necessary functions to start the game again
  getCategoryIds().then(() => getCategory().then(() => fillTable()));
}
document.getElementById("reset-button").addEventListener("click", resetGame);
  
  main();

  //checklist: 
  //make board
  //access api and make array of categories as well as clues/questions?
  //add to gameboard on click
  //reset button
  //css
  
