import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import {Vendor} from '../../../../shared/entities/vendor';
import { Validators } from '../../../../shared/utils/validators';
@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {
  validators:any = Validators;
  @Input() vendor: Vendor = new Vendor();
  @ViewChild(NgForm, { static: true }) myForm: NgForm; 
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }
  onSubmit(form) {
    this.saveData.emit(this.vendor)
  }
}
