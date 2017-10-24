import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetHeaderComponent} from './widget-header.component';
import {WidgetOperationComponent} from './widget-operation-control.component';
import {HelpModalComponent} from './help-modal.component';
import {VisDrillDownComponent} from './vis-drill-down.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WidgetHeaderComponent,
        WidgetOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent
    ],
    exports: [
        WidgetHeaderComponent,
        WidgetOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent
    ]
})
export class WidgetSharedModule {
}
