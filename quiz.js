const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions =  []

let questions = [
    {
        question: 'How would I describe myself?',
        choice1: 'Outgoing', 
        choice2: 'Brave', 
        choice3: 'Emotional', 
        choice4: 'Cool',
        answer: 3, 
    },
    {
        question: 'What instrument can I play?',
        choice1: 'Violin', 
        choice2: 'Piano', 
        choice3: 'Drums', 
        choice4: 'Guitar',
        answer: 2, 
    },
    {
        question: 'Why did I stop playing soccer?',
        choice1: 'I found it stressful', 
        choice2: 'I got bored', 
        choice3: 'It was too time consuming', 
        choice4: 'I got injured',
        answer: 1, 
    },
    {
        question: 'What is my favorite color?',
        choice1: 'Red', 
        choice2: 'Purple', 
        choice3: 'Blue', 
        choice4: 'Green',
        answer: 3, 
    }
]

const SCORE_POINTS = 100

const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score=0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://jonathanl5.github.io/FAQquiz.page/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000) 
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()