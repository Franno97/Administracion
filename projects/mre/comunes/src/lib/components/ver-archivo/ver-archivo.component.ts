import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-ver-archivo',
  templateUrl: './ver-archivo.component.html',
  styleUrls: ['./ver-archivo.component.scss']
})
export class VerArchivoComponent implements OnInit, OnChanges {
  @Input() tipoArchivo: string = "imagen";//imagen o pdf;
  @Input() pathArchivo: any = '';
  // src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  src = 'http://172.31.3.27/soportegestion/259814195/appealconfimation.do.pdf';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
