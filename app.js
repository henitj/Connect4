(function() {
    'use strict';

    // =====================================================
    // CONSTANTS
    // =====================================================

    const ROWS = 6;
    const COLS = 7;
    const STORAGE_KEYS = {
        STATS: 'c4_stats',
        ACHIEVEMENTS: 'c4_achievements',
        SETTINGS: 'c4_settings'
    };

    // =====================================================
    // THEMES
    // =====================================================

    const THEMES = [
        { id: 'sunny', name: 'Sunny', color: '#4ECDC4' },
        { id: 'ocean', name: 'Ocean', color: '#3498DB' },
        { id: 'forest', name: 'Forest', color: '#27AE60' },
        { id: 'sunset', name: 'Sunset', color: '#E67E22' },
        { id: 'berry', name: 'Berry', color: '#9B59B6' },
        { id: 'midnight', name: 'Midnight', color: '#4A69BD' }
    ];

    // =====================================================
    // ACHIEVEMENT ICONS (SVG)
    // =====================================================

    const ACHIEVEMENT_ICONS = {
        trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
        users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
        gem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 18 3 22 9 12 22 2 9"/><path d="m12 22 4-13-8 0z"/><path d="M2 9h20"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
    };

    // =====================================================
    // ACHIEVEMENTS DATA
    // =====================================================

    const ACHIEVEMENTS_DATA = [
        // Wins
        { id: 'win_1', name: 'First Victory', desc: 'Win your first game', icon: 'target', target: 1, category: 'wins' },
        { id: 'win_5', name: 'Getting Started', desc: 'Win 5 games', icon: 'star', target: 5, category: 'wins' },
        { id: 'win_10', name: 'Competitor', desc: 'Win 10 games', icon: 'star', target: 10, category: 'wins' },
        { id: 'win_25', name: 'Skilled Player', desc: 'Win 25 games', icon: 'star', target: 25, category: 'wins' },
        { id: 'win_50', name: 'Veteran', desc: 'Win 50 games', icon: 'award', target: 50, category: 'wins' },
        { id: 'win_100', name: 'Master', desc: 'Win 100 games', icon: 'trophy', target: 100, category: 'wins' },
        { id: 'win_200', name: 'Grandmaster', desc: 'Win 200 games', icon: 'trophy', target: 200, category: 'wins' },
        { id: 'win_500', name: 'Legend', desc: 'Win 500 games', icon: 'trophy', target: 500, category: 'wins' },

        // Streaks
        { id: 'streak_3', name: 'Hat Trick', desc: 'Win 3 games in a row', icon: 'flame', target: 3, category: 'streak' },
        { id: 'streak_5', name: 'On Fire', desc: 'Win 5 games in a row', icon: 'flame', target: 5, category: 'streak' },
        { id: 'streak_7', name: 'Unstoppable', desc: 'Win 7 games in a row', icon: 'flame', target: 7, category: 'streak' },
        { id: 'streak_10', name: 'Domination', desc: 'Win 10 games in a row', icon: 'flame', target: 10, category: 'streak' },

        // Speed
        { id: 'speed_60', name: 'Quick Match', desc: 'Win in under 60 seconds', icon: 'clock', target: 1, category: 'speed' },
        { id: 'speed_45', name: 'Speed Runner', desc: 'Win in under 45 seconds', icon: 'zap', target: 1, category: 'speed' },
        { id: 'speed_30', name: 'Lightning Fast', desc: 'Win in under 30 seconds', icon: 'zap', target: 1, category: 'speed' },
        { id: 'speed_20', name: 'Flash', desc: 'Win in under 20 seconds', icon: 'zap', target: 1, category: 'speed' },

        // AI
        { id: 'ai_easy', name: 'Baby Steps', desc: 'Beat Easy AI', icon: 'cpu', target: 1, category: 'ai' },
        { id: 'ai_medium', name: 'Fair Fight', desc: 'Beat Medium AI', icon: 'cpu', target: 1, category: 'ai' },
        { id: 'ai_hard', name: 'Challenger', desc: 'Beat Hard AI', icon: 'cpu', target: 1, category: 'ai' },
        { id: 'ai_expert', name: 'Champion', desc: 'Beat Expert AI', icon: 'trophy', target: 1, category: 'ai' },
        { id: 'ai_easy_10', name: 'Easy Master', desc: 'Beat Easy AI 10 times', icon: 'cpu', target: 10, category: 'ai' },
        { id: 'ai_medium_10', name: 'Consistent', desc: 'Beat Medium AI 10 times', icon: 'cpu', target: 10, category: 'ai' },
        { id: 'ai_hard_10', name: 'Elite', desc: 'Beat Hard AI 10 times', icon: 'cpu', target: 10, category: 'ai' },
        { id: 'ai_expert_5', name: 'Mastermind', desc: 'Beat Expert AI 5 times', icon: 'award', target: 5, category: 'ai' },
        { id: 'ai_expert_10', name: 'Unbeatable', desc: 'Beat Expert AI 10 times', icon: 'trophy', target: 10, category: 'ai' },

        // Games Played
        { id: 'play_10', name: 'Beginner', desc: 'Play 10 games', icon: 'check', target: 10, category: 'play' },
        { id: 'play_25', name: 'Regular', desc: 'Play 25 games', icon: 'check', target: 25, category: 'play' },
        { id: 'play_50', name: 'Dedicated', desc: 'Play 50 games', icon: 'check', target: 50, category: 'play' },
        { id: 'play_100', name: 'Enthusiast', desc: 'Play 100 games', icon: 'star', target: 100, category: 'play' },
        { id: 'play_250', name: 'Addicted', desc: 'Play 250 games', icon: 'star', target: 250, category: 'play' },
        { id: 'play_500', name: 'Dedicated Fan', desc: 'Play 500 games', icon: 'award', target: 500, category: 'play' },

        // Moves
        { id: 'moves_100', name: 'Making Moves', desc: 'Play 100 total moves', icon: 'check', target: 100, category: 'moves' },
        { id: 'moves_500', name: 'Active Player', desc: 'Play 500 total moves', icon: 'check', target: 500, category: 'moves' },
        { id: 'moves_1000', name: 'Move Master', desc: 'Play 1000 total moves', icon: 'star', target: 1000, category: 'moves' },
        { id: 'moves_5000', name: 'Click Champion', desc: 'Play 5000 total moves', icon: 'award', target: 5000, category: 'moves' },

        // Special
        { id: 'draw_1', name: 'Stalemate', desc: 'Draw a game', icon: 'users', target: 1, category: 'special' },
        { id: 'draw_5', name: 'Diplomat', desc: 'Draw 5 games', icon: 'users', target: 5, category: 'special' },
        { id: 'draw_10', name: 'Peacemaker', desc: 'Draw 10 games', icon: 'users', target: 10, category: 'special' },
        { id: 'perfect', name: 'Perfect Game', desc: 'Win in minimum moves (7)', icon: 'gem', target: 1, category: 'special' },

        // Win Types
        { id: 'win_horizontal', name: 'Horizontal', desc: 'Win with a horizontal line', icon: 'check', target: 1, category: 'wintype' },
        { id: 'win_vertical', name: 'Vertical', desc: 'Win with a vertical line', icon: 'check', target: 1, category: 'wintype' },
        { id: 'win_diagonal', name: 'Diagonal', desc: 'Win with a diagonal line', icon: 'check', target: 1, category: 'wintype' },
        { id: 'win_all', name: 'All Rounder', desc: 'Win with all line types', icon: 'star', target: 3, category: 'wintype' },

        // Time-based
        { id: 'night_owl', name: 'Night Owl', desc: 'Play after midnight', icon: 'clock', target: 1, category: 'time' },
        { id: 'early_bird', name: 'Early Bird', desc: 'Play before 7 AM', icon: 'clock', target: 1, category: 'time' },
        { id: 'weekend', name: 'Weekend Warrior', desc: 'Win on a weekend', icon: 'star', target: 1, category: 'time' },

        // Misc
        { id: 'themes', name: 'Fashionista', desc: 'Try all themes', icon: 'star', target: 6, category: 'misc' }
    ];

    // =====================================================
    // STORAGE HELPER
    // =====================================================

    const Storage = {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch {
                console.warn('Storage save failed');
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch {
                console.warn('Storage remove failed');
            }
        }
    };

    // =====================================================
    // AI ENGINE (MINIMAX WITH ALPHA-BETA PRUNING)
    // =====================================================

    const AI = {
        depths: { easy: 1, medium: 3, hard: 5, expert: 7 },

        getMove(board, difficulty) {
            const depth = this.depths[difficulty] || 3;
            const validCols = this.getValidCols(board);

            if (validCols.length === 0) return -1;

            // Easy mode: mostly random
            if (difficulty === 'easy' && Math.random() < 0.7) {
                return validCols[Math.floor(Math.random() * validCols.length)];
            }

            // Check for immediate win
            for (const col of validCols) {
                if (this.checkMoveWins(board, col, 2)) return col;
            }

            // Check for immediate block
            for (const col of validCols) {
                if (this.checkMoveWins(board, col, 1)) return col;
            }

            if (difficulty === 'easy') {
                return validCols[Math.floor(Math.random() * validCols.length)];
            }

            // Minimax with alpha-beta pruning
            let bestScore = -Infinity;
            let bestCol = validCols[0];

            // Prefer center columns
            const sortedCols = [...validCols].sort((a, b) => Math.abs(a - 3) - Math.abs(b - 3));

            for (const col of sortedCols) {
                const newBoard = this.makeMove(board, col, 2);
                const score = this.minimax(newBoard, depth - 1, -Infinity, Infinity, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestCol = col;
                }
            }

            return bestCol;
        },

        minimax(board, depth, alpha, beta, maximizing) {
            if (this.checkWin(board, 2)) return 10000 + depth;
            if (this.checkWin(board, 1)) return -10000 - depth;

            const validCols = this.getValidCols(board);
            if (validCols.length === 0 || depth === 0) {
                return this.evaluate(board);
            }

            if (maximizing) {
                let value = -Infinity;
                for (const col of validCols) {
                    const newBoard = this.makeMove(board, col, 2);
                    value = Math.max(value, this.minimax(newBoard, depth - 1, alpha, beta, false));
                    alpha = Math.max(alpha, value);
                    if (alpha >= beta) break;
                }
                return value;
            } else {
                let value = Infinity;
                for (const col of validCols) {
                    const newBoard = this.makeMove(board, col, 1);
                    value = Math.min(value, this.minimax(newBoard, depth - 1, alpha, beta, true));
                    beta = Math.min(beta, value);
                    if (alpha >= beta) break;
                }
                return value;
            }
        },

        evaluate(board) {
            let score = 0;

            // Center column preference
            for (let r = 0; r < ROWS; r++) {
                if (board[r][3] === 2) score += 3;
                else if (board[r][3] === 1) score -= 3;
            }

            const evaluateWindow = (window) => {
                const p2 = window.filter(x => x === 2).length;
                const p1 = window.filter(x => x === 1).length;
                const empty = window.filter(x => x === 0).length;

                if (p2 === 4) return 100;
                if (p2 === 3 && empty === 1) return 5;
                if (p2 === 2 && empty === 2) return 2;
                if (p1 === 3 && empty === 1) return -50;
                return 0;
            };

            // Horizontal windows
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    score += evaluateWindow([board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]]);
                }
            }

            // Vertical windows
            for (let c = 0; c < COLS; c++) {
                for (let r = 0; r <= ROWS - 4; r++) {
                    score += evaluateWindow([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]]);
                }
            }

            // Diagonal windows (positive slope)
            for (let r = 0; r <= ROWS - 4; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    score += evaluateWindow([board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]]);
                }
            }

            // Diagonal windows (negative slope)
            for (let r = 3; r < ROWS; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    score += evaluateWindow([board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3]]);
                }
            }

            return score;
        },

        getValidCols(board) {
            const cols = [];
            for (let c = 0; c < COLS; c++) {
                if (board[ROWS - 1][c] === 0) cols.push(c);
            }
            return cols;
        },

        getNextRow(board, col) {
            for (let r = 0; r < ROWS; r++) {
                if (board[r][col] === 0) return r;
            }
            return -1;
        },

        makeMove(board, col, player) {
            const newBoard = board.map(row => [...row]);
            const row = this.getNextRow(newBoard, col);
            if (row >= 0) newBoard[row][col] = player;
            return newBoard;
        },

        checkMoveWins(board, col, player) {
            const newBoard = this.makeMove(board, col, player);
            return this.checkWin(newBoard, player);
        },

        checkWin(board, player) {
            // Horizontal
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    if (board[r][c] === player && board[r][c + 1] === player &&
                        board[r][c + 2] === player && board[r][c + 3] === player) {
                        return true;
                    }
                }
            }

            // Vertical
            for (let c = 0; c < COLS; c++) {
                for (let r = 0; r <= ROWS - 4; r++) {
                    if (board[r][c] === player && board[r + 1][c] === player &&
                        board[r + 2][c] === player && board[r + 3][c] === player) {
                        return true;
                    }
                }
            }

            // Diagonal (positive slope)
            for (let r = 0; r <= ROWS - 4; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    if (board[r][c] === player && board[r + 1][c + 1] === player &&
                        board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
                        return true;
                    }
                }
            }

            // Diagonal (negative slope)
            for (let r = 3; r < ROWS; r++) {
                for (let c = 0; c <= COLS - 4; c++) {
                    if (board[r][c] === player && board[r - 1][c + 1] === player &&
                        board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
                        return true;
                    }
                }
            }

            return false;
        }
    };

    // =====================================================
    // ACHIEVEMENTS MANAGER
    // =====================================================

    const Achievements = {
        data: {},
        notifications: [],

        init() {
            const saved = Storage.get(STORAGE_KEYS.ACHIEVEMENTS, {});
            ACHIEVEMENTS_DATA.forEach(ach => {
                this.data[ach.id] = {
                    ...ach,
                    progress: saved[ach.id]?.progress || 0,
                    unlocked: saved[ach.id]?.unlocked || false
                };
            });
        },

        save() {
            const toSave = {};
            Object.values(this.data).forEach(ach => {
                toSave[ach.id] = { progress: ach.progress, unlocked: ach.unlocked };
            });
            Storage.set(STORAGE_KEYS.ACHIEVEMENTS, toSave);
        },

        setProgress(id, value) {
            const ach = this.data[id];
            if (!ach || ach.unlocked) return false;

            ach.progress = Math.min(value, ach.target);

            if (ach.progress >= ach.target) {
                ach.unlocked = true;
                this.notifications.push(ach);
            }

            this.save();
            return ach.unlocked;
        },

        unlock(id) {
            const ach = this.data[id];
            if (!ach || ach.unlocked) return false;

            ach.progress = ach.target;
            ach.unlocked = true;
            this.notifications.push(ach);
            this.save();
            return true;
        },

        getNotification() {
            return this.notifications.shift();
        },

        getAll() {
            return Object.values(this.data);
        },

        getUnlockedCount() {
            return this.getAll().filter(a => a.unlocked).length;
        }
    };

    // =====================================================
    // MAIN GAME OBJECT
    // =====================================================

    const Game = {
        // Game state
        board: [],
        currentPlayer: 1,
        gameOver: false,
        winner: null,
        winningCells: [],
        vsAI: false,
        difficulty: 'medium',
        moves: 0,
        startTime: null,
        timerInterval: null,
        lastPlacedCell: null,

        // User data
        username: 'Player',
        stats: null,
        settings: null,

        // =====================================================
        // INITIALIZATION
        // =====================================================

        init() {
            this.loadData();
            Achievements.init();
            this.setupEventListeners();
            this.applyTheme(this.settings.theme);

            // Show loading then go to menu (no login required)
            setTimeout(() => {
                this.showScreen('menu');
                this.updateMenuStats();
            }, 800);
        },

        loadData() {
            this.stats = Storage.get(STORAGE_KEYS.STATS, {
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                draws: 0,
                currentStreak: 0,
                bestStreak: 0,
                totalMoves: 0,
                fastestWin: null,
                aiWins: { easy: 0, medium: 0, hard: 0, expert: 0 },
                winTypes: { horizontal: false, vertical: false, diagonal: false }
            });

            this.settings = Storage.get(STORAGE_KEYS.SETTINGS, {
                theme: 'sunny',
                sound: true,
                animations: true,
                themesUsed: ['sunny']
            });
        },

        saveStats() {
            Storage.set(STORAGE_KEYS.STATS, this.stats);
        },

        saveSettings() {
            Storage.set(STORAGE_KEYS.SETTINGS, this.settings);
        },

        // =====================================================
        // EVENT LISTENERS
        // =====================================================

        setupEventListeners() {
            // Menu buttons
            document.querySelectorAll('.menu-btn').forEach(btn => {
                btn.addEventListener('click', () => this.showScreen(btn.dataset.screen));
            });

            // Back buttons
            document.querySelectorAll('.back-btn').forEach(btn => {
                btn.addEventListener('click', () => this.showScreen(btn.dataset.screen));
            });

            // Mode selection
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.addEventListener('click', () => this.handleModeSelect(btn.dataset.mode));
            });

            // Difficulty selection
            document.querySelectorAll('.difficulty-btn').forEach(btn => {
                btn.addEventListener('click', () => this.handleDifficultySelect(btn.dataset.difficulty));
            });

            // Game controls
            document.getElementById('quit-game-btn').addEventListener('click', () => this.quitGame());
            document.getElementById('restart-game-btn').addEventListener('click', () => this.resetGame());

            // Game over modal
            document.getElementById('play-again-btn').addEventListener('click', () => {
                this.hideModal('game-over-modal');
                this.resetGame();
            });

            document.getElementById('back-to-menu-btn').addEventListener('click', () => {
                this.hideModal('game-over-modal');
                this.showScreen('menu');
                this.updateMenuStats();
            });

            // Achievement filters
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => this.filterAchievements(btn.dataset.filter));
            });

            // Settings toggles
            document.getElementById('sound-toggle').addEventListener('change', (e) => {
                this.settings.sound = e.target.checked;
                this.saveSettings();
            });

            document.getElementById('animations-toggle').addEventListener('change', (e) => {
                this.settings.animations = e.target.checked;
                this.saveSettings();
            });

            // Reset buttons
            document.getElementById('reset-stats-btn').addEventListener('click', () => this.resetStats());
            document.getElementById('reset-all-btn').addEventListener('click', () => this.resetAll());

            // Render themes
            this.renderThemes();
        },

        // =====================================================
        // SCREEN MANAGEMENT
        // =====================================================

        showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const screen = document.getElementById(`${screenId}-screen`);
            if (screen) {
                screen.classList.add('active');

                // Screen-specific updates
                if (screenId === 'menu') this.updateMenuStats();
                if (screenId === 'stats') this.updateStatsScreen();
                if (screenId === 'achievements') this.renderAchievements();
            }
        },

        showModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        },

        hideModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        },

        // =====================================================
        // MODE & DIFFICULTY SELECTION
        // =====================================================

        handleModeSelect(mode) {
            if (mode === 'local') {
                this.vsAI = false;
                this.startGame();
            } else {
                this.vsAI = true;
                this.showScreen('difficulty');
            }
        },

        handleDifficultySelect(difficulty) {
            this.difficulty = difficulty;
            this.startGame();
        },

        // =====================================================
        // GAME LOGIC
        // =====================================================

        startGame() {
            this.resetBoard();
            this.showScreen('game');
            this.renderBoard();
            this.renderDropZone();
            this.updateTurnDisplay();
            this.startTimer();
        },

        resetBoard() {
            this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
            this.currentPlayer = 1;
            this.gameOver = false;
            this.winner = null;
            this.winningCells = [];
            this.moves = 0;
            this.lastPlacedCell = null;
            document.getElementById('move-counter').textContent = '0';

            // Remove any existing win line overlay
            const existingOverlay = document.querySelector('.win-line-overlay');
            if (existingOverlay) existingOverlay.remove();
        },

        resetGame() {
            this.resetBoard();
            this.renderBoard();
            this.renderDropZone();
            this.updateTurnDisplay();
            this.startTimer();
        },

        quitGame() {
            this.stopTimer();
            this.showScreen('menu');
            this.updateMenuStats();
        },

        // FIXED: Only animate the newly placed piece, not all pieces
        renderBoard() {
            const boardEl = document.getElementById('game-board');
            boardEl.innerHTML = '';

            // Render from top (row 5) to bottom (row 0) visually
            for (let r = ROWS - 1; r >= 0; r--) {
                for (let c = 0; c < COLS; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = r;
                    cell.dataset.col = c;
                    cell.addEventListener('click', () => this.handleCellClick(c));

                    if (this.board[r][c] !== 0) {
                        const piece = document.createElement('div');
                        const color = this.board[r][c] === 1 ? 'red' : 'yellow';
                        piece.className = `piece ${color}`;

                        // Only add dropping animation to the LAST placed piece
                        if (this.settings.animations &&
                            this.lastPlacedCell &&
                            this.lastPlacedCell.row === r &&
                            this.lastPlacedCell.col === c) {
                            piece.classList.add('dropping');
                        }

                        // Add winning class to winning pieces
                        if (this.winningCells.some(([wr, wc]) => wr === r && wc === c)) {
                            piece.classList.add('winning');
                        }

                        cell.appendChild(piece);
                    }

                    boardEl.appendChild(cell);
                }
            }
        },

        renderDropZone() {
            const dropZone = document.getElementById('drop-zone');
            dropZone.innerHTML = '';

            for (let c = 0; c < COLS; c++) {
                const indicator = document.createElement('div');
                indicator.className = 'drop-indicator';
                indicator.addEventListener('click', () => this.handleCellClick(c));

                const preview = document.createElement('div');
                const color = this.currentPlayer === 1 ? 'red' : 'yellow';
                preview.className = `drop-preview ${color}`;

                indicator.appendChild(preview);
                dropZone.appendChild(indicator);
            }
        },

        updateTurnDisplay() {
            const piece = document.getElementById('turn-indicator');
            const text = document.getElementById('turn-text');

            piece.className = `turn-piece ${this.currentPlayer === 1 ? 'red' : 'yellow'}`;

            if (this.vsAI) {
                text.textContent = this.currentPlayer === 1 ? 'Your Turn' : 'AI Thinking...';
            } else {
                text.textContent = this.currentPlayer === 1 ? "Red's Turn" : "Yellow's Turn";
            }
        },

        handleCellClick(col) {
            if (this.gameOver) return;
            if (this.vsAI && this.currentPlayer === 2) return;

            const row = this.getNextRow(col);
            if (row === -1) return;

            this.placePiece(row, col, this.currentPlayer);
        },

        getNextRow(col) {
            for (let r = 0; r < ROWS; r++) {
                if (this.board[r][col] === 0) return r;
            }
            return -1;
        },

        placePiece(row, col, player) {
            this.board[row][col] = player;
            this.moves++;
            this.lastPlacedCell = { row, col };

            document.getElementById('move-counter').textContent = this.moves;

            this.renderBoard();
            this.playSound('drop');

            // Check for win
            const winResult = this.checkWin(player);
            if (winResult) {
                this.winningCells = winResult.cells;
                this.winner = player;
                this.gameOver = true;
                this.lastPlacedCell = null;

                // Render winning pieces, then draw line, then show modal
                setTimeout(() => {
                    this.renderBoard();

                    setTimeout(() => {
                        this.drawWinningLine(winResult.cells);

                        setTimeout(() => {
                            this.handleGameOver(winResult.type);
                        }, 1200);
                    }, 300);
                }, 100);
                return;
            }

            // Check for draw
            if (this.checkDraw()) {
                this.winner = 0;
                this.gameOver = true;
                setTimeout(() => this.handleGameOver(null), 500);
                return;
            }

            // Switch player
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.updateTurnDisplay();
            this.renderDropZone();

            // AI turn
            if (this.vsAI && this.currentPlayer === 2 && !this.gameOver) {
                setTimeout(() => this.makeAIMove(), 600);
            }
        },

        makeAIMove() {
            const col = AI.getMove(this.board, this.difficulty);
            if (col >= 0) {
                const row = this.getNextRow(col);
                if (row >= 0) {
                    this.placePiece(row, col, 2);
                }
            }
        },

        checkWin(player) {
            const check = (r, c, dr, dc) => {
                const cells = [];
                for (let i = 0; i < 4; i++) {
                    const nr = r + dr * i;
                    const nc = c + dc * i;
                    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return null;
                    if (this.board[nr][nc] !== player) return null;
                    cells.push([nr, nc]);
                }
                return cells;
            };

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    // Horizontal
                    let cells = check(r, c, 0, 1);
                    if (cells) return { type: 'horizontal', cells };

                    // Vertical
                    cells = check(r, c, 1, 0);
                    if (cells) return { type: 'vertical', cells };

                    // Diagonal (positive slope)
                    cells = check(r, c, 1, 1);
                    if (cells) return { type: 'diagonal', cells };

                    // Diagonal (negative slope)
                    cells = check(r, c, 1, -1);
                    if (cells) return { type: 'diagonal', cells };
                }
            }

            return null;
        },

        checkDraw() {
            return this.board[ROWS - 1].every(cell => cell !== 0);
        },

        // =====================================================
        // WINNING LINE ANIMATION
        // =====================================================

        drawWinningLine(cells) {
            const boardEl = document.getElementById('game-board');
            const gameArea = document.querySelector('.game-area');

            // Add flash and shake effects
            boardEl.classList.add('flash-win');
            gameArea.classList.add('shake');

            setTimeout(() => {
                boardEl.classList.remove('flash-win');
                gameArea.classList.remove('shake');
            }, 400);

            // Get cell dimensions
            const cellElements = boardEl.querySelectorAll('.cell');
            if (cellElements.length === 0) return;

            const computedStyle = getComputedStyle(boardEl);
            const gap = parseInt(computedStyle.gap) || 6;
            const padding = parseInt(computedStyle.padding) || 14;
            const firstCell = cellElements[0];
            const cellSize = firstCell.offsetWidth;

            // Function to convert board coordinates to pixel positions
            const getPixelPos = (row, col) => {
                const visualRow = ROWS - 1 - row; // Flip because board renders top-down
                const x = padding + col * (cellSize + gap) + cellSize / 2;
                const y = padding + visualRow * (cellSize + gap) + cellSize / 2;
                return { x, y };
            };

            // Get positions for all 4 winning cells
            const positions = cells.map(([r, c]) => getPixelPos(r, c));
            const start = positions[0];
            const end = positions[3];

            // Calculate line properties
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Create overlay container
            const overlay = document.createElement('div');
            overlay.className = 'win-line-overlay';

            // Create glowing dots at each winning piece
            positions.forEach((pos) => {
                const dot = document.createElement('div');
                dot.className = 'win-dot';
                dot.style.left = `${pos.x}px`;
                dot.style.top = `${pos.y}px`;
                overlay.appendChild(dot);
            });

            // Create the main line
            const line = document.createElement('div');
            line.className = 'win-line';
            line.style.width = `${length + 30}px`;
            line.style.left = `${start.x - 15}px`;
            line.style.top = `${start.y - 6}px`;
            line.style.transform = `rotate(${angle}deg)`;

            overlay.appendChild(line);
            boardEl.appendChild(overlay);

            // Play win sound
            this.playSound('win');
        },

        // =====================================================
        // GAME OVER
        // =====================================================

        handleGameOver(winType) {
            this.stopTimer();
            const time = this.getElapsedTime();

            // Update stats
            this.stats.gamesPlayed++;
            this.stats.totalMoves += Math.ceil(this.moves / 2);

            if (this.winner === 1) {
                this.stats.wins++;
                this.stats.currentStreak++;
                this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.currentStreak);

                if (!this.stats.fastestWin || time < this.stats.fastestWin) {
                    this.stats.fastestWin = time;
                }

                if (this.vsAI) {
                    this.stats.aiWins[this.difficulty]++;
                }

                if (winType) {
                    this.stats.winTypes[winType] = true;
                }
            } else if (this.winner === 2) {
                this.stats.losses++;
                this.stats.currentStreak = 0;
            } else {
                this.stats.draws++;
            }

            this.saveStats();

            // Check achievements
            this.checkAchievements(time, winType);

            // Show game over modal
            this.showGameOverModal(time);
        },

        checkAchievements(time, winType) {
            const s = this.stats;

            // Games played achievements
            Achievements.setProgress('play_10', s.gamesPlayed);
            Achievements.setProgress('play_25', s.gamesPlayed);
            Achievements.setProgress('play_50', s.gamesPlayed);
            Achievements.setProgress('play_100', s.gamesPlayed);
            Achievements.setProgress('play_250', s.gamesPlayed);
            Achievements.setProgress('play_500', s.gamesPlayed);

            // Moves achievements
            Achievements.setProgress('moves_100', s.totalMoves);
            Achievements.setProgress('moves_500', s.totalMoves);
            Achievements.setProgress('moves_1000', s.totalMoves);
            Achievements.setProgress('moves_5000', s.totalMoves);

            if (this.winner === 1) {
                // Win achievements
                Achievements.setProgress('win_1', s.wins);
                Achievements.setProgress('win_5', s.wins);
                Achievements.setProgress('win_10', s.wins);
                Achievements.setProgress('win_25', s.wins);
                Achievements.setProgress('win_50', s.wins);
                Achievements.setProgress('win_100', s.wins);
                Achievements.setProgress('win_200', s.wins);
                Achievements.setProgress('win_500', s.wins);

                // Streak achievements
                Achievements.setProgress('streak_3', s.currentStreak);
                Achievements.setProgress('streak_5', s.currentStreak);
                Achievements.setProgress('streak_7', s.currentStreak);
                Achievements.setProgress('streak_10', s.currentStreak);

                // Speed achievements
                if (time <= 20) Achievements.unlock('speed_20');
                else if (time <= 30) Achievements.unlock('speed_30');
                else if (time <= 45) Achievements.unlock('speed_45');
                else if (time <= 60) Achievements.unlock('speed_60');

                // AI achievements
                if (this.vsAI) {
                    const d = this.difficulty;
                    Achievements.unlock(`ai_${d}`);
                    Achievements.setProgress(`ai_${d}_10`, s.aiWins[d]);
                    if (d === 'expert') Achievements.setProgress('ai_expert_5', s.aiWins[d]);
                }

                // Win type achievements
                if (winType) {
                    Achievements.unlock(`win_${winType}`);
                    const typesUnlocked = Object.values(s.winTypes).filter(Boolean).length;
                    Achievements.setProgress('win_all', typesUnlocked);
                }

                // Perfect game
                if (Math.ceil(this.moves / 2) <= 7) {
                    Achievements.unlock('perfect');
                }

                // Weekend warrior
                const day = new Date().getDay();
                if (day === 0 || day === 6) {
                    Achievements.unlock('weekend');
                }
            } else if (this.winner === 0) {
                // Draw achievements
                Achievements.setProgress('draw_1', s.draws);
                Achievements.setProgress('draw_5', s.draws);
                Achievements.setProgress('draw_10', s.draws);
            }

            // Time-based achievements
            const hour = new Date().getHours();
            if (hour >= 0 && hour < 5) Achievements.unlock('night_owl');
            if (hour >= 5 && hour < 7) Achievements.unlock('early_bird');

            // Show notifications
            this.showAchievementNotifications();
        },

        showAchievementNotifications() {
            const showNext = () => {
                const ach = Achievements.getNotification();
                if (ach) {
                    this.showAchievementToast(ach);
                    setTimeout(showNext, 3500);
                }
            };
            setTimeout(showNext, 500);
        },

        showAchievementToast(ach) {
            const toast = document.getElementById('achievement-toast');
            document.getElementById('toast-achievement-name').textContent = ach.name;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        },

        showGameOverModal(time) {
            const resultPiece = document.getElementById('result-piece');
            const resultTitle = document.getElementById('result-title');
            const resultSubtitle = document.getElementById('result-subtitle');

            if (this.winner === 1) {
                resultPiece.className = 'result-piece red';
                resultTitle.textContent = this.vsAI ? 'You Win!' : 'Red Wins!';
                resultSubtitle.textContent = this.vsAI ? `You beat the ${this.difficulty} AI!` : 'Great game!';
                this.createConfetti();
            } else if (this.winner === 2) {
                resultPiece.className = 'result-piece yellow';
                resultTitle.textContent = this.vsAI ? 'AI Wins!' : 'Yellow Wins!';
                resultSubtitle.textContent = this.vsAI ? 'Better luck next time!' : 'Great game!';
            } else {
                resultPiece.className = 'result-piece draw';
                resultTitle.textContent = "It's a Draw!";
                resultSubtitle.textContent = 'Well matched!';
            }

            document.getElementById('result-moves').textContent = this.moves;
            document.getElementById('result-time').textContent = this.formatTime(time);

            this.showModal('game-over-modal');
        },

        createConfetti() {
            const container = document.getElementById('confetti-container');
            container.innerHTML = '';

            if (!this.settings.animations) return;

            const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA'];

            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                container.appendChild(confetti);
            }
        },

        // =====================================================
        // TIMER
        // =====================================================

        startTimer() {
            this.startTime = Date.now();
            this.stopTimer();
            this.timerInterval = setInterval(() => {
                document.getElementById('game-timer').textContent = this.formatTime(this.getElapsedTime());
            }, 1000);
        },

        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },

        getElapsedTime() {
            return Math.floor((Date.now() - this.startTime) / 1000);
        },

        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },

        // =====================================================
        // MENU STATS
        // =====================================================

        updateMenuStats() {
            document.getElementById('header-username').textContent = this.username;
            document.getElementById('welcome-username').textContent = this.username;
            document.getElementById('menu-wins').textContent = this.stats.wins;
            document.getElementById('menu-games').textContent = this.stats.gamesPlayed;
            document.getElementById('menu-achievements').textContent = Achievements.getUnlockedCount();
        },

        // =====================================================
        // STATISTICS SCREEN
        // =====================================================

        updateStatsScreen() {
            const s = this.stats;

            document.getElementById('stats-games').textContent = s.gamesPlayed;
            document.getElementById('stats-wins').textContent = s.wins;
            document.getElementById('stats-losses').textContent = s.losses;
            document.getElementById('stats-draws').textContent = s.draws;

            const winRate = s.gamesPlayed > 0 ? Math.round((s.wins / s.gamesPlayed) * 100) : 0;
            document.getElementById('stats-winrate').textContent = `${winRate}%`;

            document.getElementById('stats-streak').textContent = s.bestStreak;
            document.getElementById('stats-fastest').textContent = s.fastestWin ? this.formatTime(s.fastestWin) : '--';
            document.getElementById('stats-moves').textContent = s.totalMoves;

            document.getElementById('ai-wins-easy').textContent = s.aiWins.easy;
            document.getElementById('ai-wins-medium').textContent = s.aiWins.medium;
            document.getElementById('ai-wins-hard').textContent = s.aiWins.hard;
            document.getElementById('ai-wins-expert').textContent = s.aiWins.expert;
        },

        // =====================================================
        // ACHIEVEMENTS SCREEN
        // =====================================================

        renderAchievements(filter = 'all') {
            const list = document.getElementById('achievements-list');
            list.innerHTML = '';

            let achievements = Achievements.getAll();

            if (filter === 'unlocked') achievements = achievements.filter(a => a.unlocked);
            if (filter === 'locked') achievements = achievements.filter(a => !a.unlocked);

            document.getElementById('achievements-unlocked').textContent = Achievements.getUnlockedCount();

            achievements.forEach(ach => {
                const item = document.createElement('div');
                item.className = `achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}`;

                const progressPercent = Math.min((ach.progress / ach.target) * 100, 100);
                const progressHTML = ach.target > 1 ? `
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="achievement-progress-text">${ach.progress} / ${ach.target}</div>
                ` : '';

                const iconSvg = ACHIEVEMENT_ICONS[ach.icon] || ACHIEVEMENT_ICONS.star;

                item.innerHTML = `
                    <div class="achievement-icon">${iconSvg}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${ach.name}</div>
                        <div class="achievement-desc">${ach.desc}</div>
                        ${progressHTML}
                    </div>
                `;

                list.appendChild(item);
            });
        },

        filterAchievements(filter) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            this.renderAchievements(filter);
        },

        // =====================================================
        // SETTINGS
        // =====================================================

        renderThemes() {
            const container = document.getElementById('theme-options');
            container.innerHTML = '';

            THEMES.forEach(theme => {
                const option = document.createElement('div');
                option.className = `theme-option ${this.settings.theme === theme.id ? 'active' : ''}`;
                option.dataset.theme = theme.id;
                option.innerHTML = `
                    <div class="theme-color" style="background: ${theme.color}"></div>
                    <div class="theme-name">${theme.name}</div>
                `;
                option.addEventListener('click', () => this.selectTheme(theme.id));
                container.appendChild(option);
            });

            document.getElementById('sound-toggle').checked = this.settings.sound;
            document.getElementById('animations-toggle').checked = this.settings.animations;
        },

        selectTheme(themeId) {
            this.settings.theme = themeId;

            // Track themes used for achievement
            if (!this.settings.themesUsed.includes(themeId)) {
                this.settings.themesUsed.push(themeId);
                Achievements.setProgress('themes', this.settings.themesUsed.length);
                this.showAchievementNotifications();
            }

            this.saveSettings();
            this.applyTheme(themeId);
            this.renderThemes();
        },

        applyTheme(themeId) {
            if (themeId === 'sunny') {
                document.body.removeAttribute('data-theme');
            } else {
                document.body.dataset.theme = themeId;
            }
        },

        resetStats() {
            if (confirm('Reset all statistics? This cannot be undone.')) {
                this.stats = {
                    gamesPlayed: 0,
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    currentStreak: 0,
                    bestStreak: 0,
                    totalMoves: 0,
                    fastestWin: null,
                    aiWins: { easy: 0, medium: 0, hard: 0, expert: 0 },
                    winTypes: { horizontal: false, vertical: false, diagonal: false }
                };
                this.saveStats();
                this.updateStatsScreen();
                alert('Statistics reset!');
            }
        },

        resetAll() {
            if (confirm('Reset ALL data including achievements? This cannot be undone.')) {
                Object.values(STORAGE_KEYS).forEach(key => Storage.remove(key));
                location.reload();
            }
        },

        // =====================================================
        // SOUND EFFECTS
        // =====================================================

        playSound(type) {
            if (!this.settings.sound) return;

            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();

                if (type === 'drop') {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(600, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
                    gain.gain.setValueAtTime(0.3, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.15);

                } else if (type === 'win') {
                    // Victory fanfare - ascending notes
                    const notes = [
                        { freq: 523, time: 0, duration: 0.15 },     // C5
                        { freq: 659, time: 0.12, duration: 0.15 },  // E5
                        { freq: 784, time: 0.24, duration: 0.15 },  // G5
                        { freq: 1047, time: 0.36, duration: 0.4 }   // C6 (held longer)
                    ];

                    notes.forEach(note => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.value = note.freq;

                        gain.gain.setValueAtTime(0, ctx.currentTime + note.time);
                        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + note.time + 0.02);
                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.time + note.duration);

                        osc.start(ctx.currentTime + note.time);
                        osc.stop(ctx.currentTime + note.time + note.duration);
                    });

                    // Add shimmer effect
                    for (let i = 0; i < 5; i++) {
                        const shimmer = ctx.createOscillator();
                        const shimmerGain = ctx.createGain();
                        shimmer.connect(shimmerGain);
                        shimmerGain.connect(ctx.destination);
                        shimmer.type = 'sine';
                        shimmer.frequency.value = 1500 + Math.random() * 1000;
                        shimmerGain.gain.setValueAtTime(0, ctx.currentTime + 0.5 + i * 0.08);
                        shimmerGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.52 + i * 0.08);
                        shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7 + i * 0.08);
                        shimmer.start(ctx.currentTime + 0.5 + i * 0.08);
                        shimmer.stop(ctx.currentTime + 0.8 + i * 0.08);
                    }
                }
            } catch {
                // Audio not supported - fail silently
            }
        }
    };

    // =====================================================
    // START THE GAME
    // =====================================================

    document.addEventListener('DOMContentLoaded', () => {
        Game.init();
    });

})();