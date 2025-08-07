# Kid-friendly Tree Maze Escape data
MAZE = {
    "start": {
        "text": "You wake up in a forest. Birds sing. Two paths are ahead.",
        "options": ["Go left into the shady trees", "Go right on the sunny path"],
        "choices": ["wolf", "bridge"]
    },
    "wolf": {
        "text": "Oh no! A big wolf is sleeping here.",
        "options": ["Tiptoe past the wolf", "Go back quietly"],
        "choices": ["trap", "start"]
    },
    "trap": {
        "text": "Snap! Your foot gets stuck in a rope trap. You get free. Ouch!",
        "options": ["Keep walking ahead", "Go back to the start"],
        "choices": ["glade", "start"]
    },
    "bridge": {
        "text": "You see an old wooden bridge. It shakes in the wind.",
        "options": ["Cross the bridge", "Walk along the stream instead"],
        "choices": ["gate", "glade"]
    },
    "glade": {
        "text": "You find a sunny field. Big round stones stand in a circle.",
        "options": ["Look at the stones", "Sit and rest a while"],
        "choices": ["riddle", "sleep"]
    },
    "sleep": {
        "text": "You fall asleep. When you wake up, you are lost forever!",
        "terminal": "lose", "options": [], "choices": []
    },
    "riddle": {
        "text": "The stones show a puzzle: 'I have branches but no leaves. What am I?'",
        "options": ["A real tree", "A river", "A tree in a computer game!"],
        "choices": ["wrong_tree", "gate", "gate"]
    },
    "wrong_tree": {
        "text": "Bzzz! The stones hum. A secret path opens to the bridge.",
        "options": ["Go to the bridge"],
        "choices": ["bridge"]
    },
    "gate": {
        "text": "You find a wooden gate. It has swirly shapes.",
        "options": ["Open the gate", "Walk around the gate"],
        "choices": ["exit", "wolf"]
    },
    "exit": {
        "text": "You walk out of the gate and see your home. You are safe! Exit!",
        "terminal": "win", "options": [], "choices": []
    }
}
