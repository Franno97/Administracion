import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { ReconocimientoFacialFacetecDto } from '../../modelos/reconocimiento-facial-facetec';
import { AngularSampleApp } from '../../utiles/angular-sample-controller';

@Component({
  selector: 'lib-reconocimiento-facial-facetec',
  templateUrl: './reconocimiento-facial-facetec.component.html',
  styleUrls: ['./reconocimiento-facial-facetec.component.css']
})
export class ReconocimientoFacialFacetecComponent implements AfterViewInit {

  mostrarPantallaInicial = true;
  mostrarPantallaPrincipal = false;
  mostrarPantallaFinalExito = false;
  mostrarPantallaFinalError = false;
  procesoCompararExitoso: boolean;
  subscription: Subscription;

  @Input() datos: ReconocimientoFacialFacetecDto;
  @Output() resultadoProcesoComparar = new EventEmitter<boolean>();

  constructor() { }

  ngAfterViewInit(): void {

  }

  continuarPantallaIPrincipal(): void {
    this.mostrarPantallaInicial = false;
    this.mostrarPantallaPrincipal = true;
    timer(2000).subscribe(x => {
      AngularSampleApp.initializeFacetec();
    });
  }

  regresarPantallaInicial(): void {
    this.mostrarPantallaPrincipal = false;
    this.mostrarPantallaInicial = true;
  }

  compararFoto() {
    const source = interval(3000);
    let procesoFinalizado = false;
    this.subscription = source.subscribe(val => {
      procesoFinalizado = AngularSampleApp.getFinishProcessing();
      console.log('the value for procesoFinalizado is ', procesoFinalizado);
      if (procesoFinalizado === true) {
        this.eventoProcesoFinalizado();
        return;
      }
    }
    );
    AngularSampleApp.onComparePict(this.datos);

  }

  eventoProcesoFinalizado(): void {
    this.subscription.unsubscribe();
    this.procesoCompararExitoso = AngularSampleApp.getResultComparePhoto();
    this.mostrarPantallaPrincipal = false;

    this.mostrarPantallaFinalExito = this.procesoCompararExitoso;
    this.mostrarPantallaFinalError = !this.procesoCompararExitoso;

    this.resultadoProcesoComparar.emit(this.procesoCompararExitoso);
  }

}
