// import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { AppConfigService } from '../../../app.services';
// import { AppConfig } from '../../../model/appConfig';

// //import { Model } from '../../board';
// import { Layout } from './layout';

// @Injectable()
// export class LayoutService {
//     //private modelUrl = 'assets/board.model.json';
//     //private modelUrl = 'api-mock/apps/';
//     //private layoutUrl:string = '/assets/api/builder/layouts/';
//     private configLayoutServiceAPI: string = '';

//     private _layoutList: string[] = [];
//     private _layouts: Map<String, Layout> = new Map<String, Layout>();

//     public layouts: BehaviorSubject<Layout[]> = new BehaviorSubject([]);
    
//     error: string;

//     register(name: string, layout: Layout) {
//       this._layouts.set(name, layout);
//       this.layouts.next(this.getLayouts());
//     }

//     get(name: string): Layout {
//       return this._layouts.get(name);
//     }

//     constructor (
//       private _appConfigService: AppConfigService,
//       private _http: Http
//     ) {
//       this._appConfigService.AppConfig.subscribe(config => {
//         if (config !== undefined)
//         {
//           console.log("LayoutService:config:", config);

//           this.configLayoutServiceAPI = config.LayoutServiceAPI;
//           this.reloadLayouts();
//         }
//       });
//     }

//     private reloadLayouts() {
//       console.log("LayoutService:reloadLayouts()");
//       if (this.configLayoutServiceAPI != "")
//       {
//         console.log("LayoutService:Loading Layouts");

//         this._layoutList.forEach(layoutSource => {
//           if (!this._layouts.has(layoutSource))
//           {
//             this.getLayout(layoutSource).subscribe(
//               layout => {
//                 this.register(layout.title, layout);
//               },
//               error => this.error = error
//             );
//           }
//         });
//       }
//     }

//     public getLayouts() : Layout[] {
//       console.log("LayoutService:getLayouts:", this._layouts);

//       return Array.from(this._layouts.values());
//     }

//     addLayoutSource(layoutSource: string): void {
//       console.log("LayoutService:addLayoutSource: ", layoutSource);

//       this._layoutList.push(layoutSource);
//       this.reloadLayouts();
//     }
  
//     //TODO Make a Layout type
//     getLayout(layoutSource: string): Observable<any> {
//       return this._http.get(this.configLayoutServiceAPI + layoutSource + '.json')
//         .map(res => res.json())
//         .catch(this.handleError);
//     }

//     private handleError(error: any) {
//       // In a real world app, we might use a remote logging infrastructure
//       // We'd also dig deeper into the error to get a better message
//       let errMsg = (error.message)
//         ? error.message :
//           (error.status)
//             ? `${error.status} - ${error.statusText}`
//               : 'Server error';

//       console.error(errMsg); // log to console instead

//       return Observable.throw(errMsg);
//     }
// }