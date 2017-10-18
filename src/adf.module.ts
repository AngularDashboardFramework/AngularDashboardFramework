import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board/board.component';
import { GridModule } from './grid/grid.module';
import { BoardModule } from './board/board.module';
//import { DynamicFormModule } from './dynamic-form/dynamic-form-module';
//import { GadgetModule } from './gadgets/gadget.module';
//import { SampleDirective } from './sample.directive';
//import { SamplePipe } from './sample.pipe';
//import { SampleService } from './sample.service';


@NgModule({
  declarations: [
    //BoardComponent
    //GridComponent,
    //SampleDirective,
    //SamplePipe
  ],
  entryComponents: [
    //BoardComponent
  ],
  imports: [
    CommonModule,
    //GridModule,
    BoardModule
  ],
  exports: [
    //GridComponent,
    //GridModule,
    BoardModule
    //SampleDirective,
    //SamplePipe
  ]
})
export class AdfModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdfModule,
      //providers: [SampleService]
    };
  }
}