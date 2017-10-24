import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardModule } from './board/board.module';
import { GridModule } from './grid/grid.module';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    CommonModule,
    BoardModule,
    GridModule
  ],
  exports: [
    BoardModule,
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