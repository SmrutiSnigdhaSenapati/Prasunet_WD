const selectBox = document.querySelector(".select-box"),
    playWithPlayerBtn = selectBox.querySelector(".options .playWithPlayer"),
    playWithComputerBtn = selectBox.querySelector(".options .playWithComputer"),
    selectPlayerBox = document.querySelector(".select-player-box"),
    selectBtnX = selectPlayerBox.querySelector(".options .playerX"),
    selectBtnO = selectPlayerBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X",
    runBot = true,
    playWithComputer = false;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

playWithPlayerBtn.onclick = () => {
    playWithComputer = false;
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

playWithComputerBtn.onclick = () => {
    playWithComputer = true;
    selectBox.classList.add("hide");
    selectPlayerBox.classList.remove("hide");
}

selectBtnX.onclick = () => {
    selectPlayerBox.classList.add("hide");
    playBoard.classList.add("show");
    playerSign = "X"; // Ensure player starts with X
}

selectBtnO.onclick = () => {
    selectPlayerBox.classList.add("hide");
    playBoard.classList.add("show");
    playerSign = "O"; // Ensure player starts with O
    if (playWithComputer) {
        playerSign = "X"
        bot(); // If player is O and playing with computer, let computer start
    }
}

function clickedBox(element) {
    if (playWithComputer) {
        if (playerSign == "X") {
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            element.setAttribute("id", playerSign);
            players.classList.add("active");
            playerSign = "O"; // Switch to computer's turn
        } else {
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            element.setAttribute("id", playerSign);
            players.classList.remove("active");
            playerSign = "X"; // Switch to player's turn
        }
        element.style.pointerEvents = "none";
        selectWinner();
        if (runBot) {
            playBoard.style.pointerEvents = "none";
            setTimeout(() => {
                bot();
            }, 500); // Small delay for the computer's move
        }
    } else {
        if (players.classList.contains("player")) {
            playerSign = "O";
            element.innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            element.setAttribute("id", playerSign);
            players.classList.remove("player"); // Swap turns
        } else {
            playerSign = "X";
            element.innerHTML = `<i class="${playerXIcon}"></i>`;
            element.setAttribute("id", playerSign);
            players.classList.add("active");
            players.classList.add("player"); // Swap turns
        }
        selectWinner();
        element.style.pointerEvents = "none";
    }
}

function bot() {
    let array = [];
    if (runBot) {
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (playerSign == "O") {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                allBox[randomBox].setAttribute("id", "O");
                players.classList.remove("active");
                playerSign = "X"; // Switch back to player's turn
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", "X");
                players.classList.add("active");
                playerSign = "O"; // Switch back to computer's turn
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            runBot = false;
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
