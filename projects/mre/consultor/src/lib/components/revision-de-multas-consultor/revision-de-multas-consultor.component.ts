import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosBeneficiarioCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-beneficiario-compartido-modelo';
import { DatosSolicitanteCompartidoModelo } from 'projects/mre/comunes/src/lib/modelos/datos-solicitante-compartido-modelos';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { MultaDto, MultaFlujoMigratorio } from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-revision-de-multas-consultor',
  templateUrl: './revision-de-multas-consultor.component.html',
  styleUrls: ['./revision-de-multas-consultor.component.scss']
})
export class RevisionDeMultasConsultorComponent implements OnInit {
  // tabHeaderMultas = [{ name: 'Tipo de multa', propiedad: 'tipoMulta' }, { name: 'F. Registro', propiedad: "fechaRegistro" }, { name: 'Estado', propiedad: "estado" }];
  tabDataSourceMultas: Array<any> = [];
  radioButtons = [
    { label: 'Exoneración', idFor: 'consultorRadioButton1' },
    { label: 'Negar', idFor: 'consultorRadioButton2' },
  ];
  formData: FormGroup;
  radioButtonChecked = 'consultorRadioButton1';
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
    private modalService: NgbActiveModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService) {
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;

    const tramite = this.data as TramitesObj;
    this.visaTitular = !(tramite.solicitanteId == tramite.beneficiarioId);
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;

    const multaDto = this.data.multas as MultaDto;
    const multas = multaDto != null ? multaDto.multas : [];//(this.data.multas as MultaDto).multas;
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
    this.tabDataSourceMultas = multas;

    const cantidadMultasNoAnuladas = this.obtenerCantidadMultasNoAnuladas(multas);

    if (cantidadMultasNoAnuladas === 0) {
      this.radioButtonChecked = 'consultorRadioButton3';
      this.radioButtons = [
        { label: 'Reconocimiento Facial', idFor: 'consultorRadioButton3' }
      ];
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

  // Obtiene la cantidad de multas no anuladas
  obtenerCantidadMultasNoAnuladas(multas: MultaFlujoMigratorio[]): number {
    let cantidad = 0;
    if (multas != null) {
      multas.forEach(x => {
        if (x.estado.toLowerCase() !== 'anulada') {
          cantidad++;
        }
      });
    }
    return cantidad;
  }

  comprobarObservacionesDesactivarOptionPositiva() {
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  onCloseModal() {
    // this.modalService.close();
  }

  clicRadioButton(radioId: string) {
    this.radioButtonChecked = radioId;
  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    movimiento.fechaHoraCita = '1900-01-01';
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);

    let accionMovimiento = ''

    switch (this.radioButtonChecked) {
      case 'consultorRadioButton1'://exoneracion
        // movimiento.estado = 11;
        movimiento.estado = EstadoTramite.ExonerarMultasMDG;
        accionMovimiento = 'Exoneración';
        break;
      case 'consultorRadioButton2'://negar
        // movimiento.estado = 12;
        movimiento.estado = EstadoTramite.VerificarNegativaMultas;
        accionMovimiento = 'Negar';
        break;
      case 'consultorRadioButton3'://reconocimiento facial
        // movimiento.estado = 13;
        movimiento.estado = EstadoTramite.ReconocimientoFacial;
        accionMovimiento = 'Reconocimiento Facial';
        break;
    }
    /* if (this.radioButtons.length == 1)
      this.radioButtonChecked = 0; */
    this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, accionMovimiento);
  }
}
