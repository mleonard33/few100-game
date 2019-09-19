import { getRandomInt } from './utils';
let squares: NodeListOf<HTMLDivElement>;
let header: HTMLElement;
let playAgainButton: HTMLElement;
export function runApp() {
    // we are going to need a secret number 1 - 6
    const secretNumber = getRandomInt(1, 6);
    // mark one of the squares as the secret square.
    squares = document.querySelectorAll('.square');
    header = document.querySelector('header>h1');
    playAgainButton = document.getElementById('playAgain');
    playAgainButton.addEventListener('click', playAgain);
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            sq.dataset.winner = 'true';
        }
        currentSquare++;
        sq.addEventListener('click', handleClick);
    });
}


function handleClick() {
    const isWinner = this.dataset.winner === 'true';
    const clickedSquare = this as HTMLDivElement;
    if (isWinner) {
        clickedSquare.classList.add('winner');
        header.innerText = 'YOU WIN! OMG!!';
        gameOver();
    } else {
        clickedSquare.classList.add('loser');
        const allDone = document.querySelectorAll('.square.loser').length === 5;
        if (allDone) {
            header.innerText = 'OMG YOU LOSE SO HARD!';
            gameOver();
        }
    }




    function gameOver() {
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
            }
            s.removeEventListener('click', handleClick);
        });

        playAgainButton.hidden = false;
    }
}
function playAgain() {
    this.hidden = true;
    squares.forEach(s => {
        s.classList.remove('winner');
        s.classList.remove('loser');
        s.dataset.winner = 'false';
        header.innerText = 'Play the Guessing Game!';
        runApp();
    });
}
