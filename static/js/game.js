const storyBox = document.getElementById("storyBox");
const choicesContainer = document.getElementById("choicesContainer");

let currentNode = "start";

fetch("/static/maze_data.json")
  .then((res) => res.json())
  .then((data) => {
    window.mazeData = data;
    showNode(currentNode);
  });

function showNode(node) {
  const data = window.mazeData[node];
  currentNode = node;
  storyBox.innerText = data.text;

  choicesContainer.innerHTML = "";

  if (data.terminal) {
    const msg = data.terminal === "win" ? "🎉 You won!" : "💀 Game Over!";
    const endBtn = document.createElement("button");
    endBtn.innerText = msg;
    endBtn.className = "choice-btn";
    endBtn.onclick = restartGame;
    choicesContainer.appendChild(endBtn);
    return;
  }

  data.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = option;
    btn.onclick = () => showNode(data.choices[i]);
    choicesContainer.appendChild(btn);
  });
}

function restartGame() {
  showNode("start");
}
