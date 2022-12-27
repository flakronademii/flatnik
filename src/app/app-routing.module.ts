import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { CostumersUSERSComponent } from './costumers-users/costumers-users.component';
import { MagazineUSERSComponent } from './magazine-users/magazine-users.component';
import { AuthModule } from './Auth/auth.module';
const routes: Routes = [
{ path: '', component: CostumersUSERSComponent},
{path:'magazine', component: MagazineUSERSComponent,canActivate:[AuthGuard]},
{
  path: 'auth',
  loadChildren: () => import('./Auth/auth.module').then(x => x.AuthModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule {

}
