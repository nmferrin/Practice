$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck'; 
 
 // 1
    async function part1() {
        await $.getJSON(`${baseURL}/new/draw/`)
        .then(response => {
            let { suit, value } = response.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        })
        .catch(error => {
            console.error('Error in part1:', error);
        });
    }

  // 2
// ...

// 2
async function part2() {
    let firstCardData;
    $.getJSON(`${baseURL}/new/draw/`)
        .then(data => {
            firstCardData = data;
            let deckId = firstCardData.deck_id;
            return $.getJSON(`${baseURL}/${deckId}/draw/`);
        })
        .then(secondCardData => {
            [firstCardData, secondCardData].forEach(card => {
                let { suit, value } = card.cards[0];
                console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
            });
        })
        .catch(error => {
            console.error('Error in part2:', error);
        });
}

// ...



    // 3.
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');
    
        let deckData = await axios.get(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
            let cardData = await axios.get(`${baseURL}/${deckData.data.deck_id}/draw/`);
            let cardSrc = cardData.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.data.remaining === 0) $btn.remove();
        });
    }
    
});