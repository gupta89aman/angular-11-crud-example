import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const groomsModule = () => import('./grooms/grooms.module').then(x => x.GroomsModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', loadChildren: groomsModule },

    // otherwise redirect to home
    { path: '**', redirectTo: 'users' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }