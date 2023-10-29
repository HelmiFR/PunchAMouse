let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let isPaused = false;

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 12);
    return num.toString();
}

function setMole() {
    if (gameOver || isPaused) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "img/tikus.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver || isPaused) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "img/kucing.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        if (!isPaused) {
            score += 10;
            document.getElementById("score").innerText = score.toString();
        }
        // startParticleEffect();
    } else if (this == currPlantTile) {
        if (!isPaused) {
            gameOver = true;
            document.getElementById("score").innerText = "GAME OVER: " + score.toString();

            const restartButton = document.getElementById("restart-button");
            restartButton.style.display = "block";

            restartButton.style.position = "fixed";
            restartButton.style.top = "50%";
            restartButton.style.left = "50%";
            restartButton.style.transform = "translate(-50%, -50%)";
        }
    }
}


const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
    if (confirm("Apakah Anda ingin mengulang permainan?")) {
        restartGame();
    }
});

function restartGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = "0";
    clearGrid();
    setMole();
    restartButton.style.display = "none";
}

function clearGrid() {
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
}

// function startParticleEffect() {
//     particlesJS("particles-js", {
//         "particles": {
//             "number": {
//                 "value": 50
//             },
//             "color": {
//                 "value": "#ffffff"
//             }
//         }
//     });
// }

const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", function () {
    if (isPaused) {
        pauseButton.innerText = "Pause";
        isPaused = false;
        setMole();
        setPlant();
    } else {
        pauseButton.innerText = "Resume";
        isPaused = true;
        
    }
});
