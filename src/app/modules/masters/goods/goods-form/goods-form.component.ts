import { Component, OnInit,Input , ViewChild, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Validators } from '../../../../shared/utils/validators';
import {Goods} from '../../../../shared/entities/goods';
@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.css']
})
export class GoodsFormComponent implements OnInit {
  validators:any = Validators;
  @Input() goods: Goods = new Goods();
  @ViewChild(NgForm, { static: true }) myForm: NgForm; 
  @Input() dataLoad: any = [];
  @Input() isEdit: boolean;


  @Output() saveData = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.saveData.emit(this.goods);
  }
}
