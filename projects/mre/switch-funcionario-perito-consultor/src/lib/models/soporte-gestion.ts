export interface SoporteGestion {
    created: string;
    creatorId: string;
    id: string;
    isDeleted: boolean;
    lastModified: string;
    lastModifierId: string;
    descripcion: string;
    nombre: string;
    ruta: string;
    fichero?: File;
    consecutivo?: number;
    permiteEditarObservacion?: boolean;
    permiteEliminar?: boolean;
    permiteVer?: boolean;
}
