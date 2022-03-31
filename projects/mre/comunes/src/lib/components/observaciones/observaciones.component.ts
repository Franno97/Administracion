import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss']
})
export class ObservacionesComponent implements OnInit {
  @Input() requisitos:boolean = true;
  @Input() observacionesName:string = '';
  @Input() observacionesAnteriores:string = '';
  @Input() observacionesModel:string = '';
  @Output() observChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  observacionesChange(data:string){
    this.observChange.emit(data);
  }

}
