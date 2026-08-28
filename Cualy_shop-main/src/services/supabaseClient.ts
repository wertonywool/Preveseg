import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Faltan las variables de entorno de Supabase. Revisa tu archivo .env o la configuración de Render.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
