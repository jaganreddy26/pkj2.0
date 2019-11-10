import { Component, OnInit ,Input,Output,EventEmitter,TemplateRef,ViewChild, SimpleChange} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Bank } from '../../../shared/entities/bank';
import { NgForm } from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bankObj:Bank= new Bank();
  @Input() bankAccDetails: any = [];
  @Input() bankBranches:any=[];
  @Output() saveBankDetails = new EventEmitter();
  @ViewChild(NgForm,{static:true}) myForm: NgForm;
  @Input() isEdit:boolean;
  displayedColumns: string[] = ['BankName', 'AcNo', 'AcHolderName','Action'];
  dataSource: MatTableDataSource<Bank>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isEditChild:boolean = false;
  constructor(private dialog: MatDialog) { 

  }

  ngOnInit() {

  }
  ngOnChanges(changes:SimpleChange){
    this.dataSource = new MatTableDataSource(this.bankAccDetails);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addBank(){
    this.saveBankDetails.emit()
  }
  openBankForm(templateRef: TemplateRef<any>,obj) {
    if(obj){
      this.bankObj = obj;
    }else{
      this.bankObj = new Bank()
    }
    this.dialog.open(templateRef,{ disableClose: true });
  }
  onSubmit(myForm){
    this.saveBankDetails.emit(this.bankObj);
    this.dialog.closeAll();
  }
  checkPermission(){
    this.isEditChild = true;
  }
}
