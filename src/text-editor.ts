enum State {
  CleanUnsaved,
  CleanSaved,
  DirtyUnsaved,
  DirtySaved,
}

let state = State.CleanUnsaved;
let openFile = "";

document.addEventListener("DOMContentLoaded", () => {
  showFiles(listFiles(), "files-list");
  const textArea = document.getElementById("text");
  textArea.addEventListener("input", () => {
    if (state == State.CleanSaved) {
      state = State.DirtySaved;
      setStateLabel(`${openFile} *`);
    } else if (state == State.CleanUnsaved) {
      state = State.DirtyUnsaved;
      setStateLabel("*");
    }
  });
});

function setStateLabel(value: string) {
  const stateLabel = document.getElementById("state-label");
  stateLabel.innerText = value;
}

function showFiles(files: string[], parentId: string) {
  const parent = document.getElementById(parentId);
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
  for (const file of files) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("data-file-name", file);
    const text = document.createTextNode(file);
    link.appendChild(text);
    item.appendChild(link);
    parent.append(item);
  }
}

function saveFile(name: string, content: string) {
  localStorage.setItem(name, content);
}

function readFile(name: string): string {
  return localStorage.getItem(name);
}

function listFiles(): string[] {
  const files: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    files.push(localStorage.getItem(localStorage.key(i)));
  }
  return files;
}
