import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ComparatorComponent } from './comparator/comparator.component';

const routes: Routes = [
  { path: '', redirectTo: '/comparator', pathMatch: 'full' },
  { path: 'comparator', component: ComparatorComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
