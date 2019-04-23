/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values 
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    gussesLeft = 3 ;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again evenr listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess 
guessBtn.addEventListener('click', function(){
    let guess = parseInt((guessInput.value));
    
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        // Wrong number
        gussesLeft -= 1;

        if(gussesLeft === 0) {
            // game over - lost 

            gameOver(false, `Game over, YOU LOST!. the correct number wsa ${winningNum}`);

        } else{
            // Change boarder color
            guessInput.style.borderColor = 'red';

             //Clear input
             guessInput.value = '';

            // Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${gussesLeft} guesses left `);

           
        }
    }

});

//Game over
function gameOver(won, msg){
    let color;
    won == true ? color = 'green' : color = 'red' ;

    // Disable input 
    guessInput.disabled = true ; 
    // Change boarder color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color); 

    // Play Again ? 
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Get Winning Number
function getRandomNum(min, max){
    
 return Math.floor (Math.random() * (max - min + 1) + min);

}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}