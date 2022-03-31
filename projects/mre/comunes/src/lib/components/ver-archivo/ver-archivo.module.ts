import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerArchivoComponent } from './ver-archivo.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    VerArchivoComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  exports:[VerArchivoComponent]
})
export class VerArchivoModule { }
