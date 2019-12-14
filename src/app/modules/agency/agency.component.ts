import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  @Input() agencys :any;
  @Input() isEdit:boolean;
  isEditChild:boolean = false;
  @Output() checkPermissionEvent = new EventEmitter();
  @Output() saveAgencyEvent = new EventEmitter();
  isChanged:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  checkPermission(){
    this.isEditChild = true;
    this.checkPermissionEvent.emit()
  }
  saveAgency(){
    this.saveAgencyEvent.emit(this.agencys)
  }
  changeEvent(){
    this.isChanged = true;
    }
}
