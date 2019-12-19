import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  @Input() goods :any;
  @Input() isEdit:boolean;
  isEditChild:boolean = false;
  @Output() checkGoodsPermissionEvent = new EventEmitter();
  @Output() saveGoodsEvent = new EventEmitter();
  isChanged:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  checkPermission(){
    this.isEditChild = true;
    this.checkGoodsPermissionEvent.emit()
  }
  saveGoods(){
    this.saveGoodsEvent.emit(this.goods)
  }
  changeEvent(){
    this.isChanged = true;
    }
}
