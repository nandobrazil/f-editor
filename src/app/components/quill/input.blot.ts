import Inline from 'quill/blots/inline';
import {IVariable} from "@components/quill/IVariable";

// Custom Inline Blot to behave like an input
class InputBlot extends Inline {
  static override className = 'ql-variable';
  static override create(variable: IVariable) {
    let node = super.create();
    console.log(variable);
    node.setAttribute('contenteditable', String(false));
    node.setAttribute('spellcheck', 'false');
    node.setAttribute('data-value', variable?.value || '');
    node.setAttribute('data-variable', JSON.stringify(variable) || '')

    node.innerText = variable?.value || ' ';

    return node;
  }

  static override formats(node: HTMLElement) {
    return node.getAttribute('data-value');
  }

  override format(name: string, value: string) {
    if (name === 'input') {
      this.domNode.setAttribute('data-value', value);
      this.domNode.innerText = value;  // Update the displayed text
    } else {
      super.format(name, value);
    }
  }

  static value(node: { getAttribute: (arg0: string) => any; }) {
    return node.getAttribute('data-value');
  }
}

InputBlot.blotName = 'input';
InputBlot.tagName = 'SPAN';  // You could use DIV or another tag

export default InputBlot;
