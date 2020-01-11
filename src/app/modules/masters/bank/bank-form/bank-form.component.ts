import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import {masterBank} from '../../../../shared/entities/masterBank';
@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit,OnDestroy {
  validators:any = Validators;
  @Input() bank: masterBank = new masterBank();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnInit() {
  }
  onSubmit(form) {
    this.saveData.emit(this.bank)
  }
  ngOnDestroy(): void {
    

  }

}
