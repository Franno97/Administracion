import { NgModule } from '@angular/core';
import { ConsultorModule } from 'projects/mre/consultor/src/public-api';
import { FuncionarioModule } from 'projects/mre/funcionario/src/public-api';
import { PeritoModule } from 'projects/mre/perito/src/public-api';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule,ConsultorModule,FuncionarioModule,PeritoModule],
})
export class HomeModule {}
