import { ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudGrabarSoporteGestion } from 'projects/mre/comunes/src/lib/modelos/documentos-api-servicio-modelo';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { DocumentosApiService } from 'projects/mre/comunes/src/lib/services/documentos-api/documentos-api.service';
import { MultasApiService } from 'projects/mre/comunes/src/lib/services/multas-api/multas-api.service';
import { Multa } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/multa';
import { RegistrarMulta } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/registrar-multa';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { UpdateRequisito } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/update-requisito';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-validar-informacion',
  templateUrl: './validar-informacion.component.html',
  styleUrls: ['./validar-informacion.component.scss'],
})
export class ValidarInformacionComponent implements OnInit {
  formData: FormGroup;
  radioButtonChecked: number = 0;
  linksVisitedAll: boolean = false;
  movimientoActivo: MovimientoRequest;
  data: any;
  formTitle: string;
  requisitos: boolean = true;
  observacionesName: string = 'Datos Personales';
  observacionesModel: any;
  observacionesAnteriores: string = '';
  entroSubsanacionMultas: boolean = false;
  entroSubsanacionObservaciones: boolean = false;
  descripcionSoporteGestion: Array<SoporteGestion> = [];
  observacionesRequisitos: any = {};
  multasSubsanar: any = {};
  //Para guardar temporalmente la obsservaciones;;;;
  observacionesObj: any = {};

  mostrarDatosBoton = false;

  radioButtons = [
    { label: 'Revisión positiva', idFor: 'consultorRadioButton4', disabled: false },
    { label: 'Requiere subsanación', idFor: 'consultorRadioButton2', disabled: false },
    { label: 'Enviar a control Menor de edad', idFor: 'consultorRadioButton1', disabled: false },
    { label: 'Requiere peritaje', idFor: 'consultorRadioButton3', disabled: false },
    { label: 'Revisión Negativa', idFor: 'consultorRadioButton5', disabled: false },
  ];

