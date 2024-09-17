import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
@Component({
  selector: 'app-ck-editor',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.scss'
})
export default class CkEditorComponent {
  title = 'angular';

  public Editor = ClassicEditor;
  public config = {
      toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
      plugins: [
          Bold, Essentials, Italic, Mention, Paragraph, Undo
      ],
      // mention: {
      //     Mention configuration
      // }
  }
}
