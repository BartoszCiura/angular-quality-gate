import {RouterModule, Routes} from '@angular/router';
import {SightFormComponent} from './components/sight-form/sight-form.component';
import {NgModule} from '@angular/core';


const routes: Routes = [

  {
    path: 'edit/:longitude', component: SightFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikipediaRoutingModule {
}
