// quiz questions array
const quizArray = [
    {
        question: "Which food is from Mexico?",
        answers: ["Injera","Banga","Molletes","Pastilla"],
        correct: "2"
    },
    {
        question: "Which of the following plays is not written by Shakespeare?",
        answers: ["Julius Caesar","Antigone","Much Ado About Nothing"],
        correct: "1"
    },
    {
        question: "Which religion has the cow a holy animal?",
        answers: ["Buddhism","Judaism","Christianity","Hinduism","Muslim"],
        correct: "3"
    },
    {
        question: "Where is Champagne created?",
        answers: ["Champagne, France","Stockholm, Sweden"],
        correct: "0"
    },
    {
        question: "In which culture is coffee a religion?",
        answers: ["England","Kenya","Cuba"],
        correct: "2"
    },
    {
        question: "What sport is VERY popular in Spanish-speaking countries?",
        answers: ["Lacrosse","Football","Soccer"],
        correct: "2"
    }
]

//selectors
const quizContainer = document.querySelector('.quiz-container')

const questionText = document.querySelector('.questionText');

const questionAnswers = document.querySelector('.questionAnswers')

const submitBtn = document.querySelector('.submit');

const startQuizBtn = document.querySelector('.start-quiz');

const score = document.getElementById('score');
const emoji = document.getElementById('emoji');
const questionNumber = document.getElementById('questionNumber');
const time = document.getElementById('time');

let currentQuestion = 0;
let points = 0;
let answer = null;
let counter =30;
let interval;

//events
startQuizBtn.addEventListener('click', function(){
    startQuiz();
    startQuizBtn.style.display = 'none';
    submitBtn.style.display = 'block'
    questionNumber.style.display='block'
    score.style.display = 'none';
    emoji.style.display = 'none';
    points = 0;
})

submitBtn.addEventListener('click', nextQuestion);

//functions
function startQuiz() {
    questionNumber.textContent = `${currentQuestion+1}`+ '/' + `${quizArray.length}`
    let questionData = quizArray[currentQuestion];
    questionText.textContent = questionData.question

    for(let i=0; i<questionData.answers.length; i++) {
        const answerOption = document.createElement('li');
        answerOption.innerHTML = `
            <input type="radio" id="${i}" name="answer">
            <label class="questionAnswer" for="${i}">${questionData.answers[i]}</label>
        `
        questionAnswers.appendChild(answerOption);
    }
    answer=null;
    selection()
    interval = setInterval(timer,1000)
    time.style.display='block'
}

function selection() {
    const answerOptions = document.querySelectorAll('li')
    const inputs = document.querySelectorAll('input')
    inputs.forEach(function(input){
        input.addEventListener('click', function(){
            answer = this.id;
        })
    })
}

function nextQuestion(){
    if (!answer) {
        return
    }
    clearInterval(interval);
    counter =30;
    time.textContent=counter;
    if (answer === quizArray[currentQuestion].correct) {
        points++
    }
    if(currentQuestion === quizArray.length-1) {
        finishQuiz();
        return
    }
    currentQuestion++
    questionAnswers.textContent='';
    startQuiz();
    answer =''
}

function finishQuiz (){
    score.innerHTML = `
    You gave <span id="correct">${points}</span>  correct answers out of ${quizArray.length} questions.
    `
    if(points/quizArray.length >= 0.8) {
        emoji.innerHTML = '&#128526;';
    }
    if(points/quizArray.length >= 0.5 && points/quizArray.length < 0.8) {
        emoji.innerHTML = '&#128522;';
    }
    if(points/quizArray.length >= 0.1 && points/quizArray.length < 0.5) {
        emoji.innerHTML = '&#128549;';
    }
    if(points/quizArray.length < 0.1) {
        emoji.innerHTML = '&#128561;';
    }
    emoji.style.display='block'
    score.style.display='block';
    startQuizBtn.style.display = 'block';
    submitBtn.style.display = 'none'
    questionNumber.style.display='none';
    questionText.textContent = '';
    questionAnswers.textContent = '';
    currentQuestion = 0;
    time.style.display='none';
}

function timer() {
    counter--
    time.textContent = counter;
    if(counter>20) {
        time.style.backgroundColor='green';
    }
    if(counter>10 && counter<=20) {
        time.style.backgroundColor='yellowgreen';
    }
    if(counter<=10 & counter>0) {
        time.style.backgroundColor='red';
    }
    if(counter === 0 && currentQuestion === quizArray.length-1) {
        finishQuiz()
        return
    }
    if(counter === 0) {
        clearInterval(interval);
        counter = 30;
        currentQuestion++;
        questionText.textContent ='';
        questionAnswers.textContent='';
        setTimeout(startQuiz,1000)
        answer =''
    }
}
