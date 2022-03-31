import { Injectable } from '@angular/core';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosModalService {
  data: any;
  constructor() { }
  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  getFotoBeneficiario() {
    let data = this.data.data as TramitesObj;
    return data.beneficiario.foto;
  }
  switchData(tabsName: string): string {
    let val: string = '';
    switch (tabsName) {
      case 'Datos Personales':
        val = "observacionDatosPersonales";
        break;
      case 'Dirección/ Pasaporte/ Visa':
        val = "observacionDomicilios";
        break;
      case 'Movimiento Migratorio':
        val = "observacionMovimientoMigratorio";
        break;
      case 'Requisitos':
        val = ''
        break;
      case 'Multas':
        val = "observacionMultas";
        break;
      case "Soporte de Gestión":
        val = 'observacionSoportesGestion'
        break;
      case "Generales":
        val = 'observacionSoportesGestion'
        break;
      case 'Información de pagos':
        val = ''
        break;
    }
    return val;
  }
  copiarCiertasPropiedadesObj(Obj1: any, Obj2: any) {
    let propiedadesObj: Array<string> = ['observacionDatosPersonales', 'observacionDomicilios', 'observacionMovimientoMigratorio', 'observacionMultas', 'observacionSoportesGestion'];
    propiedadesObj.forEach(x => {
      if (Obj2[x] == undefined) {
        if (x == "fechaHoraCita")
          Obj1[x] = null;
        else
          Obj1[x] = '';
      }
      else
        Obj1[x] = Obj2[x];
    });
  }
}
