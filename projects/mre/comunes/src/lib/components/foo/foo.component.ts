import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mre-foo',
  template: `
    <p>
      foo component works!
    </p>
  `,
  styles: [
  ]
})
export class Fooomponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
