let n = prompt("Enter your Field size please");

let combinationMatrixCouple = [];

let combinationMatrix = [];

for (let i = 0; i < n; i++) {
    combinationMatrixCouple.push([]);
    combinationMatrix.push([]);
    for (let j = 0; j < n; j++) {
        combinationMatrixCouple[i].push('' + i + j);
        combinationMatrix[i].push('' + i + j);
    }
}

for (let k = 0; k < combinationMatrix.length; k++) {
    for (let g = 0; g < combinationMatrix[k].length; g++) {
        let node = document.createElement("div");
        node.setAttribute('class', 'box');
        node.setAttribute('id', combinationMatrix[k][g]);
        document.getElementById("field").appendChild(node);
    }
    let br =  document.createElement("br");
    document.getElementById("field").appendChild(br);
}


let count = 0;

let clicked = false;

const allEqual = arr => arr.every(v => v === arr[0]);

function unableClick(winner) {
    $(document).ready(function () {
        document.querySelector('.foot').innerText = "Player " + " " + winner.toUpperCase() + " " + 'WINS!!';
        document.querySelector('#wintext').setAttribute('class', 'win');
        document.querySelector('#field').setAttribute('id', 'disabled');
        document.querySelector('#field').setAttribute('id', 'disabled');
    });
}


let couplePlayer = function () {

    $('.box').one('click', function () {
        count += 1;
        let field = $(this).attr('id');
        let index = field.split('');
        if (count % 2 === 1) {
            this.innerText = "x";
            combinationMatrixCouple[index[0]][index[1]] = "x";

        } else {
            this.innerText = "o";
            combinationMatrixCouple[index[0]][index[1]] = "o";
        }

        winCheck(combinationMatrixCouple);
    });
};


function winCheck(matrix) {

    let columns = [];

    for (let c = 0; c < matrix.length; c++) {
        columns.push([]);
    }

    let mainDiagonal = [];
    let secondaryDiagonal = [];

    for (let i = 0; i < matrix.length; i++) {

        if (allEqual(matrix[i])) {
            unableClick(matrix[i][0]);
        }

        for (let j = 0; j < matrix[i].length; j++) {
            columns[j].push(matrix[i][j]);

            if (i === j) {
                mainDiagonal.push(matrix[i][j]);
            }
            if (i + j === (matrix.length - 1)) {
                secondaryDiagonal.push(matrix[i][j]);
            }
        }
    }

    if (allEqual(mainDiagonal)) {
        unableClick(mainDiagonal[0]);
    }
    if (allEqual(secondaryDiagonal)) {
        unableClick(secondaryDiagonal[0]);
    } else {
        for (let column in columns) {
            if (allEqual(columns[column])) {
                unableClick(columns[column][0]);
            }
        }
    }
}

////////////////////////////////////////////Playing With Computer Part//////////////////////////////////////////////////
let moves = [];

let a = document.querySelectorAll('.box');

function arrModify(elem) {
    moves = [];
    elem.forEach(el => {
        let text = document.getElementById(el.id).innerText;
        if (text === '') {
            moves.push(el.id);
        }
    });
}

function cleanField() {
    a.forEach(elem => {
        elem.innerHTML = '';
    });
}

$('.playerX').on('click', function () {
    cleanField();
    clicked = true;
    player('X');
});

$('.playerO').on('click', function () {
    cleanField();
    clicked = true;
    player('O');
});

if (clicked === false) {
    couplePlayer();
}


function player(roll) {
    let player1;
    let player2;
    if (roll === 'X') {
        player1 = 'x';
        player2 = 'o';
    } else {
        player1 = 'o';
        player2 = 'x';
    }
    document.querySelector('.playerX').setAttribute('id', 'hide');
    document.querySelector('.playerO').setAttribute('id', 'hide');
        $('.box').one('click', function () {
            arrModify(a);
        let ranNum = Math.floor(Math.random() * (moves.length - 1));
        let field = $(this).attr('id');
        let index = field.split('');
        this.innerText = player1;
        combinationMatrix[index[0]][index[1]] = player1;
        winCheck(combinationMatrix);
        arrModify(a);
        if (moves.length > 0) {
            let index2 = moves[ranNum].split('');
            combinationMatrix[index2[0]][index2[1]] = player2;
            document.getElementById(moves[ranNum]).innerText = player2;
            document.getElementById(moves[ranNum]).setAttribute('id', 'disabled');
            winCheck(combinationMatrix);
        }
    });
}