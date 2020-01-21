import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StarshipsComponent} from './starships/starships.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/starships',
    pathMatch: 'full'
  },
  {
    path: 'starships',
    component: StarshipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
