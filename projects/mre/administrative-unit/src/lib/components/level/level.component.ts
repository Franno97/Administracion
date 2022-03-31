


import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { NivelDto, NivelService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';




@Component({
  selector: 'lib-level',
  templateUrl: './level.component.html',
  providers: [ListService],
})
export class LevelComponent implements OnInit {

  level = { items: [], totalCount: 0 } as PagedResultDto<NivelDto>;

  form: FormGroup;

  selectedLevel = {} as NivelDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService,
    private levelService: NivelService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit() {
    const levelStreamCreator = (query) => this.levelService.getList(query);

    this.list.hookToQuery(levelStreamCreator).subscribe((response) => {
      this.level = response;
    });
  }

  createLevel() {
    this.selectedLevel = {} as NivelDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editLevel(id: string) {
    this.levelService.get(id).subscribe((level) => {
      this.selectedLevel = level;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

 

  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedLevel.id || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4),
      Validators.pattern(/^\w+$/)]],
      nombre: [this.selectedLevel.nombre || null,
      [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(80),
      Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });

  }

  save() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const request = this.selectedLevel.id
      ? this.levelService.update(this.selectedLevel.id, this.form.value)
      : this.levelService.create(this.form.value);

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.levelService.delete(id).subscribe(() => this.list.get());
      }
    });
  }


  isRequired(name: string) {
    const validator = this.form.get(name).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }

}
