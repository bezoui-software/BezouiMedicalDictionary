function sendMessage(msg) {
  const params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTab);
  function gotTab(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

let bgpage = chrome.extension.getBackgroundPage();
let definitions = bgpage.selectedWordDefinitions;

for (let definition of definitions) {
  let selectedWordDefinitionInfo = definition;

  let selectedWord = bgpage.selectedWord || '';
  let selectedWordType = selectedWordDefinitionInfo.fl;
  let selectedWordElt = document.createElement('h1');
  selectedWordElt.classList.add('word-info-container');
  selectedWordElt.innerHTML = `${selectedWord} <span class="word-type">(${selectedWordType})</span>`;
  document.body.appendChild(selectedWordElt);

  let selectedWordDefinitions = selectedWordDefinitionInfo.shortdef || [];
  for (let def of selectedWordDefinitions) {
    let p = document.createElement('p');
    p.innerHTML = `- ${def}</br>`;
    document.body.appendChild(p);
  }
}