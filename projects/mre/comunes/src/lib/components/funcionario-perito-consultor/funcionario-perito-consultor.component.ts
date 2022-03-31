import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ConsultarFlujoMigratorioRespuesta,
  ConsultarMultasRespuesta
} from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { DatosBeneficiarioModelo } from '../../modelos/datos-beneficiario-modelo';
import { DatosDomicilioBaneficiarioModelo } from '../../modelos/datos-domicilio-beneficiario-modelo';
import { DatosPasaporteBeneficiarioModelo } from '../../modelos/datos-pasaporte-beneficiario-modelo';
import { DatosSolicitanteModelo } from '../../modelos/datos-solicitante-modelo';
import { DatosVisaBeneficiarioModelo } from '../../modelos/datos-visa-beneficiario-modelo';
import { EnviarDatosModalService } from '../../services/enviar-datos-modal/enviar-datos-modal.service';

@Component({
  selector: 'lib-funcionario-perito-consultor',
  templateUrl: './funcionario-perito-consultor.component.html',
  styleUrls: ['./funcionario-perito-consultor.component.scss']
})
export class FuncionarioPeritoConsultorComponent implements OnInit {
  @Input() formTitle: string = '';
  @Input() formData: FormGroup;
  @Input() mostrarInformacionPagoTramite = false;
  @Output() allLinkVisited = new EventEmitter<boolean>();
  @Output() rowClicked = new EventEmitter();
  @Output() cambioListaSoporteGestion = new EventEmitter<SoporteGestion[]>();

  verficarNegFuncionrio: boolean;
  funcionarioCEV: boolean;
  cantTabs: number = 6;
  tabsHeader: Array<string>;
  radioButtons = [
    { label: 'Requiere subsanación', idFor: 'consultorRadioButton1' },
    { label: 'Requiere peritaje', idFor: 'consultorRadioButton2' },
    { label: 'Revisión positiva', idFor: 'consultorRadioButton3' },
    { label: 'Revisión Negativa', idFor: 'consultorRadioButton4' },
  ];

  tabHeaderMultas = [];

  tabHeaderInformacionPago = [
    { name: 'Descripción', propiedad: 'fg' },
    { name: 'Nro. orden', propiedad: '' },
    { name: 'Nro. Transacción', propiedad: '' },
    { name: 'Valor', propiedad: '' },
    { name: 'Ver', icon: ['fas fa-book'], valShow: "icon" },
  ]

  tabDataSourceInformacionPago = [];
  tabDataSourceMovimientoMigratorio = [];
  tabDataSourceSoporteGestion = [];
  tabDataSourceRequisitios = [];
  tabDataSourceMultas = [];
  srcImagen: string;
  respuestaMensajePopup: boolean = false;
  visaTitular: boolean;

