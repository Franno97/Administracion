import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { MultasApiService } from 'projects/mre/comunes/src/lib/services/multas-api/multas-api.service';
import { Multa } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/multa';
import { RegistrarMulta } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/registrar-multa';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { UpdateRequisito } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/update-requisito';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-validar-informacion-funcionario-cev',
  templateUrl: './validar-informacion-funcionario-cev.component.html',
  styleUrls: ['./validar-informacion-funcionario-cev.component.scss']
})
export class ValidarInformacionFuncionarioCevComponent implements OnInit {

  radioButtons = [
    { label: 'Si, continúa con el proceso', idFor: 'consultorRadioButton1', disabled: false },
    { label: 'No, negar el trámite', idFor: 'consultorRadioButton2', disabled: false },
  ];

  formTitle: string;
  formData: FormGroup;
  radioButtonChecked: number = 0;
  linksVisitedAll: boolean = false;
  movimientoActivo: MovimientoRequest;
  tramiteAsignado: boolean = false;
  data: any;
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
  //Para guardar temporalmente la obsservaciones;;;;

  mostrarDatosBoton = false;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private modalService: NgbActiveModal,
    private servicioMulta: MultasApiService
  ) {
    let dataTemp = this.enviarDatosModalService.getData();
    if (dataTemp.facturacionNegativa) {
      this.radioButtons[0].disabled = true;
      this.radioButtonChecked = 1;
    }
    this.formTitle = dataTemp.formTitle;
    this.data = dataTemp.data;
    let tramite = this.data as TramitesObj;
    this.movimientoActivo = tramite.movimientos[tramite.movimientos.length - 1];
    this.observacionesAnteriores = (this.movimientoActivo.observacionDatosPersonales == undefined) ? "" : this.movimientoActivo.observacionDatosPersonales;
    this.formData = this.tramitesPendientesService.getReacitveForm();
    this.tramitesPendientesService.patchValuetoForm(this.data);
  }

  ngOnInit(): void {
    let dataTemp = this.enviarDatosModalService.getData();
    this.tramiteAsignado = dataTemp.tramiteAsignado;
  }

  comprobarObservacionesDesactivarOptionPositiva() {
    // for(let item in this.observacionesObj)
    // {
    //   if(this.observacionesObj[item] != '')
    //    {
    //     this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = true;
    //     this.radioButtonChecked = 0;
    //     return;
    //    }
    // }
    // this.entroSubsanacionObservaciones = this.radioButtons[3].disabled = this.entroSubsanacionMultas;
    // if(this.observacionesRequisitos != {})
    //   {
    //     this.radioButtonChecked = 0;
    //     this.radioButtons[3].disabled = true;
    //   }
  }

  observChange(data: any) {
    this.observacionesModel = data.observacionesModel;
    this.observacionesObj[this.enviarDatosModalService.switchData(data.observacionesName)] = this.observacionesModel;
    this.comprobarObservacionesDesactivarOptionPositiva();
  }

  allLinkVisited(data: any) {
    this.observacionesName = (data.tabsName == 'Soporte de Gestión') ? "Generales" : data.tabsName;
    this.observacionesAnteriores = this.movimientoActivo[data.tabClicked];
    this.requisitos = (data.tabsName == 'Requisitos') ? false : true;
    this.observacionesModel = this.observacionesObj[data.tabClicked] == undefined ? '' : this.observacionesObj[data.tabClicked];
    if (data.linkVisited && !this.tramiteAsignado) {
      this.meensajeOnBoardService.showMensajePredefinido("info");
    }

    this.linksVisitedAll = data.linkVisited && this.tramiteAsignado;
    this.mostrarDatosBoton = data.numberTabClicked === 5;
  }

  clicRadioButton(radio: number) {
    this.radioButtonChecked = radio;
  }

  rowClickedEvent(data: any) {
    this.comprobarObservacionesDesactivarOptionPositiva();
    switch (data.option) {
      case 'Sel. Subsanación':
        this.entroSubsanacionMultas = data.subsanacion;
        this.radioButtons[3].disabled = (data.subsanacion || this.entroSubsanacionObservaciones) ? true : false
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

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);

    switch (this.radioButtonChecked) {
      case 0://si
        // movimiento.estado = 23;
        movimiento.estado = EstadoTramite.VerificarVisas;
        break;
      case 1://no
        // movimiento.estado = 92;
        movimiento.estado = EstadoTramite.Negado;
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
        descripcion: temp.observacion
      };
      requisitosArr.push(requisito);
    }
    let registrarMultas: RegistrarMulta = {} as RegistrarMulta;
    let multaTemp: Multa = {} as Multa;
    registrarMultas.tramiteId = data.id
    registrarMultas.usuarioId = currentUser.id;
    registrarMultas.listaDetalleMultas = [];
    for (let multas in this.multasSubsanar) {
      if (this.multasSubsanar[multas].value == true) {

        multaTemp.estado = this.multasSubsanar[multas].estado;
        multaTemp.fechaRegistro = this.multasSubsanar[multas].fechaRegistro;
        multaTemp.observacion = "Subsanación";
        multaTemp.tipoMulta = this.multasSubsanar[multas].tipoMulta;
        registrarMultas.listaDetalleMultas.push(multaTemp);
      }
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
    if (requisitosArr.length)
      this.tramitesPendientesService.updateObservacionRequisitos(requisitosArr).subscribe(response => {
        this.continuarProcesoGuardado(registrarMultas, movimiento);
      });
    else
      this.continuarProcesoGuardado(registrarMultas, movimiento);
  }
  private continuarProcesoGuardado(registrarMultas: RegistrarMulta, movimiento: MovimientoRequest) {
    if (registrarMultas.listaDetalleMultas.length) {
      this.servicioMulta.registrarMulta(registrarMultas).subscribe(res => {
        this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, this.radioButtons[this.radioButtonChecked].label);
      });
    }
    else
      this.tramitesPendientesService.postCrearMovimientoTramite(movimiento, this.modalService, this.radioButtons[this.radioButtonChecked].label);
  }

}