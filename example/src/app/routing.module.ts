import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
  		path: '',
		redirectTo: 'page',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'page/default/default'
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
// import { BoardComponent } from './page/board/board.component';
// import { Page } from './page/page.component';

// export const routes: Routes = [
//     {
//         path: '',
//         component: AppComponent,
//         children:

//             [
//                 {
//                     path: '',
//                     redirectTo: 'page',
//                     pathMatch: 'full'
//                 },
//                 {
//                     path: 'page',
//                     //component: BoardComponent
// 		            component: Page
//                 }
//             ]
//     }
// ];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class RoutingModule {
// }

