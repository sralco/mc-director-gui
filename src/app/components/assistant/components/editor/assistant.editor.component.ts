/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Assistant } from '../../assistant';
import { AssistantsService } from '../../assistant.service';

@Component({
  selector: 'nga-assistant-editor',
  templateUrl: './editor.html',
})
export class AssistantEditorComponent extends LoadableComponent {
  protected componentName: string = 'AssistantEditorComponent';

  @Input() assistant: Assistant;
  @Output() assistantSaved: EventEmitter<Assistant> = new EventEmitter<Assistant>();

  constructor(private service: AssistantsService) {
    super();
  }

  onSubmit(): void {
    this.startLoader();
    this.service.save(this.assistant).then(() => {
      this.stopLoader();
      this.assistantSaved.emit(this.assistant);
    }).catch(() => this.stopLoader());
  }
}
