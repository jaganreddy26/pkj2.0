import { Component,OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import {Business} from '../../../../shared/entities/business';
@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {
  validators:any = Validators;
  @Input() business: Business = new Business();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.saveData.emit(this.business);
  }
}