  archivosSoporteGestion: SoporteGestion[] = [];

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private modalService: NgbActiveModal,
    private servicioDocumento: DocumentosApiService,
    private servicioMulta: MultasApiService,
    private servicioConfirmacion: ConfirmationService
  ) { }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;
    const tramite = this.data as TramitesObj;

    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores =
      this.movimientoActivo.observacionDatosPersonales == undefined
        ? ''
        : this.movimientoActivo.observacionDatosPersonales;
    const negativaDePeritaje = this.enviarDatosModalService.getData().negativaDePeritaje;
    if (negativaDePeritaje === true) {
      this.radioButtons[0].disabled =
        this.radioButtons[1].disabled =
        this.radioButtons[2].disabled =
        this.radioButtons[3].disabled =
        true;
      this.radioButtonChecked = 4;
    }

    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  clicRadioButton(radio: number) {
    this.radioButtonChecked = radio;
  }

  comprobarObservacionesDesactivarOptionPositiva() {
    for (let item in this.observacionesObj) {
      if (this.observacionesObj[item] !== '') {
        if (this.radioButtonChecked === 0) {
          this.radioButtonChecked = 1;
        }
        this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = true;
        return;
      }
    }
    /* this.entroSubsanacionObservaciones = this.radioButtons[0].disabled =
      this.entroSubsanacionMultas;
    if (this.observacionesRequisitos != {}) {
      this.radioButtonChecked = 0;
      this.radioButtons[0].disabled = true;
    } */
    if (this.entroSubsanacionMultas) {
      this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = true;
    } else {

      this.radioButtonChecked = 0;
      this.entroSubsanacionObservaciones = this.radioButtons[0].disabled = false;
    }
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] =
      this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  allLinkVisited(data: any) {
    this.observacionesName = data.tabsName == 'Soporte de Gestión' ? 'Generales' : data.tabsName;
    this.observacionesAnteriores = this.movimientoActivo[data.tabClicked];
    this.requisitos = data.tabsName == 'Requisitos' ? false : true;
    this.observacionesModel =
      this.observacionesObj[data.tabClicked] == undefined
        ? ''
        : this.observacionesObj[data.tabClicked];
    this.linksVisitedAll = data.linkVisited;

    const estadoNumber = Number(this.movimientoActivo.estado);

    //EstadoTramite.ValidarInformacionNegativa
    this.mostrarDatosBoton =
      (data.numberTabClicked === 5 && estadoNumber !== EstadoTramite.ValidarInformacionNegativa) ||
      (data.numberTabClicked === 6 && estadoNumber === EstadoTramite.ValidarInformacionNegativa);
  }

  rowClickedEvent(data: any) {
    this.comprobarObservacionesDesactivarOptionPositiva();
    switch (data.option) {
      case 'Sel. Subsanación':
        this.entroSubsanacionMultas = data.subsanacion;
        this.radioButtons[0].disabled =
          data.subsanacion || this.entroSubsanacionObservaciones ? true : false;
        data.data.value = data.value;
        this.multasSubsanar[data.rowIndex] = data.data;
        break;
      case 'Descripción':
        this.descripcionSoporteGestion[data.rowIndex] = data.data;
        this.descripcionSoporteGestion[data.rowIndex].descripcion = data.value;
        break;
      case 'Observaciones':
        data.data.observacion = data.value;
        this.observacionesRequisitos[data.rowIndex] = data.data;
        break;
    }
  }

  // Cuando existe un cambio en la lista de soporte de gestión
  cambioSoporteGestion(archivos: SoporteGestion[]) {
    this.archivosSoporteGestion = archivos;
  }

  async onSubmit() {
    let movimiento = {} as MovimientoRequest;
    const data = this.data as TramitesObj;

    const currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    switch (this.radioButtonChecked) {
      case 0: //positiva
        // movimiento.estado = 10;
        movimiento.estado = EstadoTramite.RevisarMultasExoneracion;
        break;
      case 1: //subsanacion
        // movimiento.estado = 4;
        movimiento.estado = EstadoTramite.SubsanacionInformacion;
        break;
      case 2: //menor de edad
        // movimiento.estado = 5;
        movimiento.estado = EstadoTramite.GenerarCitaMenoresEdadZonal;
        break;
      case 3: //peritaje
        // movimiento.estado = 7;
        movimiento.estado = EstadoTramite.GenerarCitaPeritaje;
        break;
      case 4: //negativa
        // movimiento.estado = 9;
        movimiento.estado = EstadoTramite.VerificarNegativaInformacion;
        break;
    }
    let requisitosArr: Array<UpdateRequisito> = [];
    var requisito: UpdateRequisito;
    let temp: any;
    for (let item in this.observacionesRequisitos) {
      temp = this.observacionesRequisitos[item];
      requisito = {
        tramiteId: temp.tramiteId,
        documentoId: temp.id,
        descripcion: temp.observacion,
      };
      requisitosArr.push(requisito);
    }
    let registrarMultas: RegistrarMulta = {} as RegistrarMulta;
    let multaTemp: Multa = {} as Multa;
    registrarMultas.tramiteId = data.id;
    registrarMultas.usuarioId = currentUser.id;
    registrarMultas.listaDetalleMultas = [];

    for (let multas in this.multasSubsanar) {
      if (this.multasSubsanar[multas].value == true) {
        multaTemp.estado = this.multasSubsanar[multas].estado;
        multaTemp.fechaRegistro = this.multasSubsanar[multas].fechaRegistro;
        multaTemp.observacion = 'Subsanación';
        multaTemp.tipoMulta = this.multasSubsanar[multas].tipoMulta;
        registrarMultas.listaDetalleMultas.push(multaTemp);
      }
    }

    const guardarDocumentos = this.archivosSoporteGestion.length > 0 ? await this.guardarDocumentosSoporteGestion() : true;
    if (guardarDocumentos) {
      if (requisitosArr.length)
        this.tramitesPendientesService
          .updateObservacionRequisitos(requisitosArr)
          .subscribe(response => {
            this.continuarProcesoGuardado(registrarMultas, movimiento);
          });
      else {
        this.continuarProcesoGuardado(registrarMultas, movimiento);
      }
    } else {
      const optionsError: Partial<Confirmation.Options> = {
        hideCancelBtn: false,
        hideYesBtn: true,
        cancelText: 'Cerrar',
        yesText: 'Confirm',
        messageLocalizationParams: ['Demo'],
        titleLocalizationParams: [],
      };
      this.servicioConfirmacion.warn(
        'Error al guardar los documentos',
        'Validación',
        optionsError
      );
    }

  }

  private continuarProcesoGuardado(registrarMultas: RegistrarMulta, movimiento: MovimientoRequest) {
    if (registrarMultas.listaDetalleMultas.length) {
      this.servicioMulta.registrarMulta(registrarMultas).subscribe(res => {
        this.tramitesPendientesService.postCrearMovimientoTramite(
          movimiento,
          this.modalService,
          this.radioButtons[this.radioButtonChecked].label
        );
      });
    } else
      this.tramitesPendientesService.postCrearMovimientoTramite(
        movimiento,
        this.modalService,
        this.radioButtons[this.radioButtonChecked].label
      );
  }

  // Guardar los documentos de soporte de gestión
  private async guardarDocumentosSoporteGestion(): Promise<boolean> {
    let resultado = false;
    try {
      const codigoMdg = this.data.beneficiario.codigoMDG;
      const tramiteId = this.data.id;
      const currentUser = this.configStateService.getOne('currentUser');

      for (let i = 0; i < this.archivosSoporteGestion.length; i++) {
        const solicitud: SolicitudGrabarSoporteGestion =
        {
          archivo: this.archivosSoporteGestion[i].fichero,
          codigoMDG: codigoMdg,
        };
        const respuesta = await this.servicioDocumento.postGrabarSoporteGestion(solicitud).toPromise();

        if (respuesta.Estado === 'ERROR') {
          break;
        }

        // Crear soporte de gestión
        const soporteGuardar = {
          tramiteId: tramiteId,
          nombre: this.archivosSoporteGestion[i].nombre,
          ruta: respuesta.Ruta,
          descripcion: this.archivosSoporteGestion[i].descripcion,
          creatorId: currentUser.id,
        };

        const respuestaGuardarSoporte = await this.tramitesPendientesService
          .grabarInformacionArchivo(soporteGuardar)
          .toPromise();

        if (respuestaGuardarSoporte.httpStatusCode !== 200) {
          break;
        }

        resultado = true;
      }
    } catch (e) {
      console.log('Error ', e);
    }

    return resultado;
  }
}
