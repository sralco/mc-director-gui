/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { Component, ViewChild } from '@angular/core';
import { DatatableCol } from '../../../ui/datatable';
import { DatatableAction } from '../../../ui/datatable';
import { TranslateService } from '@ngx-translate/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatatableComponent } from '../../../ui/datatable';
import { AssistantEditorComponent } from '../editor/assistant.editor.component';
import { AssistantsService } from '../../assistant.service';
import { AbstractDatatableController } from '../../../ui/tables/abstract.datatable.controller';
import { LoadableServiceInterface } from '../../../core/loadable';
import { Assistant } from '../../assistant';
import { LoggerComponent } from '../../../core/logger/LoggerComponent';

@Component({
  selector: 'nga-assistant-datatable',
  templateUrl: './assistant.datatable.html',
})
export class AssistantDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'AssistantDatatableComponent';

  @ViewChild('assistantDatatableComponent')
    private assistantDatatableComponent: DatatableComponent;

  @ViewChild('editAssistantForm')
    private editAssistantForm: AssistantEditorComponent;

  constructor(
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    private translateService: TranslateService,
    private assistantService: AssistantsService,
  ) {
    super();
  }

  protected getTranslateService (): TranslateService {
    return this.translateService;
  }

  protected getDatatableComponent (): DatatableComponent {
    return this.assistantDatatableComponent;
  }

  getService (): LoadableServiceInterface {
    return this.assistantService;
  }

  getEmptyModel (): Object {
    return new Assistant();
  }

  getColumns (): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('email', this.translateService.instant('E-Mail')),
      new DatatableCol('commentary', this.translateService.instant('Commentary')),
      new DatatableCol('refKey', this.translateService.instant('Ref. Key')),
    ];
  }

  getActions (): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  getSortBy(): string {
    return 'title';
  }

  onChanged(assistant: Assistant): void {
    this.displayDialog = false;
    this.getDatatableComponent().refresh();
  }
}

