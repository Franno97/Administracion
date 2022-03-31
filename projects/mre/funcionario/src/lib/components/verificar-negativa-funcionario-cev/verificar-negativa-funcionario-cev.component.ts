import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-verificar-negativa-funcionario-cev',
  templateUrl: './verificar-negativa-funcionario-cev.component.html',
  styleUrls: ['./verificar-negativa-funcionario-cev.component.scss']
})
export class VerificarNegativaFuncionarioCevComponent implements OnInit {
  tabHeader: Array<any> = [
    { name: 'Categoría migratoria', propiedad: 'categoriaMigratoria' },
    { name: 'Fecha de movimiento', propiedad: 'fechaHoraMovimiento' },
    { name: 'Motivo de viaje', propiedad: 'motivoViaje' },
    { name: 'Documento miratorio', propiedad: 'tipoDocumentoMovimientoMigratorio' },
    { name: 'Número de documento', propiedad: '' },
    { name: 'País destindo', propiedad: 'paisDestino' },
  ];
  tabDataSource: Array<any> = [];
  radioButtons = [
    { label: 'Aceptar negativa', idFor: 'consultorRadioButton1' },
    { label: 'Devolver trámite al proceso de reconocimiento facial', idFor: 'consultorRadioButton2' },
  ];
  formData: FormGroup;
  formTitle: string;
  radioButtonChecked: number = 0;
  linksVisitedAll: boolean = false;
  data: any;
  requisitos: boolean = true;
  visaTitular: boolean;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private modalService: NgbActiveModal
  ) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;
    const tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.linksVisitedAll = dataTemp.tramiteAsignado;
    if (!this.linksVisitedAll) {
      this.meensajeOnBoardService.showMensajePredefinido("info");
    }

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

  comprobarObservacionesDesactivarOptionPositiva() {
    // for(let item in this.observacionesObj)
    // {
    //   if(this.observacionesObj[item] != '')
    //    {
    //     this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = true;
    //     return;
    //    }
    // }
    // // this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = this.entroSubsanacionMultas;
    // this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = false;
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    switch (this.radioButtonChecked) {
      case 0://aceptar negativa
        // movimiento.estado = 92;
        movimiento.estado = EstadoTramite.Negado;
        break;
      case 1://devolver tramite
        // movimiento.estado = 14;
        movimiento.estado = EstadoTramite.GenerarCitaSubsanacionReconocimientoFacial;
        break;
    }
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, this.radioButtons[this.radioButtonChecked].label);
  }

  onCloseModal() {
  }
}
