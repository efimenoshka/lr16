import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { WorkerSnPipe } from '../shared/pipes/worker-sn.pipe';


@NgModule({
  declarations: [WorkersComponent, WorkerListComponent, WorkerEditComponent, WorkerSnPipe],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
  ]
})
export class WorkersModule { }
