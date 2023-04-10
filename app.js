const wordList = document.getElementById('word-list');
const randomizeButton = document.getElementById('randomize-button');
const uploadButton = document.getElementById('upload-button');
const uploadDialog = document.getElementById('upload-dialog');
const cancelButton = document.getElementById('cancel-button');
const wordsInput = document.getElementById('words-input');
const currentWordsList = document.getElementById('current-words-list');
let words = ['appel', 'zon', 'wolk', 'auto', 'bad', 'thee', 'brood', 'trap', 'hond', 'kat', 'bal', 'maan', 'pijl', 'boom', 'bom', 'vrachtwagen', 'boot', 'skateboard', 'schoenen', 'wortel', 'konijn', 'ijsje', 'eend', 'zonneschijn', 'kikker', 'brood', 'klok', 'snoep', 'melk', 'schildpad', 'telefoon', 'konijn', 'stoel', 'tafel', 'zweep', 'schotel', 'boter', 'bezem', 'ei', 'fiets', 'vlieger', 'sleutel', 'zaag', 'afstandsbediening', 'eiland', 'kerstman', 'wcpapier', 'dolfijn', 'paard', 'kapstok', 'wcborstel', 'tandenborstel', 'lantaarnpaal', 'kruiwagen', 'gordijnen', 'zonnebril', 'banaan', 'kamerplant', 'vlinder', 'computer', 'prullenbak', 'sinterklaas', 'paashaas', 'winkelwagen', 'legoblokje', 'hond', 'koe', 'varken', 'televisie', 'kerstboom', 'koptelefoon', 'rolstoel', 'lampion', 'verkeerslicht', 'banaan', 'peer', 'druiven', 'kokosnoot', 'palmboom', 'surfboard', 'golf', 'bloempot', 'kikker', 'koalabeer', 'uil', 'vleermuis', 'walvis', 'haai', 'kwal', 'cadeau', 'boodschappenkar', 'sjaal', 'telefoon', 'onderbroek', 'laars', 'rits', 'trui', 'paraplu', 'duikbril', 'snorkel', 'zwemvest', 'zwembandje', 'handdoek', 'narcis', 'tulp', 'zwembad', 'duikplank', 'engel', 'ster', 'sok', 'huilen', 'slee', 'nagellak', 'glijbaan', 'spiegel', 'broccoli', 'reuzenrad', 'botsauto'];
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
        listItem.textContent = word;
        wordList.appendChild(listItem);
    });
}

function showUploadDialog() {
    currentWordsList.textContent = words.join(', ');
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

currentWordsList.textContent = words.join(', ');
updateWordList(getRandomWords(6));
