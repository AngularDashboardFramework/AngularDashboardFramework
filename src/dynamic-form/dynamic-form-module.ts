import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormPropertyComponent } from './dynamic-form-property.component';
import { PropertyControlService } from './property-control.service';

@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicFormPropertyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormPropertyComponent
    ],
    providers: [
        PropertyControlService
    ]
})
export class DynamicFormModule {
}
