import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarComponent } from './totem/sidebar/sidebar.component';
import { ProductCardComponent } from './totem/product-card/product-card.component';
import { CartComponent } from './totem/cart/cart.component';
import { UserAccountComponent } from './totem/user-account/user-account.component';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { DialogModule } from 'primeng/dialog';
import { NumericKeyboardComponent } from './totem/numeric-keyboard/numeric-keyboard.component';
import { FormsModule } from '@angular/forms';
import { PdvComponent } from './totem/pdv/pdv.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ProdutosAdminComponent } from './admin/produtos-admin/produtos-admin.component';
import { AlunosAdminComponent } from './admin/alunos-admin/alunos-admin.component';
import { RecargasAdminComponent } from './admin/recargas-admin/recargas-admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './admin/checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { LoginComponent } from './admin/login/login.component';
import { ContentComponent } from './admin/content/content.component';
import { AuthInterceptor } from './shared/services/AuthInterceptor';

// Registra a configuração regional para o Brasil
registerLocaleData(localePtBr);
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProductCardComponent,
    CartComponent,
    UserAccountComponent,
    NumericKeyboardComponent,
    PdvComponent,
    SidebarAdminComponent,
    DashboardAdminComponent,
    ProdutosAdminComponent,
    AlunosAdminComponent,
    RecargasAdminComponent,
    CheckoutComponent,
    LoginComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    CardModule,
    ToolbarModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51Lf33zDpCjHUfGtEOrBU5TCJpRbjp3agjzUHguYI4CAl8Rt03UHxEjmrn4HX0bN2VrJisLZxVhyLfqQaEI0rC7zF00bNP8T8Z8'),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
