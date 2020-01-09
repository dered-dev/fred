// functions
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#00';
  for (var i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const builBoard = (cols, rows) => {
  var arr = [];
  var grid = ""
  var number = 1;
  // Creates all lines:

  for (var i = 0; i < rows; i++) {
    var row = '<div class="row">';
    arr.push([]);
    arr[i].push(new Array(cols));
    for (var j = 0; j < cols; j++) {
      arr[i][j] = number;
      var colorRandom = getRandomColor();
      row += "<button style='background-color:" + colorRandom + "' data-id='"+number+"' class='js__buttonFred' id='btn" + number + "'>" + number + "</button>"
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
var pulsedSecuency  = 0;


const startRound = () => {

  var numberRandom = randomNumber(9, 1);
  arraySecuency.push(numberRandom)
  console.log(arraySecuency)
  paintSecuency(arraySecuency)
  numberRound++;
  

}

const paintSecuency = (secuencyArr) =>{
  var countTimer = 0;
  var intervalID = window.setInterval(function () {
    var elementActive = document.getElementById('btn'+secuencyArr[countTimer])
    elementActive.classList.add('active')
  
    setTimeout(function(){
      elementActive.classList.remove('active')
    },400)
  
    countTimer ++;
    if(countTimer === secuencyArr.length ){
      clearInterval(intervalID);
      console.log('Ahora juega Fred')
      pulsedSecuency = 0;
    }
  }, 1000);
}


var startbutton = document.getElementById('startButton')
startbutton.addEventListener('click', function () {
  arraySecuency=[]
  startRound(numberRound)
})


document.querySelectorAll('.js__buttonFred').forEach(item => {
  item.addEventListener('click', event => {
    //handle click
    pulsedSecuency ++;
    var idPressed = parseInt(item.dataset.id)
    console.log(idPressed)
    var pulsed =  arraySecuency[pulsedSecuency - 1]
    console.log(pulsed)
    if(idPressed === pulsed){
      console.log('numeros'+ idPressed + arraySecuency[pulsedSecuency - 1])
      console.log('chido')
      if(pulsedSecuency ===  arraySecuency.length){
        console.log('juego exitoso')
        
        setTimeout(function(){
          alert('OLV!!, c rifo')
          score ++ 
          document.getElementById("score").innerText=score
          startRound()
                  }, 1)
      }
    }else{
      gameOver()
    }
    


    console.log(item, pulsedSecuency) 
    
  })
})

const gameOver = () =>{
  pulsedSecuency = 0 
  arraySecuency = []
  score = 0
  alert('Estas bien wey!')
  document.getElementById("score").innerText="0"
  console.log('estas wey')
}