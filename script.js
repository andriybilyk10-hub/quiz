document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },
        
        {
            question: "Столиця США?",
            answers: ["Нью-Йорк", "Вашингтон", "Каліфорнія", "Верджинія"],
            correct: 1
        },
        
        {
            question: "Скільки буде: 3+3*3?",
            answers: ["18", "12", "15", "10"],
            correct: 1
        },
        
        {
            question: "Як називають пітахаю?",
            answers: ["Драконий фрукт", "Колючка", "Cмачний фрукт", "Водяний фрукт"],
            correct: 0
        },
        
        {
            question: "Який океан найбільший у світі?",
            answers: ["Атлантичний", "Індійський", "Тихий", "Північний Льодовитий"],
            correct: 2
        },
        
        {
            question: "Де знаходиться пустеля Сахара?",
            answers: ["В Азії", "В Австралії", "В Південній Америці", "В Африці"],
            correct: 3
        },
        
        {
            question: "Де знаходиться гора Фудзі",
            answers: ["В Японії", "В Америці", "В Китаї", "В Іспанії"],
            correct: 0
        },
        
        {
            question: "Який океан найбільший у світі?",
            answers: ["Атлантичний", "Індійський", "Тихий", "Північний Льодовитий"],
            correct: 2
        },
        
        
        {
            question: "Що бджоли збирають із квітів?",
            answers: ["Мед", "Нектар", "Воду", "Цукор"],
            correct: 1
        },
        
        
        {
            question: "Столиця Японії?",
            answers: ["Нью-Йорк", "Токіо", "Київ", "Тайвань"],
            correct: 1
        },
        
    ];

    
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const scoreDisplay = document.getElementById('score-display');
    const resultText = document.getElementById('result-text');

    
    const timeLeftSpan = document.getElementById('time-left');
    const timerBar = document.getElementById('timer-bar');

    let questionIndex = 0;
    let score = 0;

    
    let timerInterval;
    const TIME_LIMIT = 15; 
    let currentTime = TIME_LIMIT;

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        questionIndex = 0;
        score = 0;
        scoreDisplay.textContent = 'Бали: 0';

        showQuestion();
    }

    function showQuestion() {
        
        answersContainer.innerHTML = '';
        questionText.textContent = questions[questionIndex].question;

        
        questions[questionIndex].answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.textContent = answer;
            btn.classList.add('answer-btn');
            btn.onclick = () => checkAnswer(index);
            answersContainer.appendChild(btn);
        });

        
        startTimer();
    }

    
    function startTimer() {
        clearInterval(timerInterval); 
        currentTime = TIME_LIMIT;
        updateTimerUI();

        timerInterval = setInterval(() => {
            currentTime--;
            updateTimerUI();

            if (currentTime <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    }

    function updateTimerUI() {
        timeLeftSpan.textContent = currentTime;
        
        const percent = (currentTime / TIME_LIMIT) * 100;
        timerBar.style.width = `${percent}%`;

        
        if (percent <= 30) {
            timerBar.classList.add('danger');
        } else {
            timerBar.classList.remove('danger');
        }
    }

    function handleTimeOut() {
       
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        
        const correctIndex = questions[questionIndex].correct;
        buttons[correctIndex].classList.add('correct'); 

       
        setTimeout(nextQuestion, 1500);
    }
    

    function checkAnswer(index) {
        
        clearInterval(timerInterval);

        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        if (index === questions[questionIndex].correct) {
            buttons[index].classList.add('correct');
            score++;
            scoreDisplay.textContent = `Бали: ${score}`;
        } else {
            buttons[index].classList.add('wrong');
            
            buttons[questions[questionIndex].correct].classList.add('correct');
        }

        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            clearInterval(timerInterval); 
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        const percent = Math.round((score / questions.length) * 100);
        resultText.textContent =
            `Твій результат: ${score} з ${questions.length} (${percent}%)`;
    }
    
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});