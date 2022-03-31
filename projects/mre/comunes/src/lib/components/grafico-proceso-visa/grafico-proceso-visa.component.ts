import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-grafico-proceso-visa',
  templateUrl: './grafico-proceso-visa.component.html',
  styleUrls: ['./grafico-proceso-visa.component.scss']
})
export class GraficoProcesoVisaComponent implements OnInit {
  tabHeader:Array<number> = [1,2,3,4,5,6,7,8,9,10];
  dataSource:Array<any> = [
    [0,0,1,0,0,0,1,1,1,0],
    [1,0,1,0,1,0,1,0,0,1],
    [0,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,0],
    [0,0,1,0,0,0,0,0,0,0],

  ];
  matrixAmpliada:Array<any> =[
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,1,1,0,0],
    [0,1,0,1,0,1,0,1,0,0,1,0],
    [0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
  ]

  constructor() { }
  matrix(i:number,j:number):string{
    return "derA";
  }
  ngOnInit(): void {
  }

}