  datosSolicitante: DatosSolicitanteModelo;
  datosBeneficiario: DatosBeneficiarioModelo;
  datosDomicilioBeneficiario: DatosDomicilioBaneficiarioModelo;
  datosPasaporteBeneficiario: DatosPasaporteBeneficiarioModelo;
  datosVisaBeneficiario: DatosVisaBeneficiarioModelo;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
  ) {

    let dataTemp = this.enviarDatosModalService.getData();
    let data = dataTemp.data;
    let tramite = (dataTemp.data as TramitesObj)
    this.srcImagen = tramite.beneficiario.foto;

    this.funcionarioCEV = dataTemp.funcionarioCEV;
    this.verficarNegFuncionrio = (dataTemp.facturacionNegativa == true) ? false : true;
    if (this.funcionarioCEV) {
      this.cantTabs = 7;
      this.tabHeaderMultas = [{ name: 'Tipo de multa', propiedad: 'tipoMulta' }, { name: 'F. Registro', propiedad: "fechaRegistro" }, { name: 'Estado', propiedad: "estado" }];
      this.tabsHeader = [
        'Requisitos',
        'Datos Personales',
        'Dirección/ Pasaporte/ Visa',
        'Movimiento Migratorio',
        'Multas',
        'Soporte de Gestión',
        'Información de pagos',
      ];
    }
    else {
      this.cantTabs = 6;
      this.tabsHeader = [
        'Requisitos',
        'Datos Personales',
        'Dirección/ Pasaporte/ Visa',
        'Movimiento Migratorio',
        'Multas',
        'Soporte de Gestión'
      ];
    }
    if (!this.verficarNegFuncionrio) {
      this.cantTabs = 4;
      this.tabsHeader = [
        'Datos Personales',
        'Dirección/ Pasaporte/ Visa',
        'Movimiento Migratorio',
        'Requisitos'];
    }

    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    let multas = (data.multas as ConsultarMultasRespuesta).multaDto?.multas;
    let flujoMigratorio = (data.flujoMigratorio as ConsultarFlujoMigratorioRespuesta).flujosMigratoriosMovimientosDto;
    if (multas)
      this.tabDataSourceMultas = multas;
    else
      this.tabDataSourceMultas = [];
    this.tabDataSourceMovimientoMigratorio = flujoMigratorio;
    this.tabDataSourceRequisitios = data.documentos;
    this.tabDataSourceSoporteGestion = tramite.soporteGestiones;

  }

  ngOnInit(): void {
    this.verficarNegFuncionrio = true;
    //   if(this.funcionarioCEV )
    //   {this.cantTabs = 7;
    //     this.tabsHeader = [
    //       'Datos Personales',
    //       'Dirección/ Pasaporte/ Visa',
    //       'Movimiento migratorio',
    //       'Requisitos',
    //       'Multas',
    //       'Soporte de Gestión',
    //       'Información de pagos',
    //     ];
    //   }
    //    else
    //   { 
    //     this.cantTabs = 6;
    //     this.tabsHeader = [
    //     'Datos Personales',
    //     'Dirección/ Pasaporte/ Visa',
    //     'Movimiento migratorio',
    //     'Requisitos',
    //     'Multas',
    //     'Soporte de Gestión'
    //   ];
    // }

    // if(!this.verficarNegFuncionrio){
    //   this.cantTabs = 4;
    //   this.tabsHeader = [
    //   'Datos Personales',
    //   'Dirección/ Pasaporte/ Visa',
    //   'Movimiento migratorio',
    //   'Requisitos'];
    //   }

    this.datosSolicitante = {
      cedula: this.formData.controls['cedulaSolicitante'].value,
      nacionalidad: this.formData.controls['nacionalidadSolicitante'].value,
      nombreCompleto: this.formData.controls['nombreCompletSolicitanteo'].value,
      pais: this.formData.controls['paisSolicitante'].value,
      ciudad: this.formData.controls['ciudadSolicitante'].value,
      paisUnidadAdministrativa: this.formData.controls['paisConsuladoUnidadAdministrativaSolicitante'].value,
      direccion: this.formData.controls['cedulaSolicitante'].value,
      telefono: this.formData.controls['direccionSolicitante'].value,
      edad: this.formData.controls['edadSolicitante'].value,
      nombreUnidadAdministrativa: this.formData.controls['nombreConsuladoUnidadAdministrativaSolicitante'].value
    };

    const tieneDiscapacidad: boolean = this.formData.controls['discapacidadBeneficiario'].value;
    this.datosBeneficiario = {
      fechaSolicitud: this.formData.controls['fechaSolicitudBeneficiario'].value,
      primerApellido: this.formData.controls['primerApellidoBeneficiario'].value,
      segundoApellido: this.formData.controls['segundoApellidoBeneficiario'].value,
      nombreCompleto: this.formData.controls['nombreCompletoBeneficiario'].value,
      numeroMdg: this.formData.controls['numberMDGBeneficiario'].value,
      nacionalidad: this.formData.controls['nacionalidadBeneficiario'].value,
      ciudadNacimiento: this.formData.controls['ciudadNacimientoBeneficiario'].value,
      estadoCivil: this.formData.controls['estadoCivilBeneficiario'].value,
      genero: this.formData.controls['generoBeneficiario'].value,
      correoElectronico: this.formData.controls['emailBeneficiario'].value,
      tieneDiscapacidad: tieneDiscapacidad ? 'Si' : 'No',
      porcientoDiscapacidad: this.formData.controls['porcientoDiscapacidadBeneficiario'].value,
      numeroCarnetConadis: this.formData.controls['numeroCarnetConadisBeneficiario'].value,
      fechaNacimiento: '',
      edad: this.formData.controls['edadBeneficiario'].value,
      calidadMigratoria: '',
      grupo: '',
      tipoVisa: '',
      actividadDesarrollar: ''
    };

    this.datosDomicilioBeneficiario = {
      pais: this.formData.controls['paisDomicilioBeneficiario'].value,
      provincia: this.formData.controls['provinciaDomicilioBeneficiario'].value,
      ciudad: this.formData.controls['ciudadDomicilioBeneficiario'].value,
      numeroTelefono: this.formData.controls['telefonoDomicilioBeneficiario'].value,
      direccion: this.formData.controls['direccionDomicilioBeneficiario'].value,
      numeroCelular: this.formData.controls['celularDomicilioBeneficiario'].value,
      numeroTelefonoTrabajo: this.formData.controls['telefonoTrabajoDomicilioBeneficiario'].value
    };

    this.datosPasaporteBeneficiario = {
      numero: this.formData.controls['numeroPasaporteBeneficiario'].value,
      fechaEmision: this.formData.controls['fechaEmisionPasaporteBeneficiario'].value,
      paisEmision: this.formData.controls['paisEmisionPasaporteBeneficiario'].value,
      nombreCompleto: this.formData.controls['nombreCompletoPasaporteBeneficiario'].value,
      fechaExpiracion: this.formData.controls['fechaExpiracionPasaporteBeneficiario'].value,
      ciudadEmision: this.formData.controls['ciudadEmisionPasaporteBeneficiario'].value,
      fechaNacimiento: this.formData.controls['fechaNacimientoPasaporteBeneficiario'].value,
    };

    const tieneVisa: boolean = this.formData.controls['tieneVisaBeneficiario'].value;

    this.datosVisaBeneficiario = {
      tieneVisa: tieneVisa ? 'Si' : 'No',
      numeroVisa: this.formData.controls['numeroVisaBeneficiario'].value,
      fechaEmision: this.formData.controls['fechaEmisionVisaBeneficiario'].value,
      tipoVisa: this.formData.controls['tipoVisaBeneficiario'].value,
      fechaExpiracion: this.formData.controls['fechaExpiracionVisaBeneficiario'].value
    };
  }



  comprobarLinkVistados(data: any) {
    data.tabClicked = this.enviarDatosModalService.switchData(data.tabsName);
    data.tabClickedBefore = this.enviarDatosModalService.switchData(data.tabsNameClickedBefore);
    this.allLinkVisited.emit(data);
  }

  rowClickedEvent(data: any) {
    this.rowClicked.emit(data);
  }

  // Cuando existe un cambio en la lista de soporte de gestión
  cambioSoporteGestion(archivos: SoporteGestion[]) {
    this.cambioListaSoporteGestion.emit(archivos);
  }

  onCloseModal() {

  }
}
