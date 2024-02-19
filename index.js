'use strict';

const mcqs = [
    {
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Rome'],
        answer: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        answer: 'Mars'
    },
    {
        question: 'What is 2 + 2?',
        options: ['2', '22', '4', '5'],
        answer: '4'
    },
    {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'H2SO4'],
        answer: 'H2O'
    },
    {
        question: 'Which is the largest mammal?',
        options: ['Elephant', 'Whale', 'Giraffe', 'Hippo'],
        answer: 'Whale'
    },
    {
        question: 'What is the tallest mountain in the world?',
        options: ['Mount Kilimanjaro', 'Everest', 'K2', 'Matterhorn'],
        answer: 'Everest'
    },
    {
        question: 'Capitcal of India?',
        options: ['Delhi', 'Mumbai', 'Rajasthan', 'Bihar'],
        answer: 'Delhi'
    },
    {
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Cu', 'Fe'],
        answer: 'Au'
    },
    {
        question: 'Which is the largest ocean?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific'],
        answer: 'Pacific'
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William_Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
        answer: 'William_Shakespeare'
    }
];

const form = document.querySelector('.quiz__form');
const formSec = document.querySelector('.quiz__main');
const quizQuestion = document.querySelector('.quiz__main__question');

const questionNumber = document.querySelector('.quiz__header__question-num');
let scoreEle = document.querySelector('.quiz__header-score-num');
let totalScore = 0

const markup = (i) => {
    const { options, question } = mcqs[i];
    quizQuestion.textContent = question;
    return `  <div class="quiz__main__option" data-index=${i}>
    <input type="radio" id="option1" name="option" value=${options[0]} />
    <label for="option1">${options[0]}</label>
</div>
<div class="quiz__main__option" data-index=${i}>
    <input type="radio" id="option2" value=${options[1]} name="option" />
    <label for="option2">${options[1]}</label>
</div>
<div class="quiz__main__option" data-index=${i}>
    <input type="radio" id="option3" value=${options[2]} name="option" />
    <label for="option3">${options[2]}</label>
</div>
<div class="quiz__main__option" data-index=${i}>
    <input type="radio" id="option4" value=${options[3]} name="option" />
    <label for="option4">${options[3]}</label>
</div>
<div class="quiz__main__submit">
    <button class="quiz__main__submit-btn">Next</button>
</div>
`
}

const overlayMarkup = () => {
    return `   <p class="overlay">
    <b><span class="">Total Score:</span><span class="displayScore">${totalScore}/10</span></b>
    <button class="restart">Restart</button>
</p>
    `
}


const optionsMarkup = markup(0);
form.innerHTML = '';
form.insertAdjacentHTML("beforeend", optionsMarkup);

const update = (score, index) => {
    if (totalScore !== 0 && score !== -1 || totalScore !== 10) {
        totalScore = totalScore + score;
        scoreEle.textContent = totalScore;
        questionNumber.textContent = +questionNumber.textContent + 1;
    }
    if (+index === 9) {
        const displayScore = overlayMarkup();
        document.querySelector('.quiz').insertAdjacentHTML('beforeend', displayScore);
        document.querySelector('.body').classList.add('overlay__body');
        const restartBtn = document.querySelector('.restart');
        restartBtn.addEventListener('click', () => {
            window.location.reload();
        })
        return;
    }
    const optionsMarkup = markup(+index + 1);
    form.innerHTML = '';
    form.insertAdjacentHTML("beforeend", optionsMarkup);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedOption = document?.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const index = document.querySelector('input[name="option"]:checked').closest('.quiz__main__option').dataset.index;


    if (mcqs[index].answer === selectedOption.value) {
        selectedOption.closest('.quiz__main__option').classList.add('quiz__main__option-correct');
        setTimeout(() => {
            alert('correct answer!🫡🫡');
        }, 0);
        setTimeout(() => {
            update(1, index);
        }, 0)
    } else {
        selectedOption.closest('.quiz__main__option').classList.add('quiz__main__option-incorrect');
        setTimeout(() => {
            alert('incorrect answer!🥲🥲');
        }, 0);
        setTimeout(() => {
            update(0, index);
        }, 0)
    }
});
