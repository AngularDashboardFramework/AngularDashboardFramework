import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
    selector: 'sf-codeeditor-widget',
    templateUrl: './codeeditor.widget.html'
})
export class CodeEditorWidget implements OnInit {
    text: string = "";
    id: string = "editor";

    formControl: AbstractControl;
    controlName: string;
    controlValue: any;
    controlDisabled = false;
    boundControl = false;
    options: any;
    @Input() layoutNode: any;
    @Input() layoutIndex: number[];
    @Input() dataIndex: number[];

    constructor(
        private jsf: JsonSchemaFormService
    ) { }

    ngOnInit() {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }

    updateValue($event) {
        // console.log("CodeEditorWidget:updateValue", $event);
        this.jsf.updateValue(this, $event);
    }

    onChange($event) {
        // console.log("CodeEditorWidget:onChange", $event);
        this.jsf.updateValue(this, $event);
    }
}