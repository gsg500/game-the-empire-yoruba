const questions = [
  {
    question: "1Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "2Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "3Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "4Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "5Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "6Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "7Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
  {
    question: "8Quem é o Alaafin Oyo?",
    answers: [
      { text: "Rei de Oyo", correct: true },
      { text: "Negro Escravo", correct: false },
      { text: "Cidade Yoruba", correct: false },
      { text: "Presidente", correct: false }
    ]
  },
]; 
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//

let tempo = 30;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const scoresXmaximo = 7;

const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function startClock() {
  countdown.innerHTML = "Tempo restante: " + tempo;
  if (tempo <= 0) {
    gameOver();
  } else {
    tempo -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    tempo = tempo - 10;
    console.log(tempo);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}

function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Fim";
  clearQuestion();
  showResults();
  startButton.innerText = "Reiniciar";
  startButton.classList.remove("hide");
  tempo = 90;
  score = 0;
}

function showResults() {
  finalScore = tempo;
  if (finalScore < 0) {
    finalScore = 0;
  }
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Sua pontuação é ${finalScore}!<div id="init" class="padraoTexto">Nome: <input type="text" name="initials" id="initials" placeholder="Digite seu nome aqui"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}

function submitScores(e) {
  const score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(scoresXmaximo);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}

function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h3 class="padraoTexto">Historico de melhor tempo</h3><ul id="highScoresList" class="padraoTexto"></ul><button id="clearScores" class="btn" onclick="clearScores()">Limpar Historico</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList padraoTexto">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}

function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h4>Historico foi limpo</h4>";
  document.getElementById("clearScores").classList.add("hide");
}
