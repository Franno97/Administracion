

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';


import { AuditableService, AuditableDto, ObtenerAuditableInput, CategoriaDto, CategoriaService } from '@mre/auditoria-config/proxy/mre/sb/auditoria-conf/auditoria-conf';


@Component({
  selector: 'lib-auditable',
  templateUrl: './auditable.component.html',
  providers: [ListService],
})
export class AuditableComponent implements OnInit {

  auditable = { items: [], totalCount: 0 } as PagedResultDto<AuditableDto>;
  categorias : CategoriaDto[];


  form: FormGroup;

  auditableSeleccionado = {} as AuditableDto;

  categoriaSeleccionada:string;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  constructor(public readonly list: ListService<ObtenerAuditableInput>,
    private auditableService: AuditableService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {
  }

  ngOnInit() {
   
    this.list.hookToQuery(query => this.auditableService.getList({...query, categoriaId: this.categoriaSeleccionada})).subscribe(response => 
      (this.auditable = response)
    );

    this.cargaCatalogos();

  }

  cambiarCategoria(e) { 
    this.list.get();
  }

  private cargaCatalogos() {
    this.categoriaService.getLookup().subscribe((response) => {
      this.categorias = response.items;
    });
  }
  


}
