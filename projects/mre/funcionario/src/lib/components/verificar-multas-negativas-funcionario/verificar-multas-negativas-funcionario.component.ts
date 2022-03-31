import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { ConsultarMultasRespuesta } from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-verificar-multas-negativas-funcionario',
  templateUrl: './verificar-multas-negativas-funcionario.component.html',
  styleUrls: ['./verificar-multas-negativas-funcionario.component.scss']
})
export class VerificarMultasNegativasFuncionarioComponent implements OnInit {
  tabHeaderMultas = [{ name: 'Tipo de multa', propiedad: 'tipoMulta' }, { name: 'F. Registro', propiedad: "fechaRegistro" }, { name: 'Estado', propiedad: "estado" }];
  tabDataSourceMultas: Array<any> = [];
  radioButtons = [
    { label: 'Aceptar negativa', idFor: 'consultorRadioButton1', disabled: false },
    { label: 'Devolver tráamite al consultor', idFor: 'consultorRadioButton2', disabled: false },
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
  // entroSubsanacionObservaciones:boolean = false;
  // entroSubsanacionMultas:boolean = false;
  movimientoActivo: MovimientoRequest;
  // observacionesRequisitos:any ={};

  observacionesModel: any;
  observacionesObj: any = {};

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  constructor(
    private modalService: NgbActiveModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private tramitesPendientesService: TramitesPendientesService) {

    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;
    const tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;


    let multas = (this.data.multas as ConsultarMultasRespuesta).multaDto?.multas
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
    this.tabDataSourceMultas = multas;
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

  comprobarObservacionesDesactivarOptionPositiva() {

  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
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
      case 0://aceptar negativa
        // movimiento.estado = 92;
        movimiento.estado = EstadoTramite.Negado;
        break;
      case 1://devolver tramite
        // movimiento.estado = 10;
        movimiento.estado = EstadoTramite.RevisarMultasExoneracion;
        break;
    }
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, this.radioButtons[this.radioButtonChecked].label);
  }
  onCloseModal() {

  }
}
