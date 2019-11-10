import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { Company } from '../../../shared/entities/company';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  @Input() company: Company = new Company();
  @ViewChild(NgForm, { static: true }) myForm: NgForm;
  @Input() dataLoad: any = [];
  @Output() saveData = new EventEmitter();
  @Input() isEdit: boolean;
 
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {

  }
  ngOnInit() {
   
  }
  onSubmit(form) {
    this.saveData.emit(this.company)
  }
  ngOnDestroy(): void {
    

  }

}
