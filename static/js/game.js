let mazeData = {};
let currentNode = 'start';

document.addEventListener("DOMContentLoaded", () => {
  fetch('/static/maze_data.json')
    .then(res => res.json())
    .then(data => {
      mazeData = data;
      displayNode(currentNode);
    });
});

function displayNode(key) {
  const node = mazeData[key];
  currentNode = key;

  const chatBox = document.getElementById("chat");
  const choicesBox = document.getElementById("choices");

  // Create chat bubble
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble " + getSpeakerClass(node.text);
  bubble.textContent = node.text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear choices
  choicesBox.innerHTML = "";

  // Terminal case
  if (node.terminal) {
    const endMsg = document.createElement("div");
    endMsg.className = "chat-bubble mam";
    endMsg.textContent = node.terminal === "win" ? "🎉 Project Submitted!" : "💀 Attendance gaya bro!";
    chatBox.appendChild(endMsg);
    return;
  }

  // Show options
  node.options.forEach((optionText, idx) => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.onclick = () => {
      displayNode(node.choices[idx]);
    };
    choicesBox.appendChild(btn);
  });
}

function getSpeakerClass(text) {
  if (text.startsWith("Kartik")) return "kartik";
  if (text.startsWith("Bhumika")) return "mam";
  return "friend";
}
