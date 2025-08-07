from flask import Flask, render_template, request, redirect, url_for, jsonify
from maze_data import MAZE

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.get("/")
def select_character():
    # First page: character selection
    return render_template("select.html")

@app.get("/play")
def play_game():
    # Second page: the game (expects localStorage 'maze_character' from page 1)
    return render_template("index.html")

@app.get("/api/maze")
def api_maze():
    return jsonify(MAZE)

if __name__ == "__main__":
    # Change port if 5051 is busy
    app.run(host="127.0.0.1", port=5051, debug=True)
