import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy  } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Import App Component
import { AppComponent } from './app.component';

// Import routing module
import { AppRoutingModule } from './app.routing';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

// Import services
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AlertService, AuthenticationService, UserService } from './services';

// Import containers
import { DefaultLayoutComponent } from './containers';

// Import Component
import { AlertComponent } from './directives/alert.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    AlertComponent,
    //TableFilterPipe,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
