import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import {
  DatosBeneficiarioSharedModule, DatosSolicitanteSharedModule,
  FormDatosComunModule, FormRequisitiosModule,
  FormTemplateModule, FuncionarioPeritoConsultorModule,
  InputFieldModule, LinksModule,
  ObservacionesModule, PagoFacturacionComprobantesModule,
  SoporteGestionModule, TableViewModule, TabsViewModule
} from '@mre/comunes';
import { FuncionarioComponent } from './funcionario.component';
import { TramitesPendientesComponent } from './components/tramites-pendientes/tramites-pendientes.component';
import { RevisionDatosMenorEdadFuncionarioComponent } from './components/revision-datos-menor-edad-funcionario/revision-datos-menor-edad-funcionario.component';
import { CitasRevisionDatosMenorEdadFuncionarioComponent } from './components/citas-revision-datos-menor-edad-funcionario/citas-revision-datos-menor-edad-funcionario.component';
import { FacturacionFuncionarioComponent } from './components/facturacion-funcionario/facturacion-funcionario.component';
import { GenerarVisaElectronicaFuncionarioComponent } from './components/generar-visa-electronica-funcionario/generar-visa-electronica-funcionario.component';
import { DatosSolicitanteModule } from 'projects/mre/comunes/src/lib/components/datos-solicitante/datos-solicitante.module';
import { VerificarNegativaFuncionarioCevComponent } from './components/verificar-negativa-funcionario-cev/verificar-negativa-funcionario-cev.component';
import { GenerarCitaFuncionarioZonalComponent } from './components/generar-cita-funcionario-zonal/generar-cita-funcionario-zonal.component';
import { ReconocimientoFacialFuncionarioZonalComponent } from './components/reconocimiento-facial-funcionario-zonal/reconocimiento-facial-funcionario-zonal.component';
import { ValidarInformacionFuncionarioCevComponent } from './components/validar-informacion-funcionario-cev/validar-informacion-funcionario-cev.component';
import { FormsModule } from '@angular/forms';
import { VerificarMultasNegativasFuncionarioComponent } from './components/verificar-multas-negativas-funcionario/verificar-multas-negativas-funcionario.component';
import { VerificarNegativaInformacionFuncionarioComponent } from './components/verificar-negativa-informacion-funcionario/verificar-negativa-informacion-funcionario.component';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReconocimientoFacialFacetecComponent } from './components/reconocimiento-facial-facetec/reconocimiento-facial-facetec.component';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { AgendarCitaModule } from 'projects/mre/comunes/src/lib/components/agendar-cita/agendar-cita.module';
import { FacturacionPagoFuncionarioComponent } from './components/facturacion-pago-funcionario/facturacion-pago-funcionario.component';
import { OrdenCedulacionComponent } from './components/orden-cedulacion/orden-cedulacion.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { InformacionPagoTramiteFuncionarioComponent } from './components/informacion-pago-tramite-funcionario/informacion-pago-tramite-funcionario.component';
import { AsignacionTramiteComponent } from './components/asignacion-tramite/asignacion-tramite.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { VerificarVisaFuncionarioComponent } from './components/verificar-visa-funcionario/verificar-visa-funcionario.component';
import { DatosVisaBeneficiarioModule } from 'projects/mre/comunes/src/lib/components/datos-visa-beneficiario/datos-visa-beneficiario.module';

@NgModule({
  declarations: [
    FuncionarioComponent,
    TramitesPendientesComponent,
    RevisionDatosMenorEdadFuncionarioComponent,
    CitasRevisionDatosMenorEdadFuncionarioComponent,
    FacturacionFuncionarioComponent,
    GenerarVisaElectronicaFuncionarioComponent,
    VerificarNegativaFuncionarioCevComponent,
    GenerarCitaFuncionarioZonalComponent,
    ReconocimientoFacialFuncionarioZonalComponent,
    ValidarInformacionFuncionarioCevComponent,
    VerificarMultasNegativasFuncionarioComponent,
    VerificarNegativaInformacionFuncionarioComponent,
    ReconocimientoFacialFacetecComponent,
    FacturacionPagoFuncionarioComponent,
    OrdenCedulacionComponent,
    InformacionPagoTramiteFuncionarioComponent,
    AsignacionTramiteComponent,
    VerificarVisaFuncionarioComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    FuncionarioPeritoConsultorModule,
    FormRequisitiosModule,
    DatosSolicitanteModule,
    DatosSolicitanteSharedModule,
    DatosBeneficiarioSharedModule,
    AgendarCitaModule,
    InputFieldModule,
    TableViewModule,
    FormDatosComunModule,
    SoporteGestionModule,
    TabsViewModule,
    LinksModule,
    ObservacionesModule,
    FormTemplateModule,
    PagoFacturacionComprobantesModule,
    NgbModule,
    NgbDatepickerModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxExtendedPdfViewerModule,
    FuncionarioRoutingModule,
    DatosVisaBeneficiarioModule
  ],
  exports: [
    FuncionarioComponent
  ],
  providers: [],
})
export class FuncionarioModule {
  static forChild(): ModuleWithProviders<FuncionarioModule> {
    return {
      ngModule: FuncionarioModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<FuncionarioModule> {
    return new LazyModuleFactory(FuncionarioModule.forChild());
  }

}
