import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
@Component({
  selector: 'lib-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  providers: [DecimalPipe]
})
export class TableViewComponent implements OnInit, OnChanges {
  @Input() tabHeader: Array<any> = [];
  @Input() tabDataSource: Array<any> = [];
  @Input() tomarTramite: any = { tomarTramite: false, creatorId: '' };
  @Input() filtrosArrValue: boolean = false;
  @Input() pagination: boolean = false;
  @Output() rowClicked = new EventEmitter();
  @Output() updateTable = new EventEmitter();


  filtrosArr: Array<any> = [];
  observDataModel: Array<any> = [];
  disabledModel: Array<boolean> = [];
  page = 1;
  pageSize = 10;
  cantRowArr: Array<number> = [10, 15, 20];
  collectionSize: number;
  dataSource: Array<any> = [];
  formData = this.fb.group({
    search: [null]
  });
  disabledArr: Array<any> = [];
  dataSubsanacion: any = {};

  constructor(private fb: FormBuilder,
    private pipe: DecimalPipe) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if ((this.tabDataSource != undefined) && (this.tabDataSource != null)) {
      this.collectionSize = this.tabDataSource.length;
      this.refreshData(this.tabDataSource);
      this.creandoFiltros();
    }
  }

  pickedField(boton: any, data: any, disabled: boolean, i: number, observ: string = '') {
    let dataTemp = data as TramitesObj;
    let movimiento: any;
    let tramiteAsignado: any;
    switch (boton.name) {
      case 'Tomar trámite':
        movimiento = dataTemp.movimientos[dataTemp.movimientos.length - 1];
        tramiteAsignado = this.tomarTramite.creatorId == movimiento.usuarioId;
        if (this.disabledArr[i]['Tomar trámite'] == 'iconEnabled') {
          this.disabledArr[i]['Tomar trámite'] = "iconDisabled";
          this.rowClicked.emit({ option: boton.name, data: data, enabledSeleccionar: this.disabledArr, pos: i, tramiteAsignado: tramiteAsignado });
        }
        break;
      case 'Seleccionar':
        movimiento = dataTemp.movimientos[dataTemp.movimientos.length - 1];
        tramiteAsignado = this.tomarTramite.creatorId == movimiento.usuarioId;
        if (this.disabledArr[i]['Seleccionar'] == 'iconEnabled')
          this.rowClicked.emit({ option: boton.name, data: data, enabledSeleccionar: this.disabledArr, pos: i, tramiteAsignado: tramiteAsignado });
        break;
      case 'Sel. Subsanación':
        if (this.dataSubsanacion[data.id] == undefined)
          this.dataSubsanacion[data.id] = true;
        else
          this.dataSubsanacion[data.id] = !this.dataSubsanacion[data.id];
        let valSubsanacion = true;
        for (let item in this.dataSubsanacion) {
          valSubsanacion = valSubsanacion && this.dataSubsanacion[item];
        }
        this.rowClicked.emit({ option: boton.name, data: data, subsanacion: valSubsanacion, rowIndex: i, value: this.dataSubsanacion[data.id] });
        break;
      default:

        this.rowClicked.emit({ option: boton.name, data: data, rowIndex: i, value: observ });
        break;
    }
  }
  creandoFiltros() {
    let i = 0;

    this.tabDataSource.forEach((item, index) => {
      this.observDataModel[index] = item.observacion;
      if (item.descripcion != undefined)
        this.observDataModel[index] = item.descripcion;
      this.filtrosArr[i] = new Array<string>();
      this.tabHeader.forEach((x: any) => {
        let cad: string = this.transform(item, x.propiedad);
        this.filtrosArr[i].push(cad?.toLowerCase());
      });
      ++i;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let dataTemp = this.tabDataSource.filter((x, index) => {
      let cad = this.filtrosArr[index].join();
      let filter = cad.includes(filterValue);
      return filter ? x : null;

    });
    this.refreshData(dataTemp);
  }
  transform(item: any, data: string) {
    if (data == undefined) return null;
    let posI = data.split('.');
    let n = posI.length;
    let i = 0;
    while (i < n) {
      item = item[posI[i]];
      if (posI[i] == 'movimientos')
        item = item[item.length - 1];
      ++i;
    }
    return item;
  }
  refreshData(data: Array<any>) {
    if (data != undefined) {
      this.dataSource = data;
      this.collectionSize = this.dataSource.length;
    }
    else
      this.dataSource = this.tabDataSource;
    var i: number = 0;
    this.dataSource.forEach((x) => {
      let movimiento: MovimientoRequest;
      if (x.movimientos != undefined)
        movimiento = (x.movimientos[x.movimientos.length - 1]);
      else
        movimiento = x;
      if (this.tomarTramite.tomarTramite) {
        let val = movimiento.usuarioId == this.tomarTramite.creatorId;
        this.disabledArr[i] = {
          'Seleccionar': 'iconEnabled',
          'Tomar trámite': (val) ? 'iconDisabled' : 'iconEnabled'
        }
      }
      else
        this.disabledArr[i] = {
          'Seleccionar': 'iconEnabled',
        }
      ++i;
    })
    if (this.collectionSize / this.pageSize > 15) {
      this.pageSize = Math.floor(this.collectionSize / 15);
      this.cantRowArr = [this.pageSize, this.pageSize + Math.floor(this.pageSize / 4), this.pageSize + Math.floor(this.pageSize / 2)];
    }
    this.dataSource = this.dataSource
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  update() {
    this.updateTable.emit();
  }
}
