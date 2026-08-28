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

export const INITIAL_CATEGORIES = [
  { id: 1, nombre: 'Protección Craneal y Facial', slug: 'proteccion-craneal-facial', visible: true, imagen_url: 'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=600&auto=format&fit=crop&q=80' },
  { id: 2, nombre: 'Protección Respiratoria', slug: 'proteccion-respiratoria', visible: true, imagen_url: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&auto=format&fit=crop&q=80' },
  { id: 3, nombre: 'Calzado Industrial', slug: 'calzado-industrial', visible: true, imagen_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
  { id: 4, nombre: 'Extintores y Fuego', slug: 'extintores-fuego', visible: true, imagen_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
  { id: 5, nombre: 'Trabajo en Alturas', slug: 'trabajo-en-alturas', visible: true, imagen_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80' },
  { id: 6, nombre: 'Protección Manual', slug: 'proteccion-manual', visible: true, imagen_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' },
  { id: 7, nombre: 'Dotaciones y Chalecos', slug: 'dotaciones-chalecos', visible: true, imagen_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80' }
];

export const INITIAL_PRODUCTS: DefaultProduct[] = [
  {
    id: 'casco-dielectrico-tipo1',
    nombre: 'Casco de Seguridad Dieléctrico Tipo 1 con Tafilete 4 Puntos',
    descripcion: 'Casco de protección industrial de alto impacto, certificado bajo norma ANSI Z89.1 Clase E & G. Fabricado en polímero de alta densidad con suspensión textil ajustable de 4 puntos.',
    categoria: ['Protección Craneal y Facial'],
    precio_normal: 45000,
    precio_oferta: 34900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Color', valor: 'Amarillo Industrial', color: '#facc15' },
      { tipo: 'Color', valor: 'Blanco Ingeniero', color: '#ffffff' },
      { tipo: 'Color', valor: 'Azul Operativo', color: '#0066ff' },
      { tipo: 'Color', valor: 'Rojo Emergencia', color: '#ee1b24' }
    ],
    lo_que_incluye: ['Casco dieléctrico de polietileno', 'Tafilete con suspensión de 4 puntos', 'Barbiquejo elástico de seguridad'],
    caracteristicas: ['Certificación ANSI/ISEA Z89.1-2014', 'Resistencia dieléctrica hasta 20,000V', 'Ranuras universales para protector auditivo y facial', 'Banda antisudor frontal lavable']
  },
  {
    id: 'extintor-multiproposito-10lbs',
    nombre: 'Extintor Polvo Químico Seco ABC 10 Lbs Recargable',
    descripcion: 'Extintor multipropósito de alta eficiencia para fuegos Clase A (madera, papel), Clase B (líquidos inflamables, gasolina) y Clase C (equipos eléctricos energizados). Cilindro de acero de alta resistencia.',
    categoria: ['Extintores y Fuego'],
    precio_normal: 120000,
    precio_oferta: 89900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Capacidad', valor: '10 Libras' },
      { tipo: 'Capacidad', valor: '20 Libras', precio_oferta: '145000', precio_normal: '180000' }
    ],
    lo_que_incluye: ['Cilindro cargado con PQS al 75%', 'Manguera flexible de descarga', 'Soporte metálico para fijación en pared', 'Pasador y precinto de seguridad'],
    caracteristicas: ['Certificado NFPA 10', 'Manómetro indicador de presión integrado', 'Válvula de bronce forjado de apertura rápida', 'Pintura electrostática anticorrosiva']
  },
  {
    id: 'bota-seguridad-puntera-acero',
    nombre: 'Bota de Seguridad Industrial Dieléctrica con Puntera Composite',
    descripcion: 'Calzado ergonómico para trabajo pesado, confeccionado en cuero vacuno hidrofugado. Puntera no metálica en composite resistente a impacto de 200 Joules y suela antideslizante de poliuretano bidensidad.',
    categoria: ['Calzado Industrial'],
    precio_normal: 195000,
    precio_oferta: 149900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla', valor: '38' },
      { tipo: 'Talla', valor: '39' },
      { tipo: 'Talla', valor: '40' },
      { tipo: 'Talla', valor: '41' },
      { tipo: 'Talla', valor: '42' },
      { tipo: 'Talla', valor: '43' }
    ],
    lo_que_incluye: ['Par de botas de seguridad industrial', 'Plantilla anatómica antimicótica', 'Cordones reforzados en poliamida'],
    caracteristicas: ['Norma ASTM F2413-18 Dieléctrica (18kV)', 'Puntera de Composite liviana y atérmica', 'Suela resistente a hidrocarburos y aceites', 'Forro interno transpirable y acolchado']
  },
  {
    id: 'respirador-media-cara-doble-filtro',
    nombre: 'Respirador Reutilizable Media Cara Siliconada con Filtros Vapores',
    descripcion: 'Pieza facial ergonómica en silicona hipoalergénica de ajuste hermético. Incluye 2 cartuchos para vapores orgánicos y gases ácidos con prefiltros de partículas.',
    categoria: ['Protección Respiratoria'],
    precio_normal: 135000,
    precio_oferta: 105000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla', valor: 'Mediana (M)' },
      { tipo: 'Talla', valor: 'Grande (L)' }
    ],
    lo_que_incluye: ['Cuerpo facial siliconado', '2 Cartuchos de carbón activado para vapores', '2 Retenedores y 2 prefiltros para polvos'],
    caracteristicas: ['Aprobación NIOSH', 'Válvula de exhalación Cool Flow para menor calor interno', 'Arnés de 4 puntos con soporte en nuca', 'Compatible con protección ocular y auditiva']
  },
  {
    id: 'arnes-alturas-4-argollas',
    nombre: 'Arnés de Seguridad Multipropósito de 4 Argollas en X',
    descripcion: 'Arnés integral para detención de caídas, posicionamiento y rescate. Reata en poliéster de 45mm con tratamiento hidrófugo y herrajes en acero forjado con resistencia de 5,000 lbs.',
    categoria: ['Trabajo en Alturas'],
    precio_normal: 240000,
    precio_oferta: 185000,
    en_oferta: false,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla', valor: 'Universal Ajustable (S - XL)' }
    ],
    lo_que_incluye: ['Arnés de 4 argollas', 'Ficha técnica y manual de inspección periódica', 'Bolsa de transporte y almacenamiento'],
    caracteristicas: ['Certificado ANSI Z359.11 y OSHA 1926.502', 'Argolla dorsal anticaídas + 2 laterales + 1 esternal', 'Indicador de impacto en reata', 'Hebillas de ajuste rápido tipo pass-through']
  },
  {
    id: 'chaleco-reflectivo-industrial',
    nombre: 'Chaleco de Seguridad Reflectivo Tipo Ingeniero con Cintas 3M',
    descripcion: 'Chaleco de alta visibilidad diurna y nocturna confeccionado en tela drill con bandas reflectivas microprismáticas 3M Scotchlite de 2 pulgadas. Múltiples bolsillos porta-planos y radio.',
    categoria: ['Dotaciones y Chalecos'],
    precio_normal: 58000,
    precio_oferta: 42900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Color', valor: 'Naranja Alta Visibilidad', color: '#ff6600' },
      { tipo: 'Color', valor: 'Amarillo Flúor', color: '#ccff00' },
      { tipo: 'Color', valor: 'Azul Rey Preveseg', color: '#0066ff' }
    ],
    lo_que_incluye: ['Chaleco de seguridad tipo ingeniero con cremallera'],
    caracteristicas: ['Norma EN ISO 20471 Clase 2', 'Bolsillo superior para identificación y bolígrafos', 'Cremallera de cierre frontal reforzada', 'Costuras dobles de alta tenacidad']
  },
  {
    id: 'guantes-vaqueta-reforzados',
    nombre: 'Guantes de Vaqueta Tipo Ingeniero con Refuerzo en Palma',
    descripcion: 'Guante de protección manual fabricado en cuero vacuno flor de primera calidad, suave al tacto y de alta resistencia a la abrasión, desgarro y perforación.',
    categoria: ['Protección Manual'],
    precio_normal: 32000,
    precio_oferta: 23900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla', valor: 'Talla 9 (L)' },
      { tipo: 'Talla', valor: 'Talla 10 (XL)' }
    ],
    lo_que_incluye: ['Par de guantes de vaqueta natural'],
    caracteristicas: ['Norma EN 388 (Resistencia mecánica)', 'Elástico de ajuste dorsal para mayor firmeza', 'Refuerzo de doble cuero en palma y nudillos', 'Costuras en hilo de Kevlar ignífugo']
  },
  {
    id: 'gafas-seguridad-antiempanante',
    nombre: 'Gafas de Seguridad Panorámicas Antiempañante Filtro UV 99.9%',
    descripcion: 'Lente monolítico en policarbonato de alta resistencia balística con recubrimiento anti-rayaduras y anti-empañamiento. Patillas ajustables en ángulo y longitud.',
    categoria: ['Protección Craneal y Facial'],
    precio_normal: 28000,
    precio_oferta: 18900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=600&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Lente', valor: 'Transparente Clear' },
      { tipo: 'Lente', valor: 'Oscuro Humo Solar' },
      { tipo: 'Lente', valor: 'Amarillo Alto Contraste' }
    ],
    lo_que_incluye: ['Gafas de seguridad policarbonato', 'Funda protectora en microfibra'],
    caracteristicas: ['Certificación ANSI Z87.1+', 'Protección contra radiación UVA/UVB al 99.9%', 'Puente nasal de goma antideslizante', 'Resistencia a esquirlas y salpicaduras químicas']
  }
];

