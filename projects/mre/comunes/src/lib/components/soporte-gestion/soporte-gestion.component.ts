import { ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SoporteGestion } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/soporte-gestion';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { VisualizarImagenDato } from '../../modelos/visualizar-imagen-dato';
import { EnviarDatosModalService } from '../../services/enviar-datos-modal/enviar-datos-modal.service';
import { VisualizarImagenComponent } from '../visualizar-imagen/visualizar-imagen.component';

@Component({
  selector: 'lib-soporte-gestion',
  templateUrl: './soporte-gestion.component.html',
  styleUrls: ['./soporte-gestion.component.scss']
})
export class SoporteGestionComponent implements OnInit {
  @Input() tabDataSource: Array<any> = [];
  @Output() rowClicked = new EventEmitter();
  @Output() cambioListaSoporteGestion = new EventEmitter<SoporteGestion[]>();

  registrosMostrar: any[] = [];
  archivos: SoporteGestion[];

  // {name:'Eliminar',icon:['fas fa-trash-alt'],class:'text-danger',valShow:"icon"}
  /* tabHeader: Array<any> = [
    {
      name: 'Nombre',
      propiedad: 'nombre'
    }, {
      name: 'Descripción',
      propiedad: 'descripcion',
      valShow: "textarea"
    }, {
      name: 'Ver',
      icon: ['fas fa-eye'],
      valShow: "icon"
    }]; */

  tabDataSourceArrTemp: Array<any> = [];
  tipoArchivo: string = "imagen";
  pathArchivo: any = '';
  idUser: string = '';
  uploadResponse = { status: '', message: '', filePath: '' };
  error: any;
  tramite: TramitesObj;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private servicioConfirmacion: ConfirmationService,
    private ventanaModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.tramite = this.enviarDatosModalService.getData().data;
    this.tabDataSourceArrTemp = this.tramite.soporteGestiones;
    const currentUser = this.configStateService.getOne('currentUser');
    this.idUser = currentUser.id;

    this.cargarDatos();
  }

  // Inicializa y carga los datos
  cargarDatos(): void {
    this.archivos = [];
    let consecutivo = 1;
    this.tabDataSource.forEach(x => {
      const registro: SoporteGestion = {
        created: '',
        creatorId: '',
        id: '',
        isDeleted: false,
        lastModified: '',
        lastModifierId: '',
        descripcion: x.descripcion,
        nombre: x.nombre,
        ruta: '',
        consecutivo: consecutivo,
        permiteEditarObservacion: false,
        permiteVer: false
      };
      consecutivo++;
      this.archivos.push(registro);
    });
  }

  // Publica la lista de archivos
  publicarLista(): void {
    this.registrosMostrar = [];
    this.archivos.forEach(x => {
      const registro = {
        nombre: x.nombre,
        descripcion: x.descripcion,
        permiteVer: x.permiteVer === true,
        permiteEditarObservacion: x.permiteEditarObservacion === true,
        permiteEliminar: x.permiteEliminar === true,
        consecutivo: x.consecutivo
      };
      this.registrosMostrar.push(registro);
    });
    this.cambioListaSoporteGestion.emit(this.archivos);
  }

  // Cuando existe cambio de la observación
  cambioObservaciones(texto: string, consecutivo: number): void {
    this.archivos.forEach(x => {
      if (x.consecutivo === consecutivo) {
        x.descripcion = texto;
      }
    });
    this.cambioListaSoporteGestion.emit(this.archivos);
  }

  // Visualizar la imagen
  verImagen(consecutivo: number): void {
    const archivo = this.archivos.find(x => x.consecutivo === consecutivo);
    const tipoArchivo = this.obtenerTipoArchivo(archivo.fichero);

    this.readBase64(archivo.fichero)
      .then((archivoBase64) => {
        archivoBase64 = archivoBase64.replace('data:application/pdf;base64,', '');
        const dato: VisualizarImagenDato = {
          tipo: tipoArchivo,
          imagenBase64: archivoBase64,
          visualizarUrl: false,
          url: ''
        };
        this.enviarDatosModalService.setData(dato);
        this.ventanaModal.open(VisualizarImagenComponent);
      });
  }

  // Elimina una imagen
  eliminarImagen(consecutivo: number): void {
    const archivo = this.archivos.find(x => x.consecutivo === consecutivo);
    const texto = '¿Estás seguro de eliminar el archivo ' + archivo.nombre + '?'
    this.servicioConfirmacion.warn(texto, '¿Estás seguro?').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.archivos.forEach((value, index) => {
          if (value == archivo) {
            this.archivos.splice(index, 1)
            this.publicarLista();
          };
        });
      }
    });
  }

  onDropFile(data: any) {
    data.preventDefault();
    this.uploadFile(data);
  }

  onDragOverFile(data: DragEvent) {
    data.stopPropagation();
    data.preventDefault();
  }

  selectFile(data: any) {
    this.uploadFile(data);
  }

  uploadFile(event: any) {
    const file = event.target.files[0];

    const optionsError: Partial<Confirmation.Options> = {
      hideCancelBtn: false,
      hideYesBtn: true,
      cancelText: 'Cerrar',
      yesText: 'Confirm',
      messageLocalizationParams: ['Demo'],
      titleLocalizationParams: [],
    };

    if (file.size >= 5242880) {
      this.servicioConfirmacion.error('El archivo debe ser menor de 5 Mb', 'Error', optionsError)

      return;
    }

    if (file.type !== 'image/jpeg' && file.type !== 'application/pdf' && file.type !== 'image/png') {
      this.servicioConfirmacion.error('Solamente se permiten imágenes y pdf', 'Error', optionsError)

      return;
    }

    const dataObj = {
      myfile: file,
      codigoMDG: this.tramite.beneficiario.codigoMDG
    }

    const cantidad = this.archivos.length;

    const archivo: SoporteGestion = {
      created: '',
      creatorId: '',
      id: '',
      isDeleted: false,
      lastModified: '',
      lastModifierId: '',
      descripcion: '',
      nombre: file.name,
      ruta: '',
      fichero: file,
      consecutivo: cantidad + 1,
      permiteEditarObservacion: true,
      permiteEliminar: true,
      permiteVer: true
    }

    this.archivos.push(archivo);

    this.publicarLista();
  }

  // Obtiene el tipo de archivo
  obtenerTipoArchivo(fichero: File): string {
    let tipoArchivo: string;
    switch (fichero.type) {
      case 'image/jpeg':
        tipoArchivo = 'imagen';
        break;
      case 'image/png':
        tipoArchivo = 'imagen';
        break;
      case 'application/pdf':
        tipoArchivo = 'pdf';
        break;
      default: {
      }
    }
    return tipoArchivo;
  }


  private readBase64(file): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }

}
