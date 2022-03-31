import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LinksComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports:[LinksComponent]
})
export class LinksModule { }
