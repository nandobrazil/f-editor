import {Component} from '@angular/core';
import {QuillModule} from 'ngx-quill'
import Quill from "quill";
import {PageBreakBlot} from "./blots/page-break.blot";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [
    QuillModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss'
})
export default class QuillComponent {
  editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video'],
        ['insertPageBreak']
      ],
      handlers: {
        insertPageBreak: () => {
          const range = this.quill!.getSelection(true);
          console.log(this.quill)
          this.quill!.insertEmbed(range.index, 'pageBreak', true, Quill.sources.USER);
          console.log('insertPageBreak');
          // this.quill!.setSelection(range.index + 1, Quill.sources.SILENT);
        }
      },
      clipboard: true,
      syntax: true
    }
  };

  bool = true;
  texto: string = 'Hello';

  editorContent = '';

  quill: Quill | undefined;

  onEditorInitialized(editor: Quill) {
    this.quill = editor;
    Quill.register(PageBreakBlot);
  }

  log() {
    console.log(this.texto);
  }

}
