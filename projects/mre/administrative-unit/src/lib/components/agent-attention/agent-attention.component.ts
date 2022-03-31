import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { finalize } from 'rxjs/operators';
import { VentanillaDto, VentanillaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/ventanilla';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-agent-attention',
  templateUrl: './agent-attention.component.html',
  styleUrls: ['./agent-attention.component.css'],
  providers: [ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AgentAttentionComponent implements OnInit {
  agentAttention = { items: [], totalCount: 0 } as PagedResultDto<VentanillaDto>;

  typeAttention = { items: [{ id: 1, name: 'Presencial' }, { id: 2, name: 'Semipresencial' }, { id: 3, name: 'Virtual' }], totalCount: 0 } as PagedResultDto<any>;

  submitted = false;
  form: FormGroup;

  isModalOpen = false;
  selectedAgentAttention = {} as VentanillaDto;

  isActive = false;
  administrativeUnitId = '';
  administrativeUnitName = '';

  isPresentialAttention = false;

  isVirtualAttention = false;
  modalBusy = false;

  constructor(
    public readonly list: ListService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private agentAttentionService: VentanillaService,
    private confirmation: ConfirmationService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    this.administrativeUnitId = this.route.snapshot.params.id;
    this.administrativeUnitName = this.route.snapshot.params.name;
    const serviceStreamCreator = () => this.agentAttentionService.obtenerPorUnidadAdministrativaId(this.administrativeUnitId);

    this.list.hookToQuery(serviceStreamCreator).subscribe((response) => {
      this.agentAttention = response;
    });
  }

  create() {
    this.selectedAgentAttention = {} as VentanillaDto;
    this.buildForm()
    this.isModalOpen = true;
  }

  edit(id: string) {
    this.agentAttentionService.get(id).subscribe((response) => {
      this.selectedAgentAttention = response;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.agentAttentionService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.isActive = this.selectedAgentAttention.isActive;
    this.isPresentialAttention = this.selectedAgentAttention.isPresentialAttention;
    this.isVirtualAttention = this.selectedAgentAttention.isVirtualAttention;
    this.form = this.fb.group({
      nombre: [this.selectedAgentAttention.name || '', [Validators.required, Validators.minLength(0),
        Validators.maxLength(80)]],
      unidadAdministrativaId: [this.selectedAgentAttention.administrativeUnitId || this.administrativeUnitId],
      atencionPresencial: [this.selectedAgentAttention.isPresentialAttention],
      atencionVirtual: [this.selectedAgentAttention.isVirtualAttention],
      inicioAtencion: [this.selectedAgentAttention.attentionStart || ''],
      finAtencion: [this.selectedAgentAttention.attentionEnd || ''],
      activo: [this.selectedAgentAttention.isActive]
    });
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;
    const request = this.selectedAgentAttention.id
      ? this.agentAttentionService.update(this.selectedAgentAttention.id, this.form.value)
      : this.agentAttentionService.create(this.form.value);

    request.pipe(finalize(() => (this.modalBusy = false)))
    .subscribe(() => {
      this.isModalOpen = false;
      this.submitted = false;
      this.form.reset();
      this.list.get();
    });
  }

}
