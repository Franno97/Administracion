import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsViewComponent } from './tabs-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TabsViewComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[TabsViewComponent]
})
export class TabsViewModule { }
