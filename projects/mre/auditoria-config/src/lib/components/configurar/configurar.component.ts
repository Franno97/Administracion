 

import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';


import { ConfirmationService, Confirmation, ToasterService } from '@abp/ng.theme.shared';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { AuditarService,AuditarObjetoBuscarDto, AuditarObjetoDto, ObtenerAuditableInput, AuditableService, AuditableDto } from '@mre/auditoria-config/proxy/mre/sb/auditoria-conf/auditoria-conf';
import { Observable, of, OperatorFunction } from 'rxjs';


@Component({
  selector: 'lib-auditoria-configuracion',
  templateUrl: './configurar.component.html',
  providers: [ListService],
})
export class ConfigurarComponent implements OnInit {

  auditarConfig = { items: [], totalCount: 0 } as PagedResultDto<AuditarObjetoBuscarDto>;

  form: FormGroup;

  configuracionSeleccionada = {} as AuditarObjetoDto;

  isModalOpen = false;

  modalBusy = false;

  submitted = false;

  accionesSeleccionadas: string[];

  accionesDisponibles: any[] = [];
 
  auditableSeleccionado = {} as AuditableDto;
  buscandoAuditables = false;
  buscandoAuditablesError = false;
 

  trackByFn: TrackByFunction<AbstractControl> = (index, item) => Object.keys(item)[0] || index;

  constructor(public readonly list: ListService,
    private entityService: AuditarService,
    private auditableService: AuditableService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    const entityStreamCreator = (query) => this.entityService.buscar(query);

    this.list.hookToQuery(entityStreamCreator).subscribe((response) => {
      this.auditarConfig = response;
    });

    for (let clave in AccionesEntidad)
    {
      this.accionesDisponibles.push({nombre: clave, codigo:AccionesEntidad[clave] });    
    }

    
  }

  agregarConfiguracion() {
    this.configuracionSeleccionada = {} as AuditarObjetoBuscarDto;
    this.buildForm();
    this.isModalOpen = true;

  }
  
  editarConfiguracion(item: string) {
    this.entityService.obtener(item).subscribe((entity) => {
      this.configuracionSeleccionada = entity;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

   
  borrarConfiguracion(item: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.entityService.eliminar(item).subscribe(() => this.list.get());
      }
    });
  }
  
 
  buildForm() {

    console.log(this.configuracionSeleccionada);

    this.accionesSeleccionadas = this.configuracionSeleccionada.acciones;
    
    this.form = this.fb.group({
      item: [this.configuracionSeleccionada.item || null, Validators.required]
      //tipo: [this.selectedEntity.tipo || null, Validators.required]
    });
 
    var accionControl = this.fb.array([]);
     
    for (let accion in AccionesEntidad) {
      
      accionControl.push( this.fb.group({
        [accion]: [!!this.accionesSeleccionadas?.find(dato => dato === AccionesEntidad[accion]) || false ],
      }));

    } 

    this.form.addControl('acciones',accionControl);


  }

  get accionesControl(): FormGroup[] {
    return ((this.form.get('acciones') as FormArray)?.controls as FormGroup[]) || [];
  }


  guardar() {

    this.submitted = true;

   

    if (this.form.invalid) {
      return;
    }


    const { acciones = [] } = this.form.value;
    const { item = {}} = this.form.value;

    if (!item.id && !this.configuracionSeleccionada.item){
      return;
    } 

    
    const accionesNombres =
    acciones.filter(role => !!role[Object.keys(role)[0]]).map(role => Object.keys(role)[0]) ||
      [];

    let accionesCodigos:string[]=[];
     
    for (let accion in AccionesEntidad) { 
      if (!!accionesNombres?.find(dato => dato === accion)){
        accionesCodigos.push(AccionesEntidad[accion]); 
      }
    } 

    if (accionesCodigos.length == 0) {
      this.toaster.error('AuditoriaConf::Auditar:AccionesVacia', 'AuditoriaConf::Titulo:Validacion');
      return;
    }


    this.modalBusy = true;
    
    

    let data = {} as AuditarObjetoDto;
    data.acciones =  accionesCodigos;
    if (item.id){
      data.item = item.item;
    }else{
      data.item = this.configuracionSeleccionada.item;
    }
    
    this.entityService.configurar(data).pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      }); 
  }

  


  buscarAuditable: OperatorFunction<string, readonly AuditableDto[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.buscandoAuditables = true),
    switchMap(filter => {
      
      if (filter === '') {
        return of([]);
      }

      const input = {} as ObtenerAuditableInput;
      input.filter = filter;
      
      return this.auditableService.getList(input).pipe(
        map(a => a.items),
        tap(() => this.buscandoAuditables = false),
        catchError(() => {
          this.buscandoAuditablesError = true;
          return of([]);
        }));
    }
    ),
    tap(() => this.buscandoAuditables = false)
  )

  formatoAuditable = (x: AuditableDto) => x.item;

}




export enum AccionesEntidad {
  Crear = "C",
  Actualizar = "A",
  Eliminar = "E"
}