import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OprationComponent } from './opration/opration.component';
import { UbtComponent } from './ubt/ubt.component';
import { ViewUbtComponent} from './view-ubt/view-ubt.component';
import { EditUbtComponent} from './edit-ubt/edit-ubt.component';
import { AdminstrationComponent } from './adminstration/adminstration.component';
import { SharedModule } from '../shared/shared.module';
import { ModuleService } from './module.service';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { ViewAndUpdateCompanyComponent } from './company/view-and-update-company/view-and-update-company.component';
import { DocumentsComponent } from './company/documents/documents.component';
import { DirectorsComponent } from './company/directors/directors.component';
import { CustomerComponent } from './company/customer/customer.component';
import { VendorComponent } from './company/vendor/vendor.component';
import { BankComponent } from './company/bank/bank.component';
import { LoginComponent} from './login/login.component';
import { MasterComponent } from './masters/master/master.component';
import { AddCustomerComponent } from './masters/customer/add-customer-details/add-customer-details.component';
import { CustomerAddComponent } from './masters/customer/customer/customer.component';
import { NewCustomerComponent } from './masters/customer/new-customer/new-customer.component';


const routes: Routes = [
  {path: '' ,component :OprationComponent},
  {path: 'login' ,component :LoginComponent},
  {path: 'operation' ,component :OprationComponent},
  {path: 'ubt' ,component :UbtComponent},
  {path: 'view-ubt' ,component :ViewUbtComponent},
  {path: 'edit-ubt' ,component :EditUbtComponent},
  {path: 'adminstration' ,component :AdminstrationComponent},
  {path: 'view-and-update-company',component : ViewAndUpdateCompanyComponent,canDeactivate: [ModuleService],},
  {path:'masters',component:MasterComponent},
  {path:'masters/customer/addcustomerdetails',component:AddCustomerComponent},
  {path:'masters/Customer',component:CustomerAddComponent},
  {path:'masters/customer/addcustomer',component:NewCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule.forRoot()],
  exports: [RouterModule],
  declarations:[OprationComponent,UbtComponent,ViewUbtComponent,EditUbtComponent,AdminstrationComponent, CompanyFormComponent, ViewAndUpdateCompanyComponent, DocumentsComponent, DirectorsComponent, CustomerComponent, VendorComponent, BankComponent,LoginComponent, MasterComponent, AddCustomerComponent, CustomerAddComponent, NewCustomerComponent],
  providers: [ModuleService]
})
export class ModuleModule { }
