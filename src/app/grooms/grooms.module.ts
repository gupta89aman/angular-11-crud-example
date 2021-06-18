import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GroomsRoutingModule } from './grooms-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
//import { AddEditPreferComponent } from './add-edit-prefer.component';
import { LocationService } from '@app/_services/location.service';
import { AddEditPreferComponent } from './add-edit-prefer.component';
import { MatchesComponent } from './matches.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GroomsRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        AddEditPreferComponent,
        MatchesComponent
    ],
    providers: [
        LocationService
    ]
})
export class GroomsModule { }