import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../feature/material.module';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, MaterialModule],
  providers: [],
  exports: [HistoryComponent],
})
export class HistoryModule { }
