export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * Define aquí los tipos de tus tablas PostgreSQL.
 *
 * Ejemplo:
 *
 * export interface Therapy {
 *   id: number;
 *   name: string;
 *   description: string | null;
 *   created_at: string;
 *   updated_at: string;
 * }
 *
 * export interface Appointment {
 *   id: number;
 *   patient_name: string;
 *   email: string;
 *   therapy_id: number;
 *   date: string;
 *   status: AppointmentStatus;
 *   created_at: string;
 * }
 *
 * export type AppointmentStatus = "pending" | "confirmed" | "cancelled";
 */

export interface HealthCheck {
  status: string;
  time: string;
}
