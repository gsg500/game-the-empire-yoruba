const originalQuest = [
  {
    question: "Quem foi Oduduwa?",
    answers: [
      { text: "Alaafin de Oyo", correct: false },
      { text: "Pai de Oranmiyan", correct: true },
      { text: "Filho de Akinkanju ", correct: false },
      { text: "Chief de Ibadan", correct: false }
    ]
  },
  {
    question: "Dadá Ajacá foi o sucessor de?",
    answers: [
      { text: "Ogundele", correct: false },
      { text: "Sango", correct: false },
      { text: "Oranmiyan", correct: true },
      { text: "Moremi", correct: false }
    ]
  },
  {
    question: "Os Yorubas são conhecidos por serem?",
    answers: [
      { text: "Muçulmanos", correct: false },
      { text: "Povos pacíficos", correct: false },
      { text: "Guerreiros violentos", correct: false },
      { text: "Mais hábeis artesãos", correct: true }
    ]
  },
  {
    question: "A dinastia Yoruba passou 80 anos exilados apos a guerra contra os Nupes no?",
    answers: [
      { text: "Reino de Borgu", correct: true },
      { text: "Egito", correct: false },
      { text: "Reino dos Males", correct: false },
      { text: "Reino do Congo", correct: false }
    ]
  },
  {
    question: "Qual o nome do Rei chantageado pela coroa Britanica por mais de 20 anos???",
    answers: [
      { text: "Alaafin Majeogbe", correct: false },
      { text: "Alaafin Adelu", correct: false },
      { text: "Alaafin Awole Arogangan", correct: false },
      { text: "Alaafin Adeyemi I Alowolodu", correct: true }
    ]
  },
  {
    question: "Quais os principais produtos de exportação do Imperio Yoruba?",
    answers: [
      { text: "Artesanado", correct: false },
      { text: "Produtos agricolas", correct: false },
      { text: "Metais e pedras preciosas", correct: true },
      { text: "Produtos manufaturados", correct: false }
    ]
  },
  {
    question: "O idioma yoruba possui?",
    answers: [
      { text: "Mais de 50 dialetos", correct: true },
      { text: "Influencia Britanica", correct: false },
      { text: "Origem portuguesa", correct: false },
      { text: "Origem mulçumana", correct: false }
    ]
  },
  {
    question: "Os Yorubas são?",
    answers: [
      { text: "Poligamos", correct: true },
      { text: "Povos de origem subsaariana", correct: false },
      { text: "Judeus", correct: false },
      { text: "Povos nomades", correct: false }
    ]
  },
]; 

function mistura(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
let questions = mistura(originalQuest)
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//

let tempo = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const scoresXmaximo = 7;
let ganhaPerde = '';

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
/////////////////-/-/-/-/-/-/-/-/-/-/-/-/-//-
function startGame() {  
  startButton.classList.add("hide");	
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  document.getElementById("startButton").remove();
  document.getElementById("showScoresButton").remove();	
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
    button.classList.add("yxtn");
	  
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
  countdown.innerHTML = "Fim do Jogo";
  clearQuestion();
  showResults(); 
  tempo = 90;
  score = 0;
}

function showResults() {
  finalScore = tempo;
  if (finalScore < 0) {
    finalScore = 0;
    ganhaPerde = 'Voce Perdeu';
  } else if (finalScore <= 40){
    ganhaPerde = 'Voce Perdeu';
  } else if (finalScore > 40){
    ganhaPerde = 'Parabens voce ganhou';
  };
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Sua pontuação é ${finalScore} ${ganhaPerde}!<div id="init" class="padraoTexto">Nome: <input type="text" name="initials" id="initials" placeholder="Digite seu nome aqui"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Salvar</button><br/><a class="btn" href="https://gsg500.github.io/game-the-empire-yoruba/">Reiniciar</a>`;
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
  highScoresList.innerHTML = `<h4>Historico foi limpo</h4><a class="btn" href="https://gsg500.github.io/game-the-empire-yoruba/">Reiniciar</a>`;
  document.getElementById("clearScores").classList.add("hide");
}