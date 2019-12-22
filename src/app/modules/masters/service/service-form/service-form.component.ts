import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import {Service} from '../../../../shared/entities/service';
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  validators:any = Validators;
  @Input() service: Service = new Service();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.saveData.emit(this.service);
  }
}
