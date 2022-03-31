import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation, ToasterService } from '@abp/ng.theme.shared';


import { NgbDateNativeAdapter, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

import { UsuarioService } from '@proxy/identidad/usuario.service';
import { BancoLookupDto, BancoService, GetUnidadAdministrativaInput, MonedaLookupDto, MonedaService, NivelLookupDto, NivelService, TipoCuentaBancariaDto, TipoCuentaBancariaService, UnidadAdministrativaDto, UnidadAdministrativaFuncionalDto, UnidadAdministrativaService, UnidadAdministrativaTipoInfoDto, UnidadAdministrativaTipoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { CountryDto, GeograficaService, RegionDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/geografica';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-administrative-unit',
  templateUrl: './administrative-unit.component.html',
  styleUrls: ['./administrative-unit.component.css'],
  providers: [
    ListService, 
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AdministrativeUnitComponent implements OnInit {

  administrativeUnit = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaDto>;

  administrativeUnitType : UnidadAdministrativaTipoInfoDto[];
  bank : BancoLookupDto[];
  currency : MonedaLookupDto[];
  level : NivelLookupDto[];
  tipoCuentaBancaria:TipoCuentaBancariaDto[];
  form: FormGroup;

  formMissionChief: FormGroup;

  isModalOpen = false;

  isModalOpenMissionChief = false;

  isActive = true;

  submitted = false;

  submittedMissionChief = false;

  selectedAdministrativeUnit = {} as UnidadAdministrativaDto;

  countries : CountryDto [];

  jurisdiccion: string[];
  jurisdiccionEliminar = [] as string[];

  functionary = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaFuncionalDto>
  selectedCountry = {id: '', name: 'Seleccione'};
  regions : RegionDto [];
  subRegions = [];
  administrativeUnitId = '';

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  isSelectedOperationStartDate = false;
  modalBusy = false;

  constructor(
    public readonly list: ListService<GetUnidadAdministrativaInput>,
    public readonly listAdministrativeUnitType: ListService,
    private administrativeUnitService: UnidadAdministrativaService,
    private administrativeUnitTypeService: UnidadAdministrativaTipoService,
    private bankService: BancoService,
    private currencyService: MonedaService,
    private levelService: NivelService,
    private geographycalService: GeograficaService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private usuarioService: UsuarioService,
    private tipoCuentaBancariaService: TipoCuentaBancariaService,
    private toaster: ToasterService,
    @Inject(TABLA_MAXIMO_RESULTADO) maximoResultado?: number) {
      this.list.maxResultCount = maximoResultado;
    }

  ngOnInit(): void {
    const serviceStreamCreator = (query) => this.administrativeUnitService.getList(query);

    this.list.hookToQuery(serviceStreamCreator).subscribe((response) => {
      this.administrativeUnit = response;
    });
  }

  private loadCatalogs() {
    this.administrativeUnitTypeService.obtenerListaInfo().subscribe((response) => {
      this.administrativeUnitType = response.items;
    });

    this.bankService.getLookup().subscribe((response) => {
      this.bank = response.items;
    });

    this.currencyService.getLookup().subscribe((response) => {
      this.currency = response.items;
    });

    this.levelService.getLookup().subscribe((response) => {
      this.level = response.items;
    });

    this.geographycalService.getCountries().subscribe((response) => {
      this.countries = response.items;
    });

    this.tipoCuentaBancariaService.getLookup().subscribe((response) => {
      this.tipoCuentaBancaria = response.items;
    });
    
  }

  create() {
    this.loadCatalogs();
    this.selectedAdministrativeUnit = {} as UnidadAdministrativaDto;
    this.jurisdiccion = [];

    this.buildForm();
    this.isModalOpen = true;
    const current = new Date();
    this.minDate = { year: current.getFullYear(), month: current.getMonth(), day: current.getDate() };
    this.maxDate = null;
  }

  onSelectDateOperationStart(event: NgbDateStruct){
    this.minDate = { year: event.year, month: event.month, day: event.day + 7 };
  }

  onSelectDateOperationEnd(event: NgbDateStruct) {
    this.maxDate = { year: event.year, month: event.month, day: event.day - 7 };
  }

  edit(id: string) {
    this.loadCatalogs();
    this.administrativeUnitService.get(id).subscribe((unitAdministrative) => {
      this.selectedAdministrativeUnit = unitAdministrative;
      this.jurisdiccion = this.selectedAdministrativeUnit.jurisdiccion;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  

  deactive(entidad: UnidadAdministrativaDto) {

    if (!entidad.activo){
      this.toaster.warn('AdministrativeUnit::AdministrativeUnit:YaEstaInactiva', 'Base::AdvertenciaTitulo');
      return;
    }

    this.confirmation.warn('::ConfirmarDesactivacion', '::AreYouSure').subscribe((status) => {
      const statusDeactive = false;
      if (status === Confirmation.Status.confirm) {
        this.administrativeUnitService.cambiarEstado(entidad.id, statusDeactive).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    if (this.selectedAdministrativeUnit.activo !== undefined){
      this.isActive = this.selectedAdministrativeUnit.activo;
      this.loadRegions(this.selectedAdministrativeUnit.paisId);
    } else {
      this.isActive = true;
    }
    this.form = this.fb.group({
      nombre: [this.selectedAdministrativeUnit.nombre || '', [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(80),
      Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
      siglas: [this.selectedAdministrativeUnit.siglas || '', [Validators.required,
      Validators.minLength(0),
      Validators.maxLength(4)]],
      codigo: [this.selectedAdministrativeUnit.codigo || '', [Validators.required,
        Validators.minLength(0),
        Validators.maxLength(4),
        Validators.pattern(/^\w+$/)]], 
      tipoUnidadAdministrativaId: [this.selectedAdministrativeUnit.tipoUnidadAdministrativaId || null, Validators.required],
      dependenciaAdministrativaId: [this.selectedAdministrativeUnit.dependenciaAdministrativaId || null],
      paisId: [this.selectedAdministrativeUnit.paisId || null, Validators.required],
      regionId: [this.selectedAdministrativeUnit.regionId || null, Validators.required],
      ciudad: [this.selectedAdministrativeUnit.ciudad || null, [Validators.required,Validators.maxLength(512)]],
      direccion: [this.selectedAdministrativeUnit.direccion || '' ,Validators.maxLength(512)],
      codigoPostal: [this.selectedAdministrativeUnit.codigoPostal || '',Validators.maxLength(12)],
      fechaInicioOperacion: [this.selectedAdministrativeUnit.fechaInicioOperacion ? new Date(this.selectedAdministrativeUnit.fechaInicioOperacion) : null],
      fechaFinOperacion: [this.selectedAdministrativeUnit.fechaFinOperacion ? new Date(this.selectedAdministrativeUnit.fechaFinOperacion) : null],
      bancoId: [this.selectedAdministrativeUnit.bancoId || null, Validators.required],
      monedaId: [this.selectedAdministrativeUnit.monedaId || null, Validators.required],
      nivelId: [this.selectedAdministrativeUnit.nivelId || null],
      activo: [this.selectedAdministrativeUnit.activo],
      observaciones: [this.selectedAdministrativeUnit.observaciones || ''],
      tipoCuentaBancariaId: [this.selectedAdministrativeUnit.tipoCuentaBancariaId || null, Validators.required],
      titularCuentaBancaria: [this.selectedAdministrativeUnit.titularCuentaBancaria || null, 
        [Validators.required,
         Validators.maxLength(80),
         Validators.pattern(/^[a-zA-Z0-9-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]],
        numeroCuentaBancaria: [this.selectedAdministrativeUnit.numeroCuentaBancaria || null,  [Validators.required,
          Validators.maxLength(32)]]
    });
  }
   

  save() {
    this.submitted = true;
    
  
    if (typeof this.jurisdiccion !== 'undefined' && this.jurisdiccion.length === 0) {
      this.toaster.warn('AdministrativeUnit::Jurisdiccion:Vacio', 'Base::AdvertenciaTitulo');
      return;
    }

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

     
    const request = this.selectedAdministrativeUnit.id
      ? this.administrativeUnitService.update(this.selectedAdministrativeUnit.id, {jurisdiccion:this.jurisdiccion, ...this.form.value})
      : this.administrativeUnitService.create(  {jurisdiccion:this.jurisdiccion, ...this.form.value});

    request
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.list.get();
      });
  }

  assignMissionChief(id) {
    this.getFunctionariesByAdminsitrativeUnit(id);
    this.buildFormMissionChief()
    this.administrativeUnitId = id;
    this.isModalOpenMissionChief = true;
  }

  buildFormMissionChief() {
    this.formMissionChief = this.fb.group({
      usuarioId: [null, Validators.required]
    });
  }

  saveMissionChief(){
    this.submittedMissionChief = true;

    if (this.formMissionChief.invalid) {
      return;
    }

    const userId = this.formMissionChief.get('usuarioId').value;
    this.administrativeUnitService.assignMissionChief(this.administrativeUnitId, userId).subscribe(() =>{
      this.isModalOpenMissionChief = false;
      this.submittedMissionChief = false;
      this.formMissionChief.reset();
    })
  }

  getFunctionariesByAdminsitrativeUnit(administrativeUnitId: string){
    this.administrativeUnitService.obtenerFuncionales(administrativeUnitId).subscribe((functionaries) => {
      //Obtener datos de usuarios
      let userIds = functionaries.items.map(({ usuarioId }) => usuarioId);

      this.usuarioService.obtenerLista(userIds).subscribe((response) => {
        functionaries.items.forEach(item => {
          item.nombre = response.find(u => u.id == item.usuarioId).name;
          item.apellido = response.find(u => u.id == item.usuarioId).surname;
        });
      });

      this.functionary = functionaries;
    });
  }

  onSelectCountry(target: string): void {
    const splitCountryCode = target.split(' ');
    const countryCode = splitCountryCode[splitCountryCode.length - 1]; 
    this.loadRegions(countryCode);
  }

  loadRegions(countryCode: string) {
    this.geographycalService.getRegionByCountryCode(countryCode).subscribe((response) => {
      this.regions = response.items;
    });
  }


  agregarJurisdiccion(jurisdiccion:string){

    if (!jurisdiccion)
      return;

    const jurisdiccionUpperCase = jurisdiccion.toUpperCase()
                      .trim()
                      .split(' ')
                      .filter(item => item.length > 0)
                      .join(' ');

    //verificar si no existe
    if (!this.jurisdiccion.includes(jurisdiccionUpperCase)){
      this.jurisdiccion.push(jurisdiccionUpperCase);
    } 
  }

  jurisdiccionChange(event){
    this.jurisdiccionEliminar = [];
    const selectedOptions = event.currentTarget.selectedOptions;
    for (let i = 0; i < selectedOptions.length; i++) {
      this.jurisdiccionEliminar.push(selectedOptions[i].value);
    }
    
  }

  eliminarJurisdiccion(){

    this.jurisdiccion =  this.jurisdiccion.filter((val, index) => {
      return !this.jurisdiccionEliminar.includes(val);
    })

    this.jurisdiccionEliminar= [];
    
      
  }

  
}
