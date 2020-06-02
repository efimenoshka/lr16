import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MworkerService } from 'src/app/shared/services/mworker.service';
import { Mworker, MworkerDepartament } from 'src/app/shared/models/mworker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css']
})
export class WorkerEditComponent implements OnInit {
  id: number;
  public phone = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  worker: Mworker;
  mworkerDepartament = MworkerDepartament;
  workerForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private mworkerService: MworkerService,
    private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    })
  }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      surname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      middlename: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthday: new FormControl(null, [Validators.required]),
      departament: new FormControl({ value: 0, disabled: false }, [Validators.required])
    })
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let worker = this.mworkerService.getOneById(this.id);
        this.worker = await worker;
      } catch (error) {
        console.error(error);
      }
      this.workerForm.patchValue({
        id: this.worker.id,
        surname: this.worker.surname,
        name: this.worker.name,
        middlename: this.worker.middlename,
        phone: this.worker.phone,
        email: this.worker.email,
        birthday: this.worker.birthday,
        departament: this.worker.departament        
      });
    }
  }

  async onDelete() {
    try {
      await this.mworkerService.deleteOneById(this.id);
    } catch (error) {
      console.error(error);
    }
    this.router.navigate(['/workers']);
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.mworkerService.putOneById(this.id, this.workerForm.value);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let res = await this.mworkerService.postOne(this.workerForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (error) {
        console.error(error);
      }
    }
    this.router.navigate(['/workers']);
  }
}