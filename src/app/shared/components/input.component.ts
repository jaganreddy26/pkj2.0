import { Component, OnInit, Input, ViewChild,Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
    selector: 'app-input',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    template: `
    <mat-form-field appearance="outline" fxFlex="100">
     <mat-label>{{labelName}}</mat-label>
      <input matInput [placeholder]="labelName" [name]="filedName" [(ngModel)]="filedValue[filedName]" #model="ngModel" [type]="type" 
      [required]="required" [pattern]="pattern" [minlength]="minlength" [maxlength]="maxlength" [disabled]="readonly"> 
      <mat-error> 
        <div *ngIf="form.submitted && model.invalid || model.touched && model.invalid">
        <span *ngIf="model.errors.required">{{errorRequired}}</span> 
        <span *ngIf="model.errors.pattern">Email must be a valid email address</span> 
        <span *ngIf="model.errors.minlength || model.errors.maxlength"> Password must be 8-64 characters </span>
       </div>
        </mat-error>
 </mat-form-field>
    `

})
export class InputComponent implements OnInit {
    @ViewChild(NgForm,{static:false}) myForm: NgForm; 
    @Input() form:any;
    @Input() labelName:any;
    @Input() type:any; 
    @Input() filedName:any;
    @Input() filedValue:any;
    @Input() required:boolean;
    @Input() errorRequired?:any; 
    @Input() errorDirty?:any; 
    @Input()  pattern ?:any;
    @Input() minlength?:number; 
    @Input() maxlength?:number;
    @Input() readonly?:boolean;

    ngOnInit() {
    }

}