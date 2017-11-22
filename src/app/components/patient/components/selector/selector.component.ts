/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientsService } from '../../patients.service';
import { Patient } from '../../patient';
import { LoadableComponent } from '../../../core/LoadableComponent';

@Component({
    selector: 'nga-patient-selector',
    templateUrl: 'selector.html',
})
export class PatientSelectorComponent extends LoadableComponent {

    @Output() select: EventEmitter<number> = new EventEmitter<number>();
    @Input() set initPatient(patientId: number) {
        this.setPatient(patientId);
    }

    protected componentName: 'PatientSelectorComponent';

    patient: Patient;

    constructor (
        private patientService: PatientsService,
    ) {
        super();
    }

    setPatient (patientId: number): void {
        this.initComponent();
        this.init.emit('PatientSelectorComponent');
        this.patientService.getPatient(patientId)
            .then((patient: Patient) => {
                this.patient = patient;
                this.loadedComponent();
                this.loaded.emit('PatientSelectorComponent');
            })
            .catch( () => {
                this.patient = null;
                this.loadedComponent();
            });
    }

    onPatientChanged() {
        this.select.emit(this.patient.id);
    }
}
