## README.md

# Connect4 (JavaScript)

A sleek, interactive version of the classic **Connect Four** game designed for the browser. This project demonstrates DOM manipulation, event-driven programming, and grid-state logic.

## 🚀 Features
* **Interactive UI:** Smooth disc-drop animations and hover effects using CSS transitions.
* **Win Logic:** Algorithmic detection for horizontal, vertical, and diagonal connections.
* **Responsive Design:** Playable across different screen sizes.
* **State Management:** Tracks current player turns and prevents moves on a finalized board.

## 🛠️ Technical Stack
* **HTML5:** Semantic structure for the game board.
* **CSS3:** Flexbox/Grid layout and disc animations.
* **JavaScript (ES6):** Game engine, event listeners, and win-condition algorithms.

## 🕹️ How to Play
1. **Clone the repository:**
   ```bash
   git clone https://github.com/HenitJain/Connect4.git
   ```
2. **Open the game:**
   * Simply open `index.html` in any modern web browser.
3. **Gameplay:**
   * Click on a column to drop your color (Red or Yellow).
   * The first player to align four discs wins.
   * Click the "Reset" button to start a new match.

## 📂 Project Structure
* `index.html`: The game container and board structure.
* `style.css`: Visual styling and animations.
* `script.js`: Core game logic, turn-handling, and win detection.
* `README.md`: Documentation.

## 🧪 Core Logic Explained
The board is represented as a 2D array (Matrix) of $6 \times 7$. The win detection function iterates through the coordinates $(r, c)$ and checks the following vectors for a matching sequence of four:
* **Horizontal:** $(r, c) \to (r, c+3)$
* **Vertical:** $(r, c) \to (r+3, c)$
* **Diagonal (Down-Right):** $(r, c) \to (r+3, c+3)$
* **Diagonal (Up-Right):** $(r, c) \to (r-3, c+3)$
