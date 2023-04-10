const wordList = document.getElementById('word-list');
const randomizeButton = document.getElementById('randomize-button');
const uploadButton = document.getElementById('upload-button');
const uploadDialog = document.getElementById('upload-dialog');
const cancelButton = document.getElementById('cancel-button');
const wordsInput = document.getElementById('words-input');

let words = ['apple', 'banana', 'cherry', 'orange', 'pear', 'strawberry'];
let usedWords = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomWords(numWords) {
    let result = [];
    while (result.length < numWords && words.length > 0) {
        let index = getRandomInt(words.length);
        let word = words.splice(index, 1)[0];
        usedWords.push(word);
        result.push(word);
    }
    if (result.length < numWords) {
        words = usedWords;
        usedWords = [];
        while (result.length < numWords && words.length > 0) {
            let index = getRandomInt(words.length);
            let word = words.splice(index, 1)[0];
            usedWords.push(word);
            result.push(word);
        }
    }
    return result;
}

function updateWordList(words) {
    wordList.innerHTML = '';
    words.forEach(function(word, index) {
        let listItem = document.createElement('li');
        listItem.textContent =  word;
        wordList.appendChild(listItem);
    });
}

function showUploadDialog() {
    uploadDialog.style.display = 'block';
}

function hideUploadDialog() {
    uploadDialog.style.display = 'none';
}

function handleUploadFormSubmit(event) {
    event.preventDefault();
    let inputWords = wordsInput.value.trim();
    if (inputWords.length > 0) {
        words = inputWords.split(',');
        words = words.map(function(word) {
            return word.trim();
        });
        usedWords = [];
        updateWordList(getRandomWords(6));
        hideUploadDialog();
    }
}

randomizeButton.addEventListener('click', function() {
    updateWordList(getRandomWords(6));
});

uploadButton.addEventListener('click', showUploadDialog);

cancelButton.addEventListener('click', hideUploadDialog);

uploadDialog.querySelector('form').addEventListener('submit', handleUploadFormSubmit);

updateWordList(getRandomWords(6));
