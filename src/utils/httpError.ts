import axios from 'axios';

/** Mensaje de error de respuestas Axios (igual contrato CDATTG). */
export function axiosErrorMessage(e: unknown, fallback: string): string {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data as { error?: string; detail?: string; message?: string } | string | undefined;
    if (typeof data === 'string' && data.trim()) return data.trim();
    if (data && typeof data === 'object') {
      const msg = data.error ?? data.detail ?? data.message;
      if (typeof msg === 'string' && msg.trim()) return msg.trim();
    }
    if (e.response?.status) return `${fallback} (HTTP ${e.response.status})`;
  }
  if (e instanceof Error && e.message.trim()) return e.message.trim();
  return fallback;
}
