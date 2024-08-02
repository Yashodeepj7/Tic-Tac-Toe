let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");

let turn0 = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    removeHighlight();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            box.classList.add("disabled");
            count++;
            if (checkWinner() || count === 9) {
                if (!checkWinner()) {
                    gameDraw();
                }
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => box.classList.add("disabled"));
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.classList.remove("disabled");
        box.classList.add("abled");
        box.innerText = "";
    });
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    highlightWinningBoxes(pattern);
    disableBoxes();
    setTimeout(() => {
        msgContainer.classList.remove("hide");
    }, 1000); 
};

const highlightWinningBoxes = (pattern) => {
   
    pattern.forEach(index => {
        boxes[index].classList.add("highlight");
    });

    
    setTimeout(() => {
        pattern.forEach(index => {
            boxes[index].classList.add("highlight");
        });
    }, 0);
};

const removeHighlight = () => {
    boxes.forEach(box => box.classList.remove("highlight"));
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return true;
            }
        }
    }
    return false;
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
