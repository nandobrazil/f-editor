import {
  Component,
  ViewChild,
  type ElementRef,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Underline from 'ckeditor5';


@Component({
  selector: 'app-editorjs',
  standalone: true,
  imports: [],
  templateUrl: './editorjs.component.html',
  styleUrl: './editorjs.component.scss',
})
export default class EditorjsComponent implements OnInit, OnDestroy {
  @ViewChild('editorjs', { static: true }) editorContainer!: ElementRef;
  private editor!: EditorJS;

  ngOnInit(): void {
    this.editor = new EditorJS({
      holder: this.editorContainer.nativeElement,
      tools: {
        header: Header,
        list: List,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
      },
      autofocus: true,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy(); // Limpar o editor ao destruir o componente
  }
}
