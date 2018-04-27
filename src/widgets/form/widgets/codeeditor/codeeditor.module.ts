import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// import { TinyMCEComponent } from "./tinymce.component";
import { AceEditorModule } from 'ng2-ace-editor';
import { CodeEditorWidget } from './codeeditor.widget';
// import { TinyMCEValueAccessor } from "./tinymce.valueaccessor";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AceEditorModule
    ],
    declarations: [
        // TinyMCEComponent,
        CodeEditorWidget,
        // TinyMCEValueAccessor
    ],
    entryComponents: [CodeEditorWidget],
    exports: [CodeEditorWidget]
})
export class CodeEditorWidgetModule { }
