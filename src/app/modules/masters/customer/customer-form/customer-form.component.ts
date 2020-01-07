import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Customer } from '../../../../shared/entities/customer';
import { Validators } from '../../../../shared/utils/validators';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  validators:any = Validators;
  @Input() customer: Customer = new Customer();
  @ViewChild(NgForm, { static: true }) myForm: NgForm; 
  @Input() dataLoad: any = [];
  @Input() customerTypesLoad: any = [];
  @Input() isEdit: boolean;
  @Output() saveData = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnInit() {
    
  }
  onSubmit(form) {
    this.saveData.emit(this.customer)
  }
  ngOnDestroy(): void {
    

  }
}
