import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { HostPageComponent } from './host-page/host-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AppService } from './app.service';
@NgModule({
  declarations: [
    AppComponent,
    HotelCardComponent,
    LandingPageComponent,
    GuestPageComponent,
    HostPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
