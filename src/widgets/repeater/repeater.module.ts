import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import { NgaModule } from '../../../theme/nga.module';

// import { BoardModule } from '../../board/board.module';
import { GridModule } from '../../grid/grid.module';

import { WidgetFactory } from '../../services/widget-factory';

import { RepeaterWidget } from './repeater-widget.component';
import { LayoutService } from '../../services/layout.service';

// import { SmartTableEditWidgetComponent } from './layout-edit-widget.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // NgaModule,
        // BoardModule,
        GridModule
    ],
    declarations: [
        RepeaterWidget,
        // SmartTableEditWidgetComponent
    ],
    exports: [
        RepeaterWidget,
        // SmartTableEditWidgetComponent
    ],
    providers: [
        LayoutService
    ],
    entryComponents: [
        RepeaterWidget,
        // SmartTableEditWidgetComponent
    ]
})
export class RepeaterModule {
    constructor(widgetFactory: WidgetFactory) {
        widgetFactory.register('repeater', {
            component: RepeaterWidget
            // ,
            // editComponent: SmartTableEditWidgetComponent
        });
    }

}
