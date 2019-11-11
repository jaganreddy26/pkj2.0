import { Component, OnInit, Output, EventEmitter,ElementRef, Input, SimpleChanges,TemplateRef,ViewChild } from '@angular/core';
import { FileDetails } from '../../../shared/entities/document';
import { MatDialog } from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  //@ViewChild('myForm', { static: true }) myForm: ElementRef;
  @ViewChild('myInput', { static: false }) myInput: ElementRef;
  @ViewChild('myInput1', { static: false }) myInput1: ElementRef;
  @ViewChild('myInput2', { static: false }) myInput2: ElementRef;
  @ViewChild('myInput3', { static: false }) myInput3: ElementRef;;
  @Output() saveDocumentFiles = new EventEmitter();
  @Input() pan: any;
  @Input() cin: any;
  @Input() tan: any;
  @Input() gstin: any;
  panValue: any;
   cinValue: any;
  tanValue: any;
  gstinValue: any;
  @Input() isEdit:boolean;
  isEditPAN: boolean = true;
  isEditCIN: boolean = true;
  isEditTAN: boolean = true;
  isEditGSTIN: boolean = true;
  isEditChild:boolean = false;
  filesDetails: FileDetails = new FileDetails();
  pdfPath:any;
  files:any=[];
  
  constructor(private dialog: MatDialog,private sanitizer: DomSanitizer) {

  }
  ngOnChanges(changes: SimpleChanges) {
      if (this.pan) {
        this.isEditPAN = false
      }else{
        this.isEditPAN = true
      }
      if (this.cin) {
        this.isEditCIN = false;
      }else{
        this.isEditCIN = true;
      }
      if (this.tan) {
        this.isEditTAN = false;
      }else{
        this.isEditTAN = true;
      }
      if (this.gstin) {
        this.isEditGSTIN = false;
      }else{
        this.isEditGSTIN = true;
      }
  }
  ngOnInit() {
  }
  save(file) {
    this.filesDetails.UploadedFileName = file;
    this.saveDocumentFiles.emit(this.filesDetails);
  }
  edit(string) {
    //console.log(string)
    switch (string) {
      case 'CIN': {
        this.isEditCIN = true;
        break;
      }
      case 'PAN': {
        this.isEditPAN = true;
        break;
      }
      case 'TAN': {
        this.isEditTAN = true;
        break;
      }
      case 'GSTIN': {
        this.isEditGSTIN = true;
        break;
      }
      default: {
        break;
      }
    }
  }
  handleFileSelect(evt, name) {
    
    this.filesDetails.UploadedFileName = name;
    var File = evt.target.value;
    let subStringData = File.substr(12);
    var FileName = subStringData.split('.')[0];
    var FileType = subStringData.split('.')[1];

    this.filesDetails.FilePath = FileName;
    this.filesDetails.FileExtn = FileType;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;

    this.filesDetails.EncryptedFile = btoa(binaryString);
    //  console.log(this.filesDetails.EncryptedFile)    
    let obj = {...this.filesDetails}
    this.files.push(obj);
  }
  viewPdf(templateRef: TemplateRef<any>,path) {
 
    this.dialog.open(templateRef);
    this.pdfPath = this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
  checkPermission(){
    this.isEditChild = true;
  }
  clearAll(){
    this.files = [];
    if(this.myInput.nativeElement.value){
      this.myInput.nativeElement.value = null;
    }
    if(this.myInput1.nativeElement.value){
      this.myInput1.nativeElement.value = null;
    }
    if(this.myInput2.nativeElement.value){
      this.myInput2.nativeElement.value = null;
    }
    if(this.myInput3.nativeElement.value){
      this.myInput3.nativeElement.value = null;
    }

  }
}
