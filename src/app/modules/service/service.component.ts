import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  @Input() services :any;
  @Input() isEdit:boolean;
  isEditChild:boolean = false;
  @Output() checkServicesPermissionEvent = new EventEmitter();
  @Output() saveServicesEvent = new EventEmitter();
  isChanged:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  checkPermission(){
    this.isEditChild = true;
    this.checkServicesPermissionEvent.emit()
  }
  saveService(){
    this.saveServicesEvent.emit(this.services)
  }
  changeEvent(){
    this.isChanged = true;
    }
}
