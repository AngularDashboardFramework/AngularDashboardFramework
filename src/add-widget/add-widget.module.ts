import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';

import {AddWidgetComponent} from './add-widget.component';
import {AddWidgetService} from './service';
import {FacetModule} from './facet/facet.module';

@NgModule({
    imports: [
        CommonModule,
        FacetModule,
        MatButtonModule
    ],
    declarations: [
        AddWidgetComponent
    ],
    providers: [
        AddWidgetService
    ],
    exports: [
        AddWidgetComponent
    ]
})
export class AddWidgetModule {
}

