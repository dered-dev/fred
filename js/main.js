// Get color random 
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#00';
  for (var i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getGMapRandomColor() {
  return 'hsla(' + Math.floor(Math.random()*360) + ', 100%, 40%, 1)';
}

// Build Board Fred
const builBoard = (cols, rows) => {
  var arr = [];
  var grid = ""
  var number = 1;
  for (var i = 0; i < rows; i++) {
    var row = '<div class="row">';
    arr.push([]);
    arr[i].push(new Array(cols));
    for (var j = 0; j < cols; j++) {
      arr[i][j] = number;
      var colorRandom = getGMapRandomColor();
      row += `<button style='background-color: ${colorRandom}' data-id='${number}' class='js__buttonFred' id='btn${number}'>${number}</button>`
      number++
    }
    row += '</div>';
    grid += row;
    row = ""
  }
  var gridParent = document.getElementById('gridFred')
  gridParent.innerHTML = grid;
  return arr;
}

const randomNumber = (max, min) => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}


var cols = 4;
var rows = 3;
var countRound = 1;

builBoard(cols, rows)


var arraySecuency = []
var numberRound = 0;
var score = 0;
var pulsedSecuency = 0;
var start = false;


const startRound = () => {

  var numberRandom = randomNumber(9, 1);
  arraySecuency.push(numberRandom)
  paintSecuency(arraySecuency)
  numberRound++;
  start = true;


}

const paintSecuency = (secuencyArr) => {
  var countTimer = 0;
  var intervalID = window.setInterval(function () {
    var elementActive = document.getElementById('btn' + secuencyArr[countTimer])
    elementActive.classList.add('active')

    setTimeout(function () {
      elementActive.classList.remove('active')
    }, 400)

    countTimer++;
    if (countTimer === secuencyArr.length) {
      clearInterval(intervalID);
      console.log('Ahora juega Fred')
      pulsedSecuency = 0;
      setTimeout(function(){
        document.getElementsByClassName("modal__youTurn")[0].classList.add('open')
      },400)
      setTimeout(function(){
        document.getElementsByClassName("modal__youTurn")[0].classList.remove('open')
      },2000)
    }
  }, 1000);
}


var startbutton = document.getElementById('startButton')
startbutton.addEventListener('click', function () {
  arraySecuency = []
  startRound(numberRound)
  document.getElementsByClassName("modal__start")[0].classList.remove('open')
})


document.querySelectorAll('.js__buttonFred').forEach(item => {
  item.addEventListener('click', event => {
    if (start === false) {
      console.log('inicia el juego')
    } else {
      //handle click
      pulsedSecuency++;
      var idPressed = parseInt(item.dataset.id)
      console.log(idPressed)
      var pulsed = arraySecuency[pulsedSecuency - 1]
      console.log(pulsed)
      if (idPressed === pulsed) {
        console.log('numeros' + idPressed + arraySecuency[pulsedSecuency - 1])
        if (pulsedSecuency === arraySecuency.length) {
          console.log('juego exitoso')

          setTimeout(function () {
            console.log('success')
            score++
            document.getElementById("score").innerHTML = `${score}<small>pts</small>`
            document.getElementsByClassName("modal__succes")[0].classList.add('open')
            setTimeout(function(){
              document.getElementsByClassName("modal__succes")[0].classList.remove('open')
              startRound()
            },2000)
          }, 1)
        }
      } else {
        gameOver()
      }
    }
  })
})

const gameOver = () => {
  
  document.getElementById("score").innerText = "0"
  document.getElementsByClassName("modal__gameOver")[0].classList.add('open')
  document.getElementsByClassName("score__over")[0].innerText = score;

  setTimeout(function(){
    document.getElementsByClassName("modal__gameOver")[0].classList.remove('open')
    document.getElementsByClassName("modal__start")[0].classList.add('open')
  },5000)

  pulsedSecuency = 0
  arraySecuency = []
  score = 0
  start =  false;
}

// dark/ light mode
var checkMode = document.getElementById("mode");

checkMode.addEventListener('change', function () {
  if (this.checked) {
    document.getElementById('body').classList.add('dark')
  } else {
    document.getElementById('body').classList.remove('dark')
  }
});