import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MeensajeOnBoardService } from '@mre/comunes';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FiltroTramitesPorRol } from '../../models/tramites-modelos';
import { TramitesPendientesService } from '../../services/tramites-pendientes.service';

@Component({
  selector: 'lib-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  switch_expression: string = '';
  tabHeader: Array<any>;
  tabDataSource: Array<any>;
  tabDataSource1: Array<any>;
  formData = this.fb.group({
    numberMDG: ["OJOJO"],
    cedulaSolicitante: [{ value: null, disabled: true }, Validators.required],
    nacionalidadSolicitante: [{ value: null, disabled: true }, Validators.required],
    nombreCompletSolicitanteo: [{ value: null, disabled: true }, Validators.required],
    paisSolicitante: [{ value: null, disabled: true }, Validators.required],
    ciudadSolicitante: [{ value: null, disabled: true }, Validators.required],
    paisConsuladoUnidadAdministrativaSolicitante: [{ value: null, disabled: true }, Validators.required],
    direccionSolicitante: [{ value: null, disabled: true }, Validators.required],
    telefonoSolicitante: [{ value: null, disabled: true }, Validators.required],
    edadSolicitante: [{ value: null, disabled: true }, Validators.required],
    correoSolicitante: [{ value: null, disabled: true }, Validators.required],
    nombreConsuladoUnidadAdministrativaSolicitante: [{ value: null, disabled: true }, Validators.required],
    // --------------------------------------
    fechaSolicitudBeneficiario: [{ value: null, disabled: true }, Validators.required],
    primerApellidoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    segundoApellidoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nombreCompletoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numberMDGBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    edadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    estadoCivilBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nacionalidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    generoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    emailBeneficiario: [{ value: null, disabled: true }, Validators.required],
    calidadMigratoria: [{ value: null, disabled: true }, Validators.required],
    grupoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    tipoVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    actividadDesarrollarBeneficiario: [{ value: null, disabled: true }, Validators.required],
    discapacidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    porcientoDiscapacidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroCarnetConadisBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    provinciaDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    telefonoDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    celularDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    direccionDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    telefonoTrabajoDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nombreCompletoPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaNacimientoPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    tieneVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
  });
  toastService: any;
  mensajesArr: Array<any>;
  constructor(
    private config: NgbModalConfig,
    private configStateService: ConfigStateService,
    private fb: FormBuilder,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private tramitesPendientesService: TramitesPendientesService) {
    const currentUser = this.configStateService.getOne('currentUser');
    this.switch_expression = currentUser.roles[0];
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.centered = false;
    this.config.size = 'xl';
    if (this.switch_expression == "Consultor") {
      this.tabHeader = [
        { name: 'Nro trámite', propiedad: 'numero' },
        { name: 'Observaciones', propiedad: 'numero' },
        { name: 'Solicitante', propiedad: 'solicitante.nombres' },
        { name: 'Beneficiario', propiedad: 'beneficiario.nombres' },

        { name: 'Fecha de trámite', propiedad: 'fecha' },
        { name: 'Estado de trámite', propiedad: 'movimientos.nombreEstado' },
        { name: 'Seleccionar', icon: ['fas fa-eye'], valShow: 'icon' }
      ];
    }
    else {
      this.tabHeader = [
        { name: 'Nro trámite', propiedad: 'numero' },
        { name: 'Observaciones', propiedad: 'numero' },
        { name: 'Solicitante', propiedad: 'solicitante.nombres' },
        { name: 'Beneficiario', propiedad: 'beneficiario.nombres' },

        { name: 'Fecha de trámite', propiedad: 'fecha' },
        { name: 'Estado de trámite', propiedad: 'movimientos.nombreEstado' },
        { name: 'Tomar trámite', icon: ['fas fa-save'], valShow: 'icon' },
        { name: 'Seleccionar', icon: ['fas fa-eye'], valShow: 'icon' }
      ];
    }
    let rolUser = currentUser.roles[0];
    let idUser = currentUser.id;

    const filtro: FiltroTramitesPorRol = {
      nombreRol: rolUser,
      usuarioId: idUser,
      numeroRegistros: 10,
      paginaActual: 1,
      ordenColumna: null,
      ordenForma: null,
      filtro: null
    };

    /* this.tramitesPendientesService.getTramitesByRol(filtro).subscribe(response => {
      this.tabDataSource = response.result;
      // this.tabDataSource = tramitesPendientesService.fakeData();

    }); */
  }
  ngOnInit(): void {
    this.tramitesPendientesService.setReactiveForm(this.formData);
    this.mensajesArr = this.meensajeOnBoardService.getMensajes();
  }
}
