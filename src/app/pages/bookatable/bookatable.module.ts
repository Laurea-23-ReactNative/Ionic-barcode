import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookatablePageRoutingModule } from './bookatable-routing.module';

import { BookatablePage } from './bookatable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookatablePageRoutingModule
  ],
  declarations: [BookatablePage]
})
export class BookatablePageModule {}
