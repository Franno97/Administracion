import { LazyModuleFactory } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { MensajeBoardModule } from '@mre/comunes';
import { ConsultorModule } from '@mre/consultor';
import { FuncionarioModule } from 'projects/mre/funcionario/src/public-api';
import { PeritoModule } from 'projects/mre/perito/src/public-api';
import { SwitchComponent } from './components/switch/switch.component';
import { SwitchFuncionarioPeritoConsultorRountingModule } from './switch-funcionario-perito-consultor-routing.moduel';



@NgModule({
  declarations: [
    SwitchComponent
  ],
  imports: [
    CommonModule,
    SwitchFuncionarioPeritoConsultorRountingModule,
    FuncionarioModule,
    ConsultorModule,
    PeritoModule,
    MensajeBoardModule
  ],
  exports: [
  ]
})
export class SwitchFuncionarioPeritoConsultorModule { 
  static forChild(): ModuleWithProviders<SwitchFuncionarioPeritoConsultorModule> {
    return {
      ngModule: SwitchFuncionarioPeritoConsultorModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<SwitchFuncionarioPeritoConsultorModule> {
    return new LazyModuleFactory(SwitchFuncionarioPeritoConsultorModule.forChild());
  }
}
