import { Component, OnInit, Input, ViewChild, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
    selector: 'app-select',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    template: `
                <mat-form-field appearance="outline" fxFlex="100">
                <mat-label>{{labelName}}</mat-label>
                <mat-select [name]="filedName" [(ngModel)]="filedValue[filedName]" #model="ngModel" [disabled]="readonly" [required]="required" >
                    <mat-option *ngFor="let item of data" [value]="item[primaryKey]">
                    {{item[name]}}
                    </mat-option>
                </mat-select>
                <mat-error> 
                <div *ngIf="form.submitted && model.invalid || model.touched && model.invalid">
                <span *ngIf="model.errors.required">{{errorRequired}}</span> 
                </div>
                </mat-error>
                </mat-form-field>
    `

})
export class SelectComponent implements OnInit {
    @ViewChild(NgForm, { static: false }) myForm: NgForm;
    @Input() primaryKey: any;
    @Input() name: any;
    @Input() data: any;
    @Input() form: any;
    @Input() labelName: any;
    @Input() type: any;
    @Input() filedName: any;
    @Input() filedValue: any;
    @Input() required: boolean;
    @Input() errorRequired?: any;
    @Input() errorDirty?: any;
    @Input() pattern?: any;
    @Input() minlength?: number;
    @Input() maxlength?: number;
    @Input() readonly?: boolean;

    ngOnInit() {
        // console.log(this.filedValue)
        // console.log(this.primaryKey)
        // console.log(this.filedValue[this.filedName])
    }

}