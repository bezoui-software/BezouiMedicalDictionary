chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(msg, sender, sendResponse) {
  if (msg.type == 'word-selected') {
    updateSelectedWord(msg.txt);
  }
}

async function updateSelectedWord(word) {
  window.selectedWord = evaluateSelectedWord(word);
  window.selectedWordDefinitions = '';

  if (window.selectedWord && window.selectedWord.length > 3) {
    window.selectedWordDefinitions = await getDefinitionOf(window.selectedWord);
  } 
}

async function getDefinitionOf(word) {
  const API_KEY = "cf7db60c-c603-4e8b-b56e-f46ff8be5947";
  const URL = `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=${API_KEY}`;

  const definition = await fetch(URL).then(gotResult).catch(gotError)

  async function gotResult(res) {
    let data = await res.json();
    return data;
  } 

  function gotError(err) {
    throw Error(err);
  }

  return definition;
}

function evaluateSelectedWord(word) {
  if (word) {
    word = word.replaceAll(' ', '');
    word = word.toLowerCase();
    return word;
  }
}