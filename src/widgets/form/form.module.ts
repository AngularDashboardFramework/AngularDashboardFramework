import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import { NgaModule } from '../../../theme/nga.module';

// import { AppTranslationModule } from '../../../app.translation.module';

import { WidgetFactory } from '../../services/widget-factory';

import { Framework, JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService } from 'angular2-json-schema-form';
import { MaterialDesignFramework } from 'angular2-json-schema-form';
import { JsonSchemaFormModule, MaterialDesignFrameworkModule } from 'angular2-json-schema-form';
// import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";

import { CodeEditorWidgetModule } from './widgets/codeeditor/codeeditor.module';

import { FormWidgetComponent } from './form-widget.component';

import { FormEditWidgetComponent } from './form-edit-widget.component';

@NgModule({
    declarations: [
        FormWidgetComponent,
        FormEditWidgetComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // AppTranslationModule,
        MaterialDesignFrameworkModule,
        // JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule),
        // TODO: Fix, below is here because above isn't working.
        {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                { provide: Framework, useClass: MaterialDesignFramework, multi: true }
            ]
        },
        CodeEditorWidgetModule
    ],
    exports: [
        FormWidgetComponent,
        FormEditWidgetComponent
    ],
    providers: [
        // {
        //     provide: WidgetRegistry,
        //     useClass: DefaultWidgetRegistry
        // },
    ],
    entryComponents: [
        FormWidgetComponent,
        FormEditWidgetComponent
    ]
})
export class FormModule {
    constructor(widgetFactory: WidgetFactory) {
        widgetFactory.register('form', {
            component: FormWidgetComponent,
            editComponent: FormEditWidgetComponent
        });
    }
}
