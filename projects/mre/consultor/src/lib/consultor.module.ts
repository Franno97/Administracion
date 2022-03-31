import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosBeneficiarioSharedModule, DatosSolicitanteSharedModule, FormDatosComunModule, FormTemplateModule, FuncionarioPeritoConsultorModule, GraficoProcesoVisaModule, ObservacionesModule, PagoFacturacionComprobantesModule, TableViewModule } from '@mre/comunes';
import { ValidarInformacionComponent } from './components/validar-informacion/validar-informacion.component';
import { TramitesPendientesComponent } from './components/tramites-pendientes/tramites-pendientes.component';
import { ConsultorComponent } from './consultor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevisionDeMultasConsultorComponent } from './components/revision-de-multas-consultor/revision-de-multas-consultor.component';
import { ValidarPagoConsultorComponent } from './components/validar-pago-consultor/validar-pago-consultor.component';
import { RevisionReconocimientoFacialConsultorComponent } from './components/revision-reconocimiento-facial-consultor/revision-reconocimiento-facial-consultor.component';
import { VerificarVisaConsultorComponent } from './components/verificar-visa-consultor/verificar-visa-consultor.component';
import { DatosVisaBeneficiarioModule } from 'projects/mre/comunes/src/lib/components/datos-visa-beneficiario/datos-visa-beneficiario.module';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ConsultorComponent,
    ValidarInformacionComponent,
    TramitesPendientesComponent,
    RevisionDeMultasConsultorComponent,
    ValidarPagoConsultorComponent,
    RevisionReconocimientoFacialConsultorComponent,
    VerificarVisaConsultorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FuncionarioPeritoConsultorModule,
    FormTemplateModule,
    TableViewModule,
    FormDatosComunModule,
    DatosSolicitanteSharedModule,
    DatosBeneficiarioSharedModule,
    DatosVisaBeneficiarioModule,
    ObservacionesModule,
    PagoFacturacionComprobantesModule,
    GraficoProcesoVisaModule,
    ThemeSharedModule,
    CoreModule,
    NgbDropdownModule
  ],
  exports: [
    ConsultorComponent
  ]
})
export class ConsultorModule { }
