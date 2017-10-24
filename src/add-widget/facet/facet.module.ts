import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FacetComponent} from './facet-component';
import {FilterListComponent} from './filter-list-component';
import {FilterTagComponent} from './filter-tag-component';
import {SearchComponent} from './search-component';
import {SearchResultComponent} from './search-result-component';
import {CapitalizeFirstPipe} from './capitalize-first-character-pipe';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AddWidgetService} from '../service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule
    ],
    declarations: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        SearchComponent,
        SearchResultComponent,
        CapitalizeFirstPipe
    ],
    providers: [
        AddWidgetService
    ],
    exports: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        SearchComponent,
        SearchResultComponent,
        CapitalizeFirstPipe
    ]
})
export class FacetModule {
}
