document.addEventListener('DOMContentLoaded', () => {
    const words = [
        'javascript', 'hangman', 'developer', 'programming', 'coding',
        'moonlight', 'keyboard', 'algorithm', 'elephant', 'umbrella',
        'coffee', 'wizard', 'phoenix', 'ocean', 'paradise',
        'mountain', 'sunflower', 'galaxy', 'firefly', 'whisper',
        'sapphire', 'mystical', 'octopus', 'quasar', 'serendipity',
        'enchanted', 'harmony', 'lullaby', 'infinity', 'blissful',
        'serenity', 'labyrinth', 'butterfly', 'cascade', 'whimsical',
        'illusion', 'radiance', 'twilight', 'crescent', 'whistle',
        'ethereal', 'silhouette', 'captivate', 'tranquil', 'solitude',
        'melody', 'fireworks', 'constellation', 'sunset', 'nostalgia',
        'cascade', 'cascade', 'cathedral', 'harmonious', 'effervescent',
        'luminescent', 'effulgent', 'mellifluous', 'sonorous',
        'oscillation', 'susurrus', 'luminescence', 'ephemeral', 'labyrinthine',
        'zephyr', 'iridescent', 'petrichor', 'benevolent', 'ephemeral',
        'peregrinate', 'incandescent', 'insouciance', 'halcyon', 'evanescent',
        'penumbra', 'quintessence', 'plethora', 'propinquity', 'scintilla',
        'obfuscate', 'resplendent', 'vicissitude', 'efflorescence', 'ephemeral',
        'ephemeral', 'ephemeral', 'ephemeral', 'ephemeral', // Repeated for emphasis on variety
    ];
    let selectedWord = '';
    let wordDisplay = [];
    let incorrectLetters = [];
    let hangmanParts = ['head', 'body', 'arm-left', 'arm-right', 'leg-left', 'leg-right'];
    let hangmanIndex = 0;

    const wordDisplayElement = document.getElementById('word-display');
    const incorrectLettersElement = document.getElementById('incorrect-letters');
    const hangmanContainer = document.getElementById('hangman');
    const newGameButton = document.getElementById('new-game');

    function initializeGame() {
        // Select a random word
        selectedWord = words[Math.floor(Math.random() * words.length)];

        // Initialize word display
        wordDisplay = Array.from(selectedWord).fill('_');

        // Reset incorrect letters
        incorrectLetters = [];

        // Reset hangman display
        hangmanIndex = 0;
        updateHangmanDisplay();

        // Display initial state
        updateDisplay();
    }

    function updateDisplay() {
        wordDisplayElement.textContent = wordDisplay.join(' ');
        incorrectLettersElement.textContent = `Incorrect Letters: ${incorrectLetters.join(', ')}`;
    }

    function updateHangmanDisplay() {
        // Remove all hangman parts
        hangmanParts.forEach(part => {
            const partElement = document.querySelector(`#hangman .${part}`);
            if (partElement) {
                partElement.remove();
            }
        });
    
        // Add current hangman parts
        for (let i = 0; i < hangmanIndex; i++) {
            const partElement = document.createElement('div');
            partElement.classList.add(hangmanParts[i]);
            hangmanContainer.appendChild(partElement);
        }
    }
    

    function checkWin() {
        if (!wordDisplay.includes('_')) {
            alert('Congratulations! You guessed the word.');
            initializeGame();
        }
    }

    function checkLose() {
        if (hangmanIndex === hangmanParts.length) {
            alert(`Game over! The word was "${selectedWord}".`);
            initializeGame();
        }
    }

    function handleLetterGuess(letter) {
        if (selectedWord.includes(letter)) {
            // Update word display with correctly guessed letter
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    wordDisplay[i] = letter;
                }
            }
            checkWin();
        } else {
            // Incorrect guess
            incorrectLetters.push(letter);
            hangmanIndex++;
            updateHangmanDisplay();
            checkLose();
        }

        // Update display after each guess
        updateDisplay();
    }

    // Event listeners
    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key.toLowerCase();
        // Check if the key pressed is a letter
        if (keyPressed.length === 1 && keyPressed.match(/[a-z]/i)) {
            // Check if the letter has not been guessed before
            if (!wordDisplay.includes(keyPressed) && !incorrectLetters.includes(keyPressed)) {
                handleLetterGuess(keyPressed);
            }
        }
    });

    newGameButton.addEventListener('click', initializeGame);

    // Initialize the game
    initializeGame();
});
