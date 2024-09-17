import { BlockBlot } from 'parchment';

export class PageBreakBlot extends BlockBlot {
  static override blotName = 'pageBreak';
  static override tagName = 'div';

  static override create() {
    console.log('create');
    let node = super.create();
    node.classList.add('page-break-blot');
    return node;
  }

}
