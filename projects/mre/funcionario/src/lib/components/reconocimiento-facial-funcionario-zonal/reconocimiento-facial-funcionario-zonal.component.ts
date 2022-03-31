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
import { ReconocimientoFacialFacetecDto } from '../../modelos/reconocimiento-facial-facetec';

@Component({
  selector: 'lib-reconocimiento-facial-funcionario-zonal',
  templateUrl: './reconocimiento-facial-funcionario-zonal.component.html',
  styleUrls: ['./reconocimiento-facial-funcionario-zonal.component.scss']
})
export class ReconocimientoFacialFuncionarioZonalComponent implements OnInit {
  tabHeaderMultas = [{ name: 'Tipo de multa', propiedad: 'tipoMulta' }, { name: 'F. Registro', propiedad: "fechaRegistro" }, { name: 'Estado', propiedad: "estado" }];
  tabDataSourceMultas: Array<any> = [];
  radioButtons = [
    { label: 'Si, aprobado reconocimiento facial', idFor: 'funcionarioRadioButton1' },
    { label: 'No, enviar negativa de tráamite', idFor: 'funcionarioRadioButton2' },
  ];

  formData: FormGroup;
  formTitle: string;
  radioButtonChecked: number = 0;
  data: any;
  tramiteAsignado: boolean = false;
  visaTitular: boolean;
  linksVisitedAll: boolean = false;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  datosReconocimientoFacial: ReconocimientoFacialFacetecDto;
  reconocimientoFacialProcesado = false;
  resultadoReconocimientoFacial: boolean;

  datosSolicitanteCompartido: DatosSolicitanteCompartidoModelo;
  datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;


  constructor(
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService) {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const dataTemp1 = this.data as TramitesObj;
    this.visaTitular = !(dataTemp1.solicitanteId == dataTemp1.beneficiarioId);
    this.movimientoActivo = dataTemp1.movimientos[dataTemp1.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.linksVisitedAll = this.tramiteAsignado = dataTemp.tramiteAsignado;
    if (!this.linksVisitedAll) {
      this.meensajeOnBoardService.showMensajePredefinido("info");
    }

    let photo = this.data.beneficiario.foto;
    let order = photo.indexOf(';');
    photo = photo.substring(order + 1, photo.length);
    photo = photo.replace('base64,', '');
    this.datosReconocimientoFacial = {
      imagen2dBase64: photo,
      prefijoIdentificadorUnico: 'Cancilleria_Visas',
      nivelMinimoComparacionFoto: 6
    };

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

  resultadoProcesoComparar(data: boolean) {
    console.log('Se dispara el evento resultadoProcesoComparar y el valor de data es');
    console.log(data);
    this.reconocimientoFacialProcesado = true;
    this.resultadoReconocimientoFacial = data;
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    switch (this.radioButtonChecked) {
      case 0://si
        // movimiento.estado = 16;
        movimiento.estado = EstadoTramite.RevisionReconocimientoFacial;
        break;
      case 1://no
        // movimiento.estado = 16;
        movimiento.estado = EstadoTramite.RevisionReconocimientoFacial;
        break;
    }
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, this.radioButtons[this.radioButtonChecked].label);
  }

  onCloseModal() {
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

}
