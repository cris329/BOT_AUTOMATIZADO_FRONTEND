/**
 * Cliente Complementarios — mismos métodos/paths que CDATTG apiService.
 *
 * @author Cristian Deysdayr Jiménez
 */

import axios, { type AxiosInstance } from 'axios';
import type {
  ConsultarInscripcionesLoteResponse,
  ConsultarInscripcionesRequest,
  ConsultarInscripcionesResponse,
  CredencialSofiaEstado,
  GuardarCredencialSofiaRequest,
  LoteIniciadoResponse,
  ProgresoLoteResponse,
  ReintentarDocumento,
  ReintentarInscripcionDocumento,
  VerificarAspiranteRequest,
  VerificarAspiranteResponse,
  VerificarLoteResponse,
} from '../types';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: BASE });
    this.api.interceptors.request.use((cfg) => {
      const t = localStorage.getItem('sc_token');
      if (t) cfg.headers.Authorization = `Bearer ${t}`;
      return cfg;
    });
  }

  async entrar(email: string, password: string): Promise<string> {
    const r = await this.api.post<{ access_token: string }>('/sesion/entrar', { email, password });
    return r.data.access_token;
  }

  async yo(): Promise<{ id: number; email: string; nombre: string; rol: string }> {
    return (await this.api.get('/sesion/yo')).data;
  }

  async verificarAspirante(data: VerificarAspiranteRequest): Promise<VerificarAspiranteResponse> {
    const r = await this.api.post<{ data: VerificarAspiranteResponse }>(
      '/complementarios/verificar-aspirante',
      data,
      { timeout: 900000 },
    );
    return r.data.data;
  }

  async getCredencialSofia(): Promise<CredencialSofiaEstado> {
    return (await this.api.get<{ data: CredencialSofiaEstado }>('/complementarios/credenciales')).data.data;
  }

  async guardarCredencialSofia(data: GuardarCredencialSofiaRequest): Promise<CredencialSofiaEstado> {
    return (await this.api.post<{ data: CredencialSofiaEstado }>('/complementarios/credenciales', data)).data.data;
  }

  async eliminarCredencialSofia(): Promise<void> {
    await this.api.delete('/complementarios/credenciales');
  }

  async consultarInscripcionesSofia(data: ConsultarInscripcionesRequest): Promise<ConsultarInscripcionesResponse> {
    const r = await this.api.post<{ data: ConsultarInscripcionesResponse }>(
      '/complementarios/consultar-inscripciones',
      data,
      { timeout: 900000 },
    );
    return r.data.data;
  }

  async descargarPlantillaInscripciones(): Promise<Blob> {
    return (await this.api.get('/complementarios/inscripciones/plantilla', { responseType: 'blob' })).data as Blob;
  }

  async consultarInscripcionesLoteSofia(file: File): Promise<LoteIniciadoResponse> {
    const fd = new FormData();
    fd.append('file', file);
    const r = await this.api.post<{ data: LoteIniciadoResponse }>(
      '/complementarios/inscripciones/consultar-lote',
      fd,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 60000 },
    );
    return r.data.data;
  }

  async progresoInscripcionesLote(loteId: string): Promise<ProgresoLoteResponse> {
    return (
      await this.api.get<{ data: ProgresoLoteResponse }>(
        `/complementarios/inscripciones/consultar-lote/progreso/${loteId}`,
        { timeout: 15000 },
      )
    ).data.data;
  }

  async resultadosInscripcionesLote(loteId: string): Promise<ConsultarInscripcionesLoteResponse> {
    return (
      await this.api.get<{ data: ConsultarInscripcionesLoteResponse }>(
        `/complementarios/inscripciones/consultar-lote/resultados/${loteId}`,
        { timeout: 15000 },
      )
    ).data.data;
  }

  async descargarPlantillaLote(): Promise<Blob> {
    return (await this.api.get('/complementarios/plantilla', { responseType: 'blob' })).data as Blob;
  }

  async verificarLote(file: File): Promise<LoteIniciadoResponse> {
    const fd = new FormData();
    fd.append('file', file);
    const r = await this.api.post<{ data: LoteIniciadoResponse }>('/complementarios/verificar-lote', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return r.data.data;
  }

  async progresoLote(loteId: string): Promise<ProgresoLoteResponse> {
    return (
      await this.api.get<{ data: ProgresoLoteResponse }>(
        `/complementarios/verificar-lote/progreso/${loteId}`,
        { timeout: 15000 },
      )
    ).data.data;
  }

  async resultadosLote(loteId: string): Promise<VerificarLoteResponse> {
    return (
      await this.api.get<{ data: VerificarLoteResponse }>(
        `/complementarios/verificar-lote/resultados/${loteId}`,
        { timeout: 15000 },
      )
    ).data.data;
  }

  async reintentarVerificacionLote(documentos: ReintentarDocumento[]): Promise<LoteIniciadoResponse> {
    return (
      await this.api.post<{ data: LoteIniciadoResponse }>(
        '/complementarios/verificar-lote/reintentar',
        { documentos },
        { timeout: 30000 },
      )
    ).data.data;
  }

  async reintentarInscripcionesLote(documentos: ReintentarInscripcionDocumento[]): Promise<LoteIniciadoResponse> {
    return (
      await this.api.post<{ data: LoteIniciadoResponse }>(
        '/complementarios/inscripciones/consultar-lote/reintentar',
        { documentos },
        { timeout: 30000 },
      )
    ).data.data;
  }

  async verificarAspiranteBetowa(data: VerificarAspiranteRequest): Promise<VerificarAspiranteResponse> {
    const r = await this.api.post<{ data: VerificarAspiranteResponse }>(
      '/complementarios/betowa/verificar-aspirante',
      data,
      { timeout: 180000 },
    );
    return r.data.data;
  }

  async verificarLoteBetowa(file: File): Promise<VerificarLoteResponse> {
    const fd = new FormData();
    fd.append('file', file);
    const r = await this.api.post<{ data: VerificarLoteResponse }>(
      '/complementarios/betowa/verificar-lote',
      fd,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 1800000 },
    );
    return r.data.data;
  }
}

export const apiService = new ApiService();
