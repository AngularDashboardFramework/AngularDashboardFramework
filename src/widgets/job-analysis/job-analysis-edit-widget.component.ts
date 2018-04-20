import { ChangeDetectorRef, Component } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';

@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './job-analysis-edit-widget.component.html',
    styleUrls: [
        './ja.css'
    ]
})
export class JobAnalysisEditWidgetComponent extends DynamicFormComponent
{

}