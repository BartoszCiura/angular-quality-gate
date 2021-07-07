import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SightsComponent} from './sights/sights.component';
import {SightsListComponent} from './sights-list/sights-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/sights', pathMatch: 'full'},
  {path: 'sights', component: SightsComponent},
  {path: 'sights-list', component: SightsListComponent},

  {
    path: 'form',
    loadChildren: () => import('./modules/sight-details/sight-details-routing.module').then(m => m.SightDetailsRoutingModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
