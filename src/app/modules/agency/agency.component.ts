import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  @Input() agencys :any;
  @Input() isEdit:boolean;
  constructor() { }

  ngOnInit() {
  }

}
