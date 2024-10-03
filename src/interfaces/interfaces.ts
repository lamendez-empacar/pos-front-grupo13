// -------- SEGURIDAD --------
export interface Empresa {
  empresa_id: number;
  nombre: string;
  habilitado: number;
  created_at?: number;
  updated_at?: number;
}

export interface Persona {
  apellido_materno: string;
  apellido_paterno: string;
  cargo?: string;
  ci_extension?: string;
  ci_origen?: string;
  ci?: string;
  correo?: string;
  ciudad: string;
  codigo: number;
  created_at?: number;
  empresa_id?: number;
  fecha_nacimiento?: string;
  foto?: string;
  habilitado: number;
  nombre_completo: string;
  nombre?: string;
  persona_id: number;
  telefono?: string;
  ubicacion?: string;
  updated_at?: number;
  unidad_negocio_id: number;
  user: any;
}

export interface Rol {
  rol_id: number;
  aplicacion_id: number;
  nombre: string;
  habilitado: number;
  created_at?: number;
  updated_at?: number;
  aplicacion: Aplicacion;
  modulos: Modulo[];
  users: any[];
}

export interface UnidadNegocio {
  empresa_id: number;
  nombre: string;
  unidad_negocio_id: number;
  empresa: Empresa;
  habilitado: number;
  division: Division;
  check: boolean;
}

export interface CentroCosto {
  centro_costo_id: number;
  nombre: string;
  unidad_negocio_id: number;
}

export interface Division {
  division_id: number;
  nombre: string;
  unidades_negocio: UnidadNegocio[];
}

export interface User {
  id: number;
  created_at: number;
  email: string;
  habilitado: number;
  name: string;
  persona_id: number;
  updated_at: number;
  persona: Persona;
  roles: Rol[];
}

export interface Operacion {
  operacion_id: number;
  nombre: string;
  created_at?: number;
  updated_at?: number;
}

export interface Bitacora {
  bitacora_id: number;
  codigo_app: string;
  fecha: Date;
  nombre_completo: string;
  operacion: string;
  tabla_identificador: number;
  tabla: string;
}

export interface Aplicacion {
  aplicacion_id: number;
  area?: string;
  base_datos?: string;
  codigo_nombre: string;
  codigo: string;
  created_at?: number;
  descripcion: string;
  habilitado: number;
  icono: string;
  ip_servidor?: string;
  modulos: Modulo[];
  nombre: string;
  roles: Rol[];
  titulo: string;
  updated_at?: number;
  url: string;
  version: string;
}

export interface Modulo {
  aplicacion_id: number;
  aplicacion_nombre: string;
  aplicacion: Aplicacion;
  check: boolean;
  created_at?: number;
  habilitado: number;
  icono: string;
  menu: number;
  modulo_id: number;
  modulo_padre?: number | null;
  nombre: string;
  SubModulos: Modulo[];
  titulo: string;
  updated_at?: number;
  url: string;
}

export interface RolAcceso {
  acceso_id: number;
  rol_id: number;
  modulo_id: number;
  nombre: string;
  titulo: string;
  url: string;
}

export interface Componente {
  componente_id: number;
  habilitado: number;
  nombre: string;
}

export interface RolAsignacion {
  aplicacion_id: number;
  codigo_app: string;
  componente_id: number;
  editable: number;
  habilitado: number;
  nombre: string;
  rol_asignacion_id: number;
  rol_id: number;
  rol: string;
  visible: number;
}

export interface AuhtUser {
  persona: Persona;
  aplicacion: Aplicacion;
}

export interface MenuItem {
  IdRol: number;
  NombreRol: string;
  IdModulo: number;
  IdModuloPadre?: number;
  TituloModulo: string;
  NombreModulo: string;
  RutaModulo: string;
  Menu: number;
}

export interface BackendResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface Cargo {
  cargo_id: number;
  cargo_nombre: string;
  cargo_superior_nombre?: string;
  created_at: string;
  empresa_id: number;
  empresa_nombre: string;
  superior_id?: number;
  unidad_negocio_id: number;
  unidad_negocio_nombre: string;
  updated_at: string;
}

export interface UsuarioRol {
  usuario_rol_id: number;
  user_id: number;
  rol_id: number;
  usuario?: any;
  rol?: any;
}

// -------- SISTEMA ACTUAL --------
export interface PersonaBase {
  apellido_materno: string;
  apellido_paterno: string;
  cargo?: string;
  ci_extension?: string;
  ci_origen?: string;
  ci?: string;
  correo?: string;
  ciudad: string;
  codigo: number;
  created_at?: number;
  empresa_id?: number;
  fecha_nacimiento?: string;
  foto?: string;
  habilitado: number;
  nombre_completo: string;
  nombre?: string;
  persona_id: number;
  telefono?: string;
  ubicacion?: string;
  updated_at?: number;
  unidad_negocio_id: number;
  user: any;
}

