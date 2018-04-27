import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import { NgaModule } from '../../../theme/nga.module';

// import { AppTranslationModule } from '../../../app.translation.module';

import { WidgetFactory } from '../../services/widget-factory';

// import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-json-schema-form";

import { DivWidgetComponent } from './div-widget.component';
import { H2WidgetComponent } from './h2-widget.component';
import { H3WidgetComponent } from './h3-widget.component';
import { ImgWidgetComponent } from './img-widget.component';
import { SpanWidgetComponent } from './span-widget.component';
// import { FormEditWidgetComponent } from './form-edit-widget.component';

@NgModule({
    declarations: [
        DivWidgetComponent,
        H2WidgetComponent,
        H3WidgetComponent,
        ImgWidgetComponent,
        SpanWidgetComponent,
        // FormEditWidgetComponent
    ],
    exports: [
        DivWidgetComponent,
        H2WidgetComponent,
        H3WidgetComponent,
        ImgWidgetComponent,
        SpanWidgetComponent,
        // FormEditWidgetComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // AppTranslationModule,
        // SchemaFormModule
    ],
    providers: [
        // { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    ],
    entryComponents: [
        DivWidgetComponent,
        H2WidgetComponent,
        H3WidgetComponent,
        ImgWidgetComponent,
        SpanWidgetComponent,
        // FormEditWidgetComponent
    ]
})
export class HtmlModule {
    constructor(widgetFactory: WidgetFactory) {
        widgetFactory.register('div', {
            component: DivWidgetComponent,
            // editComponent: FormEditWidgetComponent
        });
        widgetFactory.register('h2', {
            component: H2WidgetComponent,
            // editComponent: FormEditWidgetComponent
        });
        widgetFactory.register('h3', {
            component: H3WidgetComponent,
            // editComponent: FormEditWidgetComponent
        });
        widgetFactory.register('img', {
            component: ImgWidgetComponent,
            // editComponent: FormEditWidgetComponent
        });
        widgetFactory.register('span', {
            component: SpanWidgetComponent,
            // editComponent: FormEditWidgetComponent
        });

    }
}
