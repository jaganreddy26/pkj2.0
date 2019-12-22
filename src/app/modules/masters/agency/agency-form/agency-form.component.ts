import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import {Agency} from '../../../../shared/entities/agency';
@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html', 
  styleUrls: ['./agency-form.component.css']
})
export class AgencyFormComponent implements OnInit {
  validators:any = Validators;
  @Input() agency: Agency = new Agency();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.saveData.emit(this.agency)
  }
}
