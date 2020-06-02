import { Component, OnInit } from '@angular/core';
import { Mworker } from 'src/app/shared/models/mworker.model';
import { MworkerService } from 'src/app/shared/services/mworker.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  workers: Mworker[];
  findSn = '';
  flagId = true;
  flagAge = true;
  
  departamentName = ['IT-departament', 'Sales departament', 'Delivery departament', 'Legal departament'];

  constructor(private mworkerService: MworkerService, private router: Router) { }
  
  getDepartament(departament: number) {
    return this.departamentName[departament];
  }

  sortById() {
    if(this.flagId) {
      this.workers.sort((a, b) => a.id > b.id ? 1 : -1);
      this.flagId = false;
    } else {
      this.workers.sort((a, b) => a.id > b.id ? -1 : 1);
      this.flagId = true;
    }    
  }
  
  sortByAge() {
    if(this.flagAge) {
      this.workers.sort((a, b) => new Date(a.birthday).getTime() > new Date(b.birthday).getTime() ? 1 : -1);
      this.flagAge = false;
    } else {
      this.workers.sort((a, b) => new Date(a.birthday).getTime() > new Date(b.birthday).getTime() ? -1 : 1);
      this.flagAge = true;
    }    
  }

  ngOnInit(): void { 
    this.getData();
  }

  async getData() {
    try {
      let workers = this.mworkerService.getAll();
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (err) {
      console.error(err);
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onEditProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDeleteProfile(id: number) {
    try {
      await this.mworkerService.deleteOneById(id);
    } catch (error) {
      console.error(error);
    } finally { this.getData(); }
  }
}