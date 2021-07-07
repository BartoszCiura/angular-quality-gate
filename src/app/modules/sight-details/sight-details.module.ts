import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SightDetailsComponent} from './components/sight-details/sight-details.component';
import {SightFormComponent} from './components/sight-form/sight-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SightDetailsComponent, SightFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SightDetailsModule {
}
