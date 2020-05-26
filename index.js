

const STORE = [
    {
        question: '1) How many digits are in the number 300.00?',
        answers: [ '3' , '1' , '5','6' ],
        correct: 2,
    },
    {
        question: '2)	When we fully simplify 16/100 we get?',
        answers: ['4/10','2/5','2/50','4/25'],
        correct: 3,
    },
    {
        question: '3)	The area of a square of a side length 10 meters is?',
        answers: ['40', '90', '20' , '100'],
        correct: 3,
    }, 
    {
        question:'4)	What is the perimeter of a rectangle of length 7 cm and width 6 cm?',
        answers: ['26', '13', '20', '42'],
        correct: 0,
    },
    {
        question: '5)	The volume of a box of length 3 meters, width 6 meters and height 5 meters is?',
        answers: ['14','89','33','90'],
        correct: 3,
    }
]

function startButton() {
    $('.altBox').hide();
    $('.startButton').on('click', function(event) {
        console.log('starting quiz')
        $('.start-page').hide();
        $('.questionNumber').text(1);
        $('.renderQuestion').show();
        $('.renderQuestion').prepend(generateQuestion());

        
        
        
    })
}
let score = 0;
let questionNumber = 0;
function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createQuestion(questionNumber);
    } else {
        $('.renderQuestion').hide();
        finalPage();
        $('.questionNumber').text(5);
    }
  }
  function updateScore(){
    score++;
    $('.score').text(score);
  }
function updateQuestion() {
questionNumber++;
$('.questionNumber').text(questionNumber);
}

//creates html for the question and answers
function createQuestion(questionIndex) {
let quizBox = $(`        
<form>
<section class="questionBox quizBox">
    <span alt=${STORE[questionIndex].question} class="question">${STORE[questionIndex].question}</span>
    <section class="button-section">
    </section>
</section>
</form>`);

let questionSelector = $(quizBox).find('.button-section');
STORE[questionIndex].answers.forEach(function (answerVal, answerId) {
    
    $(`
    <input type="button"  name="button" id="${answerId}" alt=${answerVal} value=${answerVal} class="button2 answers"></button>
`).appendTo(questionSelector);
});
return quizBox;
}

function clickOnAnswer(){
    
$('.quiz').on('click', '.answers', function(event) {
    
    event.preventDefault();
    $('.renderQuestion').hide();
    $('.responseBox').show();
    let selected = this.id;
    let correct = STORE[questionNumber].correct;
    console.log(this.id);
    const button = document.querySelector('button');
    if( selected == correct)
    {
        correctAnswer();
    }
   else {
       wrongAnswer();
   }
});
}

function correctAnswer(){
    console.log('running correctAnswer');

    $('.responseBox').html(`            
    <section>
    <h1 class="correct">Correct!</h1>
    <button class="button3" type="button">Next</button>
</section>
    `)
    updateScore();
}


function wrongAnswer(){
    console.log('running wrongAnswer')
    $('.responseBox').html(`            
    <section>
    <h1 class="correct">Incorrect!</h1>
    <button class="button3 next" type="button">Next</button>
</section>
    `)
}
function nextQuestion() {
    $('.quiz').on('click', '.button3' , function(event) {
        $('.altBox').hide();
        $('.renderQuestion').show();
        updateQuestion();
        $('.renderQuestion section').replaceWith(generateQuestion());
    });
}
function finalPage(){
    $('.final').show();

const great = [
    'Good Job!',

];
const good = [
    'That was Okay, but you can do better'
];
const bad = [
    'you did bad'
];
if(score >= 5) {
    array = great;
}
else if(score <5 && score >= 2){
array = good;
}
else{
    array = bad;
}
    return $('.final').html(`
    <h1 class="final">${array[0]}</h1>
    <button class="restartButton" type="button">Play Again</button>

    `)
}
function restartQuiz() {
    $('.quiz').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.start-page').show();
    });
  }
function make(){
    startButton();
    generateQuestion();
    clickOnAnswer();
    nextQuestion();
    restartQuiz();
}
$(make);
