/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DoctorDatatableModule } from '../../components/doctors/components/datatable';
import { DoctorsComponent } from './doctors.component';
import { routing } from './doctors.routing';
import { DiagnosticDatatableModule } from '../../components/diagnostic/components/datatable';
import { ServiceDatatableModule } from '../../components/service/components/datatable';
import { SurveyDatatableModule } from '../../components/survey/components/datatable';

@NgModule({
  imports: [
    routing,
    DoctorDatatableModule,
    DiagnosticDatatableModule,
    ServiceDatatableModule,
    SurveyDatatableModule,
  ],
  declarations: [
    DoctorsComponent,
  ],
})

export class DoctorsModule {
}
