import { ConfigStateService } from '@abp/ng.core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-citas-revision-datos-menor-edad-funcionario',
  templateUrl: './citas-revision-datos-menor-edad-funcionario.component.html',
  styleUrls: ['./citas-revision-datos-menor-edad-funcionario.component.scss']
})
export class CitasRevisionDatosMenorEdadFuncionarioComponent implements OnInit {
  @Input() formData: FormGroup;
  @Output() allLinkVisited = new EventEmitter<boolean>();
  tabsHeader: Array<string> = [
    'Datos Personales',
    'Requisitos',
    'Soporte de Gestión'
  ];
  tabHeaderSoporteGestion = [{ name: 'Nombre', propiedad: 'nombre' }, { name: 'Subir', icon: ['fas fa-book'] }, { name: 'View', icon: ['fas fa-home'] }];
  tabHeaderRequisitios = [{ name: 'Documento', propiedad: 'nombre' }, { name: 'Nombre documento', propiedad: 'ruta' }, { name: 'Subir', icon: ['fas fa-book'] }, { name: 'View', icon: ['fas fa-home'] }];

  tabDataSourceSoporteGestion = [];
  tabDataSourceRequisitios = [];
  radioButtons = [
    { label: 'Revisión positiva', idFor: 'consultorRadioButton1', disabled: false },
    { label: 'Revisión Negativa', idFor: 'consultorRadioButton2', disabled: false },
  ];
  formTitle: string;
  radioButtonChecked: number = 0;
  linksVisitedAll: boolean = false;
  movimientoActivo: MovimientoRequest;
  tramiteAsignado: boolean = false;
  requisitos: boolean = true;
  data: any;
  visaTitular: boolean;
  observacionesName: string = 'Datos Personales';
  observacionesModel: any;
  observacionesAnteriores: string = '';
  entroSubsanacionMultas: boolean = false;
  entroSubsanacionObservaciones: boolean = false;
  //Para guardar temporalmente la obsservaciones;;;;
  observacionesObj: any = {};
  descripcionSoporteGestion: any = {};
  observacionesRequisitos: any = {};

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
  ) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle
    this.data = dataTemp.data;
    const tramite = this.data as TramitesObj
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
    this.tabDataSourceRequisitios = tramite.documentos;
    this.tabDataSourceSoporteGestion = tramite.soporteGestiones;
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.tramiteAsignado = dataTemp.tramiteAsignado;

    this.datosSolicitanteCompartido = {
      cedula: this.formData.controls['cedulaSolicitante'].value,
      nacionalidad: this.formData.controls['nacionalidadSolicitante'].value,
      nombreCompleto: this.formData.controls['nombreCompletSolicitanteo'].value,
      pais: this.formData.controls['paisSolicitante'].value,
      ciudad: this.formData.controls['ciudadSolicitante'].value,
      telefono: this.formData.controls['telefonoSolicitante'].value,
      edad: this.formData.controls['edadSolicitante'].value,
      correoElectronico: this.formData.controls['correoSolicitante'].value
    };

    const tieneDiscapacidad: boolean = this.formData.controls['discapacidadBeneficiario'].value;

    this.datosBeneficiarioCompartido = {
      primerApellido: this.formData.controls['primerApellidoBeneficiario'].value,
      nombres: this.formData.controls['nombreCompletoBeneficiario'].value,
      paisNacimiento: this.formData.controls['paisNacimientoBeneficiario'].value,
      correoElectronico: this.formData.controls['emailBeneficiario'].value,
      nacionalidad: this.formData.controls['nacionalidadBeneficiario'].value,
      numeroDocumento: this.formData.controls['numeroPasaporteBeneficiario'].value,
      tieneDiscapacidad: tieneDiscapacidad ? 'Si' : 'No',
      numeroCarnetConadis: this.formData.controls['numeroCarnetConadisBeneficiario'].value,
      segundoApellido: this.formData.controls['segundoApellidoBeneficiario'].value,
      fechaNacimiento: this.formData.controls['fechaNacimientoBeneficiario'].value,
      edad: this.formData.controls['edadBeneficiario'].value,
      porcientoDiscapacidad: this.formData.controls['porcientoDiscapacidadBeneficiario'].value,
    };


  }

  clicRadioButton(radio: number) {
    this.radioButtonChecked = radio;
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    switch (this.radioButtonChecked) {
      case 0://positiva
        // movimiento.estado = 3;
        movimiento.estado = EstadoTramite.ValidarInformacion;
        break;
      case 1://negativa
        // movimiento.estado = 26;
        movimiento.estado = EstadoTramite.ValidarInformacionNegativa;
        break;
    }
    let val: SoporteGestion;
    let dataObj2: any;
    for (let x in this.descripcionSoporteGestion) {
      val = this.descripcionSoporteGestion[x] as SoporteGestion;
      dataObj2 = {
        tramiteId: data.id,
        nombre: val.nombre,
        ruta: val.ruta,
        descripcion: val.descripcion,
        creatorId: currentUser.id
      }
      this.tramitesPendientesService.grabarInformacionArchivo(dataObj2).subscribe();
    }
    this.tramitesPendientesService.guardarObservRequisitosContinuarProcGuardado(this.observacionesRequisitos, movimiento, this.modalService);
  }

  comprobarObservacionesDesactivarOptionPositiva() {
    for (let item in this.observacionesObj) {
      if (this.observacionesObj[item] != '') {
        this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = true;
        this.radioButtonChecked = 1;
        return;
      }
    }
    // this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = this.entroSubsanacionMultas;
    this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = false;
    this.radioButtonChecked = 0;
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  comprobarLinkVistados(data: any) {
    let objObservacion = this.enviarDatosModalService.switchData(data.tabsName);
    this.observacionesName = (data.tabsName == 'Soporte de Gestión') ? "Generales" : data.tabsName;
    this.observacionesAnteriores = this.movimientoActivo[objObservacion];
    this.requisitos = (data.tabsName == 'Requisitos') ? false : true;
    this.observacionesModel = this.observacionesObj[objObservacion] == undefined ? '' : this.observacionesObj[objObservacion];
    if (data.linkVisited && !this.tramiteAsignado)
      this.meensajeOnBoardService.showMensajePredefinido("info");
    this.linksVisitedAll = data.linkVisited && this.tramiteAsignado;
  }

  rowClicked(data: any) {
    switch (data.option) {
      case 'Descripción':
        data.data.descripcion = data.value;
        this.descripcionSoporteGestion[data.rowIndex] = data.value;
        break;
      case 'Observaciones':
        data.data.observacion = data.value;
        this.observacionesRequisitos[data.rowIndex] = data.data;
        break;
    }
  }

  onCloseModal() {
  }
}
