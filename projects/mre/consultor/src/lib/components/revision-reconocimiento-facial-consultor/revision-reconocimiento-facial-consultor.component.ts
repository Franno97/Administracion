import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-revision-reconocimiento-facial-consultor',
  templateUrl: './revision-reconocimiento-facial-consultor.component.html',
  styleUrls: ['./revision-reconocimiento-facial-consultor.component.scss']
})
export class RevisionReconocimientoFacialConsultorComponent implements OnInit {
  tabHeader: Array<any> = [];
  tabDataSource: Array<any> = [];

  formData: FormGroup;
  data: any;
  formTitle: string;
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
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private modalService: NgbActiveModal
  ) { }

  comprobarObservacionesDesactivarOptionPositiva() {
    // for(let item in this.observacionesObj)
    // {
    //   if(this.observacionesObj[item] != '')
    //    {
    //     this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = true;
    //     return;
    //    }
    // }
    // this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = this.entroSubsanacionMultas;
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);

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

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    let radioButtonChecked = 0;
    switch (radioButtonChecked) {
      case 0://SI 
        // movimiento.estado = 3;
        movimiento.estado = EstadoTramite.ValidarInformacion;
        break;
      case 1://NO CONTINUA
        // movimiento.estado = 90;
        movimiento.estado = EstadoTramite.Terminado;
        break;
    }
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService);
  }
  onCloseModal() {
    // this.modalService.close();
  }
}
