import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceTileComponent } from './service-tile/service-tile.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { StatusPipe } from './status.pipe';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ServiceTileComponent,
    StatusPipe,
    HeaderComponent,
    SidebarComponent,
    SettingsComponent,
    AboutComponent,
    EditServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    StyleClassModule,
    RippleModule,
    BadgeModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    InputSwitchModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
