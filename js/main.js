var cols = 3;
var rows = 3;



function builBoard( cols, rows, defaultValue){
  var arr = [];
  var grid = ""
  // Creates all lines:
  for(var i=0; i < rows; i++){
      var row = '<div class="row">';
      // Creates an empty line
      arr.push([]);
      // Adds cols to the empty line:
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
        var colorRandom = getRandomColor();
        row += "<button style='background-color:"+colorRandom+"'>"+defaultValue+"</button>"
      }

      row += '</div>';
      grid += row;
      row = ""
  }
  console.log(grid)
  var gridParent = document.getElementById('gridFred')
  gridParent.innerHTML = grid;
  return arr;
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    console.log(color)
  }
  return color;
}
const randomNumber = (max,min) =>{
  let random = Math.floor(Math.random()*(max-min+1)+min);
  return random;
}

builBoard(cols, rows,'')

var coord = []
coord = [randomNumber(2,0),randomNumber(2,0)]
console.log(coord)


