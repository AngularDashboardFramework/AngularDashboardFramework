import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';

import {AddGadgetComponent} from './add-gadget-component';
import {AddGadgetService} from './service';
import {FacetModule} from './facet/facet.module';

@NgModule({
    imports: [
        CommonModule,
        FacetModule,
        MatButtonModule
    ],
    declarations: [
        AddGadgetComponent
    ],
    providers: [
        AddGadgetService
    ],
    exports: [
        AddGadgetComponent
    ]
})
export class AddGadgetModule {
}

