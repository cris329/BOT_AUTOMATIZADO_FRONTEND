/** Tipos Complementarios FPI — iguales a CDATTG. */

export type VerificacionEstado = 'REGISTRADO' | 'NO_REGISTRADO' | 'NO_VERIFICADO';

export interface VerificarAspiranteRequest {
  numero_documento: string;
  tipo_documento?: string;
}

export interface ReintentarDocumento {
  numero_documento: string;
  tipo_documento?: string;
}

export interface VerificarAspiranteResponse {
  numero_documento: string;
  estado: VerificacionEstado;
  tipo_encontrado?: string;
  nombre?: string;
  nombres?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  detalle?: string;
  mensaje?: string;
}

export interface VerificarLoteResponse {
  total: number;
  registrados: number;
  no_registrados: number;
  no_verificados: number;
  resultados: VerificarAspiranteResponse[];
}

export interface LoteIniciadoResponse {
  lote_id: string;
  total: number;
}

export interface ProgresoLoteResponse {
  lote_id: string;
  fase?: string;
  total: number;
  procesados: number;
  actual_doc?: string;
  estado_actual?: string;
  terminado: boolean;
  error?: string;
}

export interface GuardarCredencialSofiaRequest {
  tipo_documento: string;
  usuario: string;
  password: string;
  rol?: string;
}

export interface CredencialSofiaEstado {
  tiene: boolean;
  tipo_documento?: string;
  usuario?: string;
  rol?: string;
  actualizada_en?: string;
}

export interface ConsultarInscripcionesRequest {
  numero_documento: string;
  programa: string;
  tipo_documento?: string;
}

export interface RegistroInscripcionFicha {
  ficha: string;
  programa: string;
  estado: string;
}

export interface ConsultarInscripcionesResponse {
  numero_documento: string;
  programa_consultado: string;
  estado: string;
  tipo_encontrado?: string;
  registros: RegistroInscripcionFicha[];
  mensaje?: string;
}

export interface ConsultarInscripcionesLoteResponse {
  total: number;
  encontrados: number;
  no_encontrados: number;
  no_verificados: number;
  resultados: ConsultarInscripcionesResponse[];
}

export interface ReintentarInscripcionDocumento {
  numero_documento: string;
  programa: string;
  tipo_documento?: string;
}
