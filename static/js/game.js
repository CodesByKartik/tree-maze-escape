/* ===============================
   Tree Maze Escape — Game page JS (/play)
=================================*/

// ---------- State ----------
let MAZE = {};
let current = "start";
let trail = ["start"];
let character = localStorage.getItem("maze_character") || "";

// ---------- Elements ----------
const sceneEl  = document.getElementById("scene");
const optsWrap = document.getElementById("options");
const crumbsEl = document.getElementById("crumbs");
const barFill  = document.querySelector(".bar i");
const bannerEl = document.getElementById("banner");
const bannerMsg= document.getElementById("bannerMsg");
const parallax = document.getElementById("parallax");

// ---------- Boot ----------
fetch("/api/maze")
  .then(r => r.json())
  .then(data => { MAZE = data; init(); })
  .catch(() => { sceneEl.textContent = "Could not load the maze. Please refresh."; });

function init(){
  // If user opened /play directly without picking
  if(!character){
    window.location.href = "/";
    return;
  }

  // Background stars
  spawnDots(); setInterval(spawnDots, 1400);

  // Keyboard
  window.addEventListener("keydown", onKey);

  // First render
  render();
}

// ---------- Render ----------
function render(){
  const node = MAZE[current];
  if(!node){ sceneEl.textContent = "Unknown place..."; return; }

  // Story
  sceneEl.innerHTML = emphasize(node.text);

  // Options
  optsWrap.innerHTML = "";
  (node.options || []).forEach((label, i) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.setAttribute("aria-label", `Choice ${i+1}: ${label}`);
    b.innerHTML = `<span class="num">${i+1}</span> ${label}`;
    b.addEventListener("click", () => choose(i));
    optsWrap.appendChild(b);
  });

  // Path breadcrumb
  crumbsEl.textContent = "Path: " + trail.join(" › ");

  // Banner (win/lose)
  if(node.terminal){
    showBanner(node.terminal === "win" ? "✅ You win! Great job, explorer!" : "❌ Oh no! You got lost. Try again!",
               node.terminal);
  }else{
    hideBanner();
  }

  // Progress
  animateProgress();
}

function emphasize(t=""){
  return t
    .replace(/gate|exit/gi, m => `<span class="em">${m}</span>`)
    .replace(/trap|wolf|lose/gi, m => `<span class="warn">${m}</span>`);
}

// ---------- Choices ----------
function choose(idx){
  const node = MAZE[current];
  if(!node || node.terminal) return;

  const next = (node.choices || [])[idx];
  if(!next) return;

  // Tiny transition
  sceneEl.style.transition = "transform .18s ease, opacity .18s ease";
  sceneEl.style.transform = "translateY(-6px)";
  sceneEl.style.opacity = "0";

  setTimeout(() => {
    current = next;
    trail.push(next);

    sceneEl.style.transition = "none";
    sceneEl.style.transform = "translateY(6px)";
    render();
    requestAnimationFrame(() => {
      sceneEl.style.transition = "transform .22s ease, opacity .22s ease";
      sceneEl.style.transform = "translateY(0)";
      sceneEl.style.opacity = "1";
    });
  }, 160);
}

// ---------- Progress + Banner ----------
function animateProgress(){
  barFill.style.transition = "none";
  barFill.style.width = "0";
  void barFill.offsetWidth; // reflow
  barFill.style.transition = "width 1.2s ease";
  barFill.style.width = "100%";
}

function showBanner(text, kind){ // 'win' | 'lose'
  bannerEl.className = `banner ${kind}`;
  bannerMsg.textContent = text;
  bannerEl.hidden = false;
}
function hideBanner(){
  bannerEl.className = "banner";
  bannerEl.hidden = true;
  bannerMsg.textContent = "";
}

// ---------- Keyboard ----------
function onKey(e){
  const k = e.key.toLowerCase();
  if(k === "r"){ restart(); return; }
  const n = parseInt(k, 10);
  if(!isNaN(n) && n >= 1){
    const node = MAZE[current] || {};
    if((node.options || [])[n-1]) choose(n-1);
  }
}

// ---------- Helpers ----------
function restart(){
  current = "start";
  trail = ["start"];
  render();
}

function spawnDots(){
  for(let i=0;i<40;i++){
    const d = document.createElement("i");
    d.className = "dot";
    d.style.left = Math.random()*100 + "vw";
    d.style.top = (Math.random()*100 - 10) + "vh";
    d.style.setProperty("--dx", (Math.random()*24-12) + "vw");
    d.style.animationDuration = (7 + Math.random()*9) + "s";
    d.style.opacity = Math.random()*.6 + .1;
    parallax.appendChild(d);
    d.addEventListener("animationend", ()=> d.remove());
  }
}
