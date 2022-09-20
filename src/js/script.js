let order = []; //Ordem que as luzes vão aparecer
let clickedOrder = []; //Ordem que o usuário vai clicar
let score = 0;

//0 - green
//1 - red
//2 - yellow
//3 - blue

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//Gera ordem aleatória
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4); //Math.floor arredonda pra baixo
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//Ascende a próxima cor
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number + 50);
};

//Checa se a ordem clicada é a mesma ordem gerada pelo jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Você acertou! Pontuação: ${score}.\nVamos para o próximo nível?`);
    nextLevel();
  }
};

//Clique do jogador
//color é uma variável criada dentro da função passada como parâmetro
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

//Retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//Próximo nível do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
};

//Game over
let gameOver = () => {
  alert(`Você perdeu o jogo! Pontuação: ${score - 1}`);
  order = [];
  clickedOrder = [];
  playGame();
};

//Inicia o jogo
let playGame = () => {
  alert("Clique em ok para começar a partida.");
  score = 0;
  nextLevel();
};

//Eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

setTimeout(() => {
  playGame();
}, 200);
