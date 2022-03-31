
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioPeritoConsultorComponent } from './funcionario-perito-consultor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableViewModule } from '../table-view/table-view.module';
import { TabsViewModule } from '../tabs-view/tabs-view.module';
import { FormRequisitiosModule } from '../form-requisitios/form-requisitios.module';
import { DatosPersonalesModule } from '../datos-personales/datos-personales.module';
import { DomicilioPasaporteVisaModule } from '../domicilio-pasaporte-visa/domicilio-pasaporte-visa.module';
import { FormTemplateModule } from '../form-template/form-template.module';
import { FormDatosComunModule } from '../form-datos-comun/form-datos-comun.module';
import { SoporteGestionModule } from '../soporte-gestion/soporte-gestion.module';
import { MultasModule } from '../multas/multas.module';
import { MovimientoMigratorioModule } from '../movimiento-migratorio/movimiento-migratorio.module';
import { LinksModule } from '../links/links.module';



@NgModule({
  declarations: [
    FuncionarioPeritoConsultorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableViewModule,
    TabsViewModule,
    FormRequisitiosModule,
    DatosPersonalesModule,
    DomicilioPasaporteVisaModule,
    FormTemplateModule,
    SoporteGestionModule,
    FormDatosComunModule,
    MultasModule,
    MovimientoMigratorioModule,
    LinksModule
  ],
  exports:[FuncionarioPeritoConsultorComponent]
})
export class FuncionarioPeritoConsultorModule { }
