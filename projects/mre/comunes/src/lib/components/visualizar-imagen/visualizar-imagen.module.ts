import { CoreModule } from "@abp/ng.core";
import { ThemeSharedModule } from "@abp/ng.theme.shared";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { FormTemplateModule } from "../form-template/form-template.module";
import { VisualizarImagenComponent } from "./visualizar-imagen.component";

@NgModule({
    declarations: [
        VisualizarImagenComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ThemeSharedModule,
        CoreModule,
        FormTemplateModule,
        NgxExtendedPdfViewerModule
    ],
    exports: [VisualizarImagenComponent]
})
export class VisualizarImagenModule { }