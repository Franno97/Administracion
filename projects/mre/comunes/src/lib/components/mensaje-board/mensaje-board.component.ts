import { Component, Input, OnInit } from '@angular/core';

export interface DataMensaje{
  mensaje:string;
  classMensaje:string;
}
@Component({
  selector: 'lib-mensaje-board',
  templateUrl: './mensaje-board.component.html',
  styleUrls: ['./mensaje-board.component.css']
})
export class MensajeBoardComponent implements OnInit{
  @Input() mensajesArr:Array<any>;

  constructor() { 
  }

  ngOnInit(): void {
    
  }
}
