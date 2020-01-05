import { Component, OnInit, Input, ViewChild,TemplateRef, Output, EventEmitter, SimpleChanges, OnDestroy, ɵConsole } from '@angular/core';
import { Company } from '../../../../shared/entities/company';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.css']
})
export class AddCompanyFormComponent implements OnInit {
  validators:any = Validators;
  @Input() company: Company = new Company();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Output() saveData = new EventEmitter();
  @Input() isEdit: boolean=true;
  Password:any;
  ConfirmPassword:any;
  CompanyName:any;
  constructor(private dialog: MatDialog) { }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnInit() {
   
  }
  popWindow(templateRef: TemplateRef<any>){
    this.dialog.open(templateRef,{ disableClose: true });
  }
  onSubmit(form) {

    this.saveData.emit(this.company)
  }
  ngOnDestroy(): void {
    

  }

  saveComapny(){
    console.log(this.Password);
    console.log(this.ConfirmPassword);
    let object={
      'CompanyName':this.CompanyName,
      'Password':this.Password
    }
    
    this.saveData.emit(object);
    this.dialog.closeAll();
  }
}
