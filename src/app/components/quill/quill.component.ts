import {Component, NgZone, ViewChild} from '@angular/core';
import {QuillModule} from 'ngx-quill'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {Button, ButtonDirective} from "primeng/button";
import {Editor, EditorModule} from "primeng/editor";
import Quill from "quill";
import {VirtualScrollerModule} from "primeng/virtualscroller";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TooltipModule} from "primeng/tooltip";
import {mockDataQuill} from "@components/quill/mock.data";
import InputBlot from "@components/quill/input.blot";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FloatLabelModule} from "primeng/floatlabel";
import {MessageService} from "primeng/api";
import {IVariable} from "@components/quill/IVariable";

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [
    QuillModule,
    FormsModule,
    CommonModule,
    DialogModule,
    Button,
    EditorModule,
    VirtualScrollerModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    ProgressSpinnerModule,
    TooltipModule,
    InputTextareaModule,
    FloatLabelModule,
  ],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss'
})
export default class QuillComponent {
  @ViewChild('editor') editor!: Editor;
  value: string = '';
  contentFilter: string = '';
  range: { index: number, length: number } = {index: 0, length: 0};
  visible: boolean = false;
  modalVariable: boolean = false;
  loading: boolean = false;

  items: { id: number, name: string }[] = mockDataQuill.items;
  content: any = mockDataQuill.content;
  contentSelected: { id: number, name: string } | undefined;
  variables: IVariable[] = [];

  form!: FormGroup;

  editorModules: EditorModule = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],
        [{'font': []}],
        [{'align': []}],
        ['clean', 'code-block'],
        ['link', 'image', 'video'],
        ['insertContent', 'insertField'],
      ],
      handlers: {
        insertContent: () => {
          this.ngZone.run(() => {
            this.range = this.editor.quill.getSelection(true);
            this.visible = true;
          });
        },
        insertField: () => {
          this.ngZone.run(() => {
            this.modalVariable = true;
          });
        }
      },
      clipboard: true,
      syntax: true,
    }
  };

  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    Quill.register(InputBlot, true);
    this.form = this.formBuilder.group({
      label: ['', Validators.required],
      description: [''],
      value: [''],
    });
  }

  selectContent(content: { id: number, name: string }) {
    this.loading = true;
    this.contentSelected = content;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  addContent() {
    if (!this.editor.quill) return;
    const Delta = Quill.import('delta');
    let index = this.range.index;
    this.content.forEach((deltaItem: any) => {
      const delta = new Delta().retain(index).insert(deltaItem?.insert, deltaItem?.attributes || {});
      this.editor.quill.updateContents(delta, Quill.sources.USER);
      index += deltaItem.insert.length;
    });
    this.editor.quill.setSelection(index, Quill.sources.SILENT);
    this.visible = false;
  }

  addVariable() {
    if (!this.editor.quill) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Preencha os campos obrigatórios'});
      return;
    }
    const variable: IVariable = {
      ... this.form.value,
      // position: this.,
    };
    this.variables.push(variable);
    if (this.range) {
      this.editor.quill.insertEmbed(this.range.index, 'input', variable, Quill.sources.USER);
      this.editor.quill.setSelection(this.range.index + (variable.value?.length || 0) + 2);  // Move cursor after input
    }
    this.modalVariable = false;
  }

  closeModalVariables() {
    this.modalVariable = false;
    this.form.reset();
  }

  getSelection() {
    if (!this.editor.quill) return;
    this.editor.quill.getSelection();
  }

}
