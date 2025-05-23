abstract class EditorState {
  constructor(protected editor: Editor) {}

  abstract handleInput(): void;
  abstract save(): void;
  abstract saveAs(): void;
}

class CleanUnsavedState extends EditorState {
  handleInput(): void {
    this.editor.setState(new DirtyUnsavedState(this.editor));
    this.editor.setStateLabel("*");
  }

  save(): void {
    this.editor.promptSaveAs();
  }

  saveAs(): void {
    this.editor.performSaveAs();
  }
}

class CleanSavedState extends EditorState {
  handleInput(): void {
    this.editor.setState(new DirtySavedState(this.editor));
    this.editor.setStateLabel(`${this.editor.openFile} *`);
  }

  save(): void {
    this.editor.performSave();
  }

  saveAs(): void {
    this.editor.performSaveAs();
  }
}

class DirtyUnsavedState extends EditorState {
  handleInput(): void {
    // No state change needed
  }

  save(): void {
    this.editor.promptSaveAs();
  }

  saveAs(): void {
    this.editor.performSaveAs();
  }
}

class DirtySavedState extends EditorState {
  handleInput(): void {
    // No state change needed
  }

  save(): void {
    this.editor.performSave();
  }

  saveAs(): void {
    this.editor.performSaveAs();
  }
}

class Editor {
  private state: EditorState;
  public openFile: string | undefined;

  constructor(private textArea: HTMLTextAreaElement) {
    this.state = new CleanUnsavedState(this);
  }

  setState(state: EditorState): void {
    this.state = state;
  }

  setStateLabel(label: string): void {
    const stateLabel = document.getElementById("state-label");
    stateLabel.innerText = label;
  }

  handleInput(): void {
    this.state.handleInput();
  }

  save(): void {
    this.state.save();
  }

  saveAs(): void {
    this.state.saveAs();
  }

  performSave(): void {
    const content = this.textArea.value;
    if (this.openFile) {
      localStorage.setItem(this.openFile, content);
      this.setState(new CleanSavedState(this));
      this.setStateLabel(this.openFile);
      showFiles(listFiles(), "files-list");
    }
  }

  performSaveAs(): void {
    const content = this.textArea.value;
    let filename = prompt("Enter a File Name", "");
    if (filename && filename.trim() !== "") {
      if (!filename.endsWith(".txt")) {
        filename += ".txt";
      }
      localStorage.setItem(filename, content);
      this.openFile = filename;
      this.setState(new CleanSavedState(this));
      this.setStateLabel(filename);
      showFiles(listFiles(), "files-list");
    }
  }

  promptSaveAs(): void {
    this.performSaveAs();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("text") as HTMLTextAreaElement;
  const editor = new Editor(textArea);

  textArea.addEventListener("input", () => editor.handleInput());

  const saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", () => editor.save());

  const saveAsButton = document.getElementById("save-as-button");
  saveAsButton.addEventListener("click", () => editor.saveAs());

  const newButton = document.getElementById("new-button");
  newButton.addEventListener("click", () => {
    editor.setState(new CleanUnsavedState(editor));
    textArea.value = "";
    editor.openFile = undefined;
    editor.setStateLabel("_");
  });

  document.addEventListener("contextmenu", (event) => {
    alert("Wanna steal my source code, huh!?");
    event.preventDefault();
    return false;
  });

  showFiles(listFiles(), "files-list");
});

function showFiles(files: string[], parentId: string) {
  const parent = document.getElementById(parentId);
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
  for (const file of files) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.innerHTML = file;
    item.appendChild(link);
    parent.append(item);
    link.addEventListener("click", () => {
      const content = localStorage.getItem(file);
      const textArea = document.getElementById("text") as HTMLTextAreaElement;
      const editor = new Editor(textArea);
      editor.openFile = file;
      textArea.value = content;
      editor.setState(new CleanSavedState(editor));
      editor.setStateLabel(file);
    });
  }
}

function listFiles(): string[] {
  const files: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    files.push(localStorage.key(i));
  }
  return files;
}
