import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { HostPageComponent } from './host-page/host-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: LandingPageComponent },
  { path: 'guest-page', component: GuestPageComponent},  
  { path: 'host-page', component: HostPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
