import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService} from './shared/service/app.service';


const routes: Routes = [
  {
  path: '',
  loadChildren: () => import('./modules/module.module').then(m => m.ModuleModule)
  }
// ,{
//   path: 'home',
//   loadChildren: () => import('./modules/home/home.module')
//   .then(m => m.HomeModule),
//   canActivate :[AppService]
// },{
//   path: 'network',
//   loadChildren: () => import('./modules/network/network.module')
//   .then(m => m.NetworkModule),
//   canActivate :[AppService]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
