import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../feature/material.module';
import { MainComponent } from '../main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MaterialModule],
  providers: [],
  exports: [MainComponent],
})
export class MainModule { }
