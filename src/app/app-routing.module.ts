import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { DialogueBuilderComponent } from './dialogue-builder/dialogue-builder.component';

const routes: Routes = [
  { path: '', redirectTo: '/comparator', pathMatch: 'full' },
  { path: 'comparator', component: ComparatorComponent },
  { path: 'dialogue-builder', component: DialogueBuilderComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ComparatorComponent }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
