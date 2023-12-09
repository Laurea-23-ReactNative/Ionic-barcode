import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookatablePage } from './bookatable.page';

const routes: Routes = [
  {
    path: '',
    component: BookatablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookatablePageRoutingModule {}
