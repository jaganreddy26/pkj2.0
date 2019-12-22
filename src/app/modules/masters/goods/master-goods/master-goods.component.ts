import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-goods',
  templateUrl: './master-goods.component.html',
  styleUrls: ['./master-goods.component.css']
})
export class MasterGoodsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addGoods(){
    this.router.navigate(['/masters/goods/addgoods',{}])
  }
  viewGoods(){
    this.router.navigate(['/masters/goods/viewgoods',{}])
  }
}
