import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdvComponent } from './totem/pdv/pdv.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/pdv',
    pathMatch: 'full'
  },
  {
    path: 'pdv',
    component:PdvComponent
  },
  {
    path: 'admin',
    component:DashboardAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
