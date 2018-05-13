import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from './grid/grid.module';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    CommonModule,
    GridModule
  ],
  exports: [
    GridModule
  ]
})
export class AdfModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdfModule,
      providers: []
    };
  }
}