export interface TipoMeta {
  tipo_meta_id: number;
  tipo_meta_nombre: string;
  area_id: number;
  area_nombre: string;
}

export interface Meta {
  division_id?: number;
  division_nombre?: string;
  meta_id: number;
  meta_peso: number;
  tipo_meta_id: number;
  tipo_meta_nombre: string;
}

export interface Indicador {
  id: number;
  meta_id: number;
  indicador_descripcion: string;
  indicador_excedente: string;
  indicador_valor_objetivo?: number;
  indicador_valor_alcanzado?: number;
  indicador_valor_excedente?: number;
  porcentaje_alcanzado: number;
  calificacion_id?: number;
  calificacion_descripcion?: string;
  tipo_indicador_nombre?: string;
  tipo_indicador_id?: number;
}

export interface Evaluacion {
  bono_id?: number;
  cargo_superior_id: number;
  colaborador_id: number;
  colaborador_nombre?: string;
  estado_evaluacion_descripcion?: string;
  estado_evaluacion_id?: number;
  evaluacion_created_at: string;
  evaluacion_gestion: number;
  evaluacion_id: number;
  evaluacion_updated_at: string;
  evaluador_id: number;
  evaluador_nombre?: string;
  resultado_final?: number;
  tipo_evaluciones_id?: number;
  user_id?: number;
  user_name?: string;
}

export interface SystemUser {
  area_id: number;
  user_id: number;
  user_name: string;
  email: string;
  cargo_id: number;
  cargo_nombre: string;
  cargo_superior_id: number;
  cargo_superior_nombre: string;
}

export interface EvaluacionHeader {
  bono_id?: number;
  colaborador_id: number;
  colaborador_nombre?: string;
  estado_evaluacion_descripcion?: string;
  estado_evaluacion_id?: number;
  evaluacion_gestion: number;
  evaluacion_id: number;
  evaluador_id: number;
  evaluador_nombre?: string;
  resultado_final?: number;
  tipo_evaluciones_id?: number;
  tipo_meta_id?: number;
  user_id?: number;
}

export interface DetalleMetaForm {
  calificacion_descripcion?: string;
  calificacion_id?: number;
  indicador_comentarios?: string;
  indicador_descripcion: string;
  indicador_excedente: string;
  indicador_id: number;
  indicador_valor_alcanzado?: number;
  indicador_valor_excedente?: number;
  indicador_valor_objetivo?: number;
  meta_descripcion: string;
  meta_id: number;
  meta_peso?: number;
  indicador_porcentaje_alcanzado?: number;
  indicador_puntos_logrados?: number;
  indicador_resultado_final?: number;
  puntos_logrados?: number;
  tipo_indicador_id?: number;
  tipo_meta_nombre?: string;
}

export interface EvaluacionMetaForm {
  calificacion_descripcion?: string;
  calificacion_id?: number;
  indicador_comentarios?: string;
  indicador_descripcion: string;
  indicador_id: number;
  indicador_valor_alcanzado?: number;
  indicador_valor_excedente?: number;
  indicador_valor_objetivo?: number;
  indicador_porcentaje_alcanzado?: number;
  indicador_puntos_logrados?: number;
  indicador_resultado_final?: number;
  tipo_indicador_id?: number;
}

export interface EvalForm {
  header: EvaluacionHeader;
  detalle: DetalleMetaForm;
  eval: EvaluacionMetaForm;
}

export interface Calificacion {
  id: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
  rango_inicial: number;
  rango_final: number;
}

export interface Area {
  id: number;
  nombre: string;
  created_at?: any;
  updated_at?: any;
}

export interface TipoIndicador {
  tipo_indicador_id: number;
  tipo_indicador_nombre: string;
  tipo_indicador_excede: string;
  unidad_medida_id?: number;
  unidad_medida_descripcion: number;
  unidad_medida_simbolo?: string;
  tipo_indicador_ahorro?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EstadoEvaluacion {
  id: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface PersonaV2 {
  persona_id: number;
  nombre_completo: string;
  unidad_negocio_id: number;
  unidad_negocio_nombre: string;
  division_id: number;
  division_nombre: string;
  empresa_id: number;
  cargo_id: number;
  cargo_nombre: string;
  cargo_superior_id: number;
  cargo_superior_nombre: string;
}

export interface UnidadMedida {
  id: number;
  descripcion: string;
  simbolo: string;
}

export interface ResumenMetas {
  id: number;
  peso: number;
  nombre: string;
  puntos_logrados: number;
}
