// https://stackoverflow.com/q/34045777
const copyToClipboard = function copyStringToClipboard(content: string): void {
  const textareaElement: HTMLTextAreaElement | null = document.createElement('textarea');
  if (!textareaElement) {
    return;
  }

  textareaElement.contentEditable = 'true';
  textareaElement.readOnly = false;
  textareaElement.value = content;
  document.body.appendChild(textareaElement);

  const range: Range = document.createRange();
  range.selectNodeContents(textareaElement);

  const selection: Selection | null = window.getSelection();
  if (!selection) {
    return;
  }
  selection.removeAllRanges();
  selection.addRange(range);

  textareaElement.select();
  textareaElement.setSelectionRange(0, textareaElement.value.length);

  document.execCommand('copy');
  textareaElement.blur();

  document.body.removeChild(textareaElement);
};

export default copyToClipboard;
