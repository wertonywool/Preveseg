export interface DefaultProduct {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string[];
  precio_normal: number;
  precio_oferta: number;
  imagenes: string[];
  youtube_url: string;
  en_oferta: boolean;
  es_kit?: boolean;
  destacado?: boolean;
  visible?: boolean;
  variantes?: Array<{
    tipo: string;
    valor: string;
    imagenUrl?: string;
    precio_oferta?: string;
    precio_normal?: string;
    color?: string;
  }>;
  lo_que_incluye?: string[];
  caracteristicas?: string[];
}

export const PREVESEG_COMPANY_INFO = {
  name: 'PREVESEG',
  tagline: 'Prevención y Seguridad Industrial',
  description: 'Somos una empresa dedicada a la venta y mantenimiento de equipos contra incendio y seguridad industrial.',
  phone: '3046296285',
  phoneDisplay: '+57 304 629 6285',
  address: 'Cra 28D 72f-79',
  city: 'Cali',
  email: 'prevesegcali@gmail.com',
  hours: 'Lunes a Viernes de 8:00 am a 6:00 pm | Sábados de 8:00 am a 4:00 pm',
  services: [
    {
      id: 'mantenimiento-extintores',
      titulo: 'Mantenimiento y Recarga de Extintores',
      descripcion: 'Recarga, presurización y pruebas hidrostáticas para extintores ABC, Solkaflam, CO2 y Agua con tarjeta de inspección reglamentaria.'
    },
    {
      id: 'inspeccion-tecnica',
      titulo: 'Inspección y Diagnóstico Técnico',
      descripcion: 'Revisión en sitio del estado operativo de equipos de emergencia, mangueras, gabinetes y sistemas contra incendio.'
    },
    {
      id: 'codificacion-equipos',
      titulo: 'Codificación y Fichas Técnicas',
      descripcion: 'Registro, marcación y codificación de extintores y equipos para control de vencimiento e inventario SG-SST.'
    },
    {
      id: 'instalacion-senalizacion',
      titulo: 'Instalación y Señalización Reglamentaria',
      descripcion: 'Fijación de soportes, instalación de gabinetes y señalización fotoluminiscente según normatividad NTC 1461.'
    },
    {
      id: 'reubicacion-equipos',
      titulo: 'Reubicación y Adecuación de Equipos',
      descripcion: 'Ajuste de puntos de emergencia y reubicación estratégica de extintores y camillas en plantas y locales comerciales.'
    },
    {
      id: 'capacitacion-brigadas',
      titulo: 'Capacitación en Uso y Manejo de Extintores',
      descripcion: 'Talleres prácticos y teóricos para brigadas de emergencia empresariales en control de conatos de incendio y evacuación.'
    }
  ]
};

export const INITIAL_CATEGORIES = [
  { id: 1, nombre: 'Extintores y Equipos Contra Incendio', slug: 'extintores', visible: true, imagen_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
  { id: 2, nombre: 'Camillas y Botiquines', slug: 'camillas-botiquines', visible: true, imagen_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80' },
  { id: 3, nombre: 'Kits de Carretera y Vehiculares', slug: 'kits-carretera', visible: true, imagen_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80' },
  { id: 4, nombre: 'Conos y Seguridad Vial', slug: 'seguridad-vial', visible: true, imagen_url: 'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=600&auto=format&fit=crop&q=80' },
  { id: 5, nombre: 'Señalización Industrial', slug: 'senalizacion', visible: true, imagen_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80' },
  { id: 6, nombre: 'EPP (Protección Personal)', slug: 'epp-proteccion-personal', visible: true, imagen_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' },
  { id: 7, nombre: 'Kits & Combos de Seguridad', slug: 'kits-combos-seguridad', visible: true, imagen_url: 'https://images.unsplash.com/photo-1586942593568-29361efcd571?w=600&auto=format&fit=crop&q=80' }
];

export const INITIAL_PRODUCTS: DefaultProduct[] = [];
