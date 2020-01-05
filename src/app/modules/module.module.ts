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
import { AgencyComponent } from './agency/agency.component';
import { ViewCustomerDetailsComponent } from './masters/customer/view-customer-details/view-customer-details.component';

import { MasterVendorsComponent } from './masters/vendor/master-vendors/master-vendors.component';
import { NewVendorComponent } from './masters/vendor/new-vendor/new-vendor.component';
import { AddVendorDetailsComponent } from './masters/vendor/add-vendor-details/add-vendor-details.component';
import { VendorFormComponent } from './masters/vendor/vendor-form/vendor-form.component';
import { GoodsComponent } from './goods/goods.component';
import { ServiceComponent } from './service/service.component';
import { ViewVendorDetailsComponent } from './masters/vendor/view-vendor-details/view-vendor-details.component';
import {VendorService} from './masters/vendor/vendor.service';

import { MasterAgencyComponent } from './masters/agency/master-agency/master-agency.component';
import { AddAgencyComponent } from './masters/agency/add-agency/add-agency.component';
import { ViewAgencyComponent } from './masters/agency/view-agency/view-agency.component';
import { AgencyFormComponent } from './masters/agency/agency-form/agency-form.component';
import {AgencyService} from './masters/agency/agency.service';

import { MasterGoodsComponent } from './masters/goods/master-goods/master-goods.component';
import { AddGroupComponent } from './masters/goods/add-group/add-group.component';
import { ViewGoodsComponent } from './masters/goods/view-goods/view-goods.component';
import { GoodsFormComponent } from './masters/goods/goods-form/goods-form.component';
import {GoodsService} from './masters/goods/goods.service';

import { MasterServiceComponent } from './masters/service/master-service/master-service.component';
import { AddServiceComponent } from './masters/service/add-service/add-service.component';
import { ViewServiceComponent } from './masters/service/view-service/view-service.component';
import { ServiceFormComponent } from './masters/service/service-form/service-form.component';
import {ServicesService} from './masters/service/services.service';

import { MasterBankComponent } from './masters/bank/master-bank/master-bank.component';
import { BankFormComponent } from './masters/bank/bank-form/bank-form.component';
import { AddbankComponent } from './masters/bank/addbank/addbank.component';
import { ViewBankComponent } from './masters/bank/view-bank/view-bank.component';
import {BankService} from './masters/bank/bank.service';

import { MasterBusinessComponent } from './masters/business/master-business/master-business.component';
import { AddBusinessComponent } from './masters/business/add-business/add-business.component';
import { ViewBusinessComponent } from './masters/business/view-business/view-business.component';
import { BusinessFormComponent } from './masters/business/business-form/business-form.component';
import { AddCompanyComponent } from './masters/company/add-company/add-company.component';
import { MasterCompanyComponent } from './masters/company/master-company/master-company.component';
import { AddCompanyFormComponent } from './masters/company/add-company-form/add-company-form.component';



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
  {path:'masters/customer/addcustomer',component:NewCustomerComponent},
  {path:'masters/customer/viewcustomer',component:ViewCustomerDetailsComponent},

  {path:'masters/Vendor',component:MasterVendorsComponent},
  {path:'masters/vendor/addcustomer',component:NewVendorComponent},
  {path:'masters/vendor/addvendordetails',component:AddVendorDetailsComponent},
  {path:'masters/vendor/viewvendors',component:ViewVendorDetailsComponent,canDeactivate:[VendorService]},

  {path:'masters/Agency',component:MasterAgencyComponent},
  {path:'masters/agency/addagency',component:AddAgencyComponent},
  {path:'masters/agency/viewagency',component:ViewAgencyComponent,canDeactivate:[AgencyService]},

  {path:'masters/Goods',component:MasterGoodsComponent},
  {path:'masters/goods/addgoods',component:AddGroupComponent},
  {path:'masters/goods/viewgoods',component:ViewGoodsComponent,canDeactivate: [GoodsService]},

  {path:'masters/Service',component:MasterServiceComponent},
  {path:'masters/service/addservice',component:AddServiceComponent},
  {path:'masters/service/viewservice',component:ViewServiceComponent,canDeactivate: [ServicesService]},

  {path:'masters/Bank',component:MasterBankComponent},
  {path:'masters/bank/addbank',component:AddbankComponent},
  {path:'masters/bank/viewbank',component:ViewBankComponent,canDeactivate:[BankService]},

  {path:'masters/Business',component:MasterBusinessComponent},
  {path:'masters/business/addbusiness',component:AddBusinessComponent},
  {path:'masters/business/viewbusiness',component:ViewBusinessComponent},

  {path:'masters/Comapny',component:MasterCompanyComponent},
  {path:'masters/comapny/addcompany',component:AddCompanyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule.forRoot()],
  exports: [RouterModule],
  declarations:[OprationComponent,UbtComponent,ViewUbtComponent,EditUbtComponent,AdminstrationComponent, CompanyFormComponent, ViewAndUpdateCompanyComponent, DocumentsComponent, DirectorsComponent, CustomerComponent, VendorComponent, BankComponent,LoginComponent, MasterComponent, AddCustomerComponent, CustomerAddComponent, NewCustomerComponent, AgencyComponent, ViewCustomerDetailsComponent, NewVendorComponent, AddVendorDetailsComponent, MasterVendorsComponent, VendorFormComponent, GoodsComponent, ServiceComponent, ViewVendorDetailsComponent, MasterAgencyComponent, AddAgencyComponent, ViewAgencyComponent, AgencyFormComponent, MasterGoodsComponent, AddGroupComponent, ViewGoodsComponent, GoodsFormComponent, MasterServiceComponent, AddServiceComponent, ViewServiceComponent, ServiceFormComponent, MasterBankComponent, BankFormComponent, AddbankComponent, ViewBankComponent, MasterBusinessComponent, AddBusinessComponent, ViewBusinessComponent, BusinessFormComponent, AddCompanyComponent, MasterCompanyComponent, AddCompanyFormComponent],
  providers: [ModuleService]
})
export class ModuleModule { }
