//share module is a common module of the all moduless
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ApexService } from "./service/apex.service";
import { HTTP_INTERCEPTORS ,HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppInterceptor } from "./service/app.interceptor";
import { AppService } from "./service/app.service";
import {
  KeyValuesPipe,
  DecodeURIPipe,
  DatePipe,
  DateTimePipe,
  FlagPipe,
  CurrencyPipe,
  FilterPipe
} from "./utils/pipes";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule  } from "@angular/material/table";

import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTreeModule } from "@angular/material/tree";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatNativeDateModule } from "@angular/material";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatPaginatorModule ,MatSortModule } from '@angular/material';


import { MatSnackBar } from "@angular/material";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ResizableModule } from 'angular-resizable-element';
import { TreeComponent } from './components/tree.component';
import { InputComponent } from './components/input.component';
import { SelectComponent } from './components/select.component';




@NgModule({
  //to import the modules
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatTreeModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatSnackBarModule,
    ScrollingModule,
    MatFormFieldModule,
    DragDropModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSlideToggleModule,
    ResizableModule
  ],
  //to declare the components,pipes,directives
  declarations: [
    KeyValuesPipe,
    DecodeURIPipe,
    DatePipe,
    DateTimePipe,
    FlagPipe,
    CurrencyPipe,
    FilterPipe,
    TreeComponent,
    InputComponent,
    SelectComponent
  ],
  // to export all we have to use in another component
  exports: [
    KeyValuesPipe,
    DecodeURIPipe,
    DatePipe,
    DateTimePipe,
    FlagPipe,
    FilterPipe,
    CurrencyPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatTreeModule,
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatSnackBarModule,
    ScrollingModule,
    MatFormFieldModule,
    DragDropModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,MatSlideToggleModule,ResizableModule, TreeComponent,InputComponent,SelectComponent
  ],
  // to declare the services in providers
  providers: [AppService, ApexService, FormBuilder]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        }
      ]
    };
  }
}
