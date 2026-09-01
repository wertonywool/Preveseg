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

export const INITIAL_PRODUCTS: DefaultProduct[] = [
  {
    id: 'extintor-multiproposito-10lbs',
    nombre: 'Extintor Polvo Químico Seco ABC 10 Lbs Recargable (Certificado)',
    descripcion: 'Extintor de alta eficiencia para control de conatos de incendio Clase A (sólidos/madera), Clase B (combustibles y solventes) y Clase C (equipos eléctricos). Cilindro en lámina de acero de alta resistencia con manómetro y soporte de pared.',
    categoria: ['Extintores y Equipos Contra Incendio'],
    precio_normal: 120000,
    precio_oferta: 89900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Capacidad', valor: '10 Libras ABC' },
      { tipo: 'Capacidad', valor: '20 Libras ABC' },
      { tipo: 'Capacidad', valor: '5 Libras ABC' }
    ],
    lo_que_incluye: [
      'Cilindro con carga PQS 75% certificada',
      'Manguera de descarga y difusor',
      'Soporte metálico de fijación para muro',
      'Codificación e inspección inicial con tarjeta reglamentaria'
    ],
    caracteristicas: [
      'Certificado bajo norma técnica NFPA 10',
      'Válvula en bronce de rápida acción',
      'Pintura electrostática horneada anticorrosiva',
      'Servicio de recarga y mantenimiento disponible en Cali'
    ]
  },
  {
    id: 'extintor-solkaflam-agente-limpio',
    nombre: 'Extintor Agente Limpio Solkaflam / HFC 3700g para Equipos Electrónicos',
    descripcion: 'Extintor de gas limpio que no deja residuos ni deteriora servidores, laboratorios, cuartos de máquinas o computadores. Ideal para centros de cómputo, clínicas y oficinas en Cali.',
    categoria: ['Extintores y Equipos Contra Incendio'],
    precio_normal: 210000,
    precio_oferta: 165000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Capacidad', valor: '3.700 Gramos' },
      { tipo: 'Capacidad', valor: '7.000 Gramos' }
    ],
    lo_que_incluye: ['Cilindro cargado con agente limpio Solkaflam', 'Soporte de pared reforzado', 'Pasador y precinto de seguridad'],
    caracteristicas: ['No conductor de electricidad', 'Cero residuos post-descarga', 'Aprobado para salas de control y servidores']
  },
  {
    id: 'camilla-emergencia-espinal-plastica',
    nombre: 'Camilla de Emergencia Plástica Espinal con Inmovilizador y Correas',
    descripcion: 'Camilla rígida de inmovilización espinal para rescate y traslado de lesionados. Fabricada en polietileno de alta densidad, impermeable, radiotransparente y compatible con rayos X.',
    categoria: ['Camillas y Botiquines'],
    precio_normal: 290000,
    precio_oferta: 220000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Color', valor: 'Naranja Rescate', color: '#ff6600' },
      { tipo: 'Color', valor: 'Amarillo Seguridad', color: '#facc15' }
    ],
    lo_que_incluye: [
      '1x Camilla plástica rígida de rescate',
      '1x Juego de 3 correas de sujeción tipo reata con velcro',
      '1x Inmovilizador de cabeza lateral (Spider/Blocks)'
    ],
    caracteristicas: [
      'Capacidad de carga hasta 180 kg',
      'Flotabilidad en agua para rescate acuático',
      'Orificios perimetrales para agarre ergonómico',
      'Reglamentaria para brigadas de emergencia en empresas'
    ]
  },
  {
    id: 'botiquin-industrial-tipo-a-completo',
    nombre: 'Botiquín de Primeros Auxilios Industrial Tipo A y B en Gabinete Metálico',
    descripcion: 'Botiquín reglamentario para empresas, obras, colegios y locales comerciales según Resolución 0705 de Emergencias. Equipado con insumos médicos y de curación inmediata.',
    categoria: ['Camillas y Botiquines'],
    precio_normal: 165000,
    precio_oferta: 125000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Tipo de Botiquín', valor: 'Tipo A (Básico)' },
      { tipo: 'Tipo de Botiquín', valor: 'Tipo B (Mediano)' },
      { tipo: 'Tipo de Botiquín', valor: 'Portátil en Lona' }
    ],
    lo_que_incluye: [
      'Gabinete metálico con chapa o bolso de lona impermeable',
      'Gasas estériles, vendas elásticas y micropore',
      'Solución salina / antiséptico y guantes de látex',
      'Tijera de trauma, baja lenguas y termómetro',
      'Manual básico de primeros auxilios'
    ],
    caracteristicas: [
      'Cumple normatividad de Salud y Seguridad en el Trabajo SG-SST',
      'Insumos vigentes con registro Invima',
      'Listo para inspección de bomberos y alcaldía'
    ]
  },
  {
    id: 'kit-carretera-reglamentario-vehicular',
    nombre: 'Kit de Carretera Reglamentario Código Nacional de Tránsito Completo',
    descripcion: 'Equipo obligatorio de prevención vehicular para automóviles, camionetas y transporte de carga según Ley 769 del Código Nacional de Tránsito en Colombia.',
    categoria: ['Kits de Carretera y Vehiculares', 'Kits & Combos de Seguridad'],
    precio_normal: 135000,
    precio_oferta: 99000,
    en_oferta: true,
    es_kit: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Vehículo', valor: 'Automóvil / Particular' },
      { tipo: 'Vehículo', valor: 'Camioneta / SUV' },
      { tipo: 'Vehículo', valor: 'Transporte de Carga' }
    ],
    lo_que_incluye: [
      '1x Extintor ABC cargado y certificado para vehículo',
      '2x Tacos o cuñas plásticas de bloqueo',
      '2x Conos o triángulos reflectivos de prevención',
      '1x Botiquín vehicular con insumos de primeros auxilios',
      '1x Chaleco reflectivo de seguridad',
      '1x Linterna con pilas y juego de herramientas básicas',
      '1x Maletín organizador impermeable'
    ],
    caracteristicas: [
      '100% Reglamentario para retenes de tránsito y viajes',
      'Extintor con fecha vigente y precinto',
      'Maletín compacto de fácil almacenaje en baúl'
    ]
  },
  {
    id: 'cono-trafico-vial-reflectivo-70cm',
    nombre: 'Cono de Tráfico Naranja 70cm y 90cm con Cinta Reflectiva de Alta Intensidad',
    descripcion: 'Elemento de canalización y señalización vial en PVC de alta flexibilidad y resistencia a impactos de vehículos. Incluye 2 bandas reflectivas grado ingeniería para visibilidad nocturna.',
    categoria: ['Conos y Seguridad Vial'],
    precio_normal: 55000,
    precio_oferta: 42000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Altura', valor: '70 Centímetros' },
      { tipo: 'Altura', valor: '90 Centímetros' },
      { tipo: 'Altura', valor: '45 Centímetros' }
    ],
    lo_que_incluye: ['Cono vial en PVC de alta durabilidad con base pesada anti-vuelco'],
    caracteristicas: [
      'Base cuadrada pesada que evita volcamientos por viento',
      'Bandas reflectivas prismáticas de alta visibilidad',
      'Material con memoria que recupera su forma tras pisadas'
    ]
  },
  {
    id: 'hitos-delineadores-cinta-peligro',
    nombre: 'Hitos Delineadores Viales Flexibles y Cintas de Peligro / Demarcación',
    descripcion: 'Postes canalizadores flexibles para parqueaderos, obras viales y delimitación de carriles en industrias y vías públicas.',
    categoria: ['Conos y Seguridad Vial'],
    precio_normal: 68000,
    precio_oferta: 52000,
    en_oferta: true,
    destacado: false,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Tipo', valor: 'Hito Flexible 75cm con Base' },
      { tipo: 'Tipo', valor: 'Rollo Cinta Peligro 500m' }
    ],
    lo_que_incluye: ['Hito delineador tubular con bandas reflectivas'],
    caracteristicas: ['Fijación por chazos a pavimento', 'Resistente a rayos UV y clima exterior']
  },
  {
    id: 'senalizacion-fotoluminiscente-industrial',
    nombre: 'Señalización Industrial Fotoluminiscente (Extintor, Salida, Riesgo)',
    descripcion: 'Señales de seguridad reglamentarias fabricadas en estireno y acrílico de alta resistencia con pigmento fotoluminiscente que brilla en la oscuridad ante cortes de energía.',
    categoria: ['Señalización Industrial'],
    precio_normal: 25000,
    precio_oferta: 18000,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Motivo', valor: 'Extintor de Incendio' },
      { tipo: 'Motivo', valor: 'Ruta de Evacuación / Salida' },
      { tipo: 'Motivo', valor: 'Botiquín Primeros Auxilios' },
      { tipo: 'Motivo', valor: 'Riesgo Eléctrico / Peligro' }
    ],
    lo_que_incluye: ['Placa de señalización fotoluminiscente con adhesivo de montaje'],
    caracteristicas: [
      'Cumple norma NTC 1461 y estándares internacionales ISO 7010',
      'Fotoluminiscencia de alta intensidad y larga duración',
      'Resistente a humedad y lavado industrial'
    ]
  },
  {
    id: 'casco-dielectrico-tipo1',
    nombre: 'Casco de Seguridad Dieléctrico Tipo 1 con Tafilete 4 Puntos y Barboquejo',
    descripcion: 'Casco de protección industrial de alto impacto, certificado bajo norma ANSI Z89.1 Clase E & G. Fabricado en polímero de alta densidad con suspensión textil ajustable de 4 puntos.',
    categoria: ['EPP (Protección Personal)'],
    precio_normal: 45000,
    precio_oferta: 34900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Color', valor: 'Amarillo Industrial', color: '#facc15' },
      { tipo: 'Color', valor: 'Blanco Ingeniero', color: '#ffffff' },
      { tipo: 'Color', valor: 'Azul Operativo', color: '#0066ff' },
      { tipo: 'Color', valor: 'Rojo Emergencia', color: '#ee1b24' }
    ],
    lo_que_incluye: ['Casco dieléctrico de polietileno', 'Tafilete con suspensión de 4 puntos', 'Barbiquejo elástico de seguridad'],
    caracteristicas: ['Certificación ANSI/ISEA Z89.1-2014', 'Resistencia dieléctrica hasta 20,000V', 'Ranuras universales para protector auditivo y facial']
  },
  {
    id: 'gafas-seguridad-antiempanante',
    nombre: 'Gafas de Seguridad Panorámicas Antiempañante Filtro UV 99.9%',
    descripcion: 'Lente monolítico en policarbonato de alta resistencia balística con recubrimiento anti-rayaduras y anti-empañamiento. Patillas ajustables en ángulo y longitud.',
    categoria: ['EPP (Protección Personal)'],
    precio_normal: 28000,
    precio_oferta: 18900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Lente', valor: 'Transparente Clear' },
      { tipo: 'Lente', valor: 'Oscuro Humo Solar' },
      { tipo: 'Lente', valor: 'Amarillo Alto Contraste' }
    ],
    lo_que_incluye: ['Gafas de seguridad policarbonato', 'Funda protectora en microfibra'],
    caracteristicas: ['Certificación ANSI Z87.1+', 'Protección contra radiación UVA/UVB al 99.9%', 'Puente nasal de goma antideslizante']
  },
  {
    id: 'guantes-vaqueta-reforzados',
    nombre: 'Guantes de Vaqueta Tipo Ingeniero con Refuerzo en Palma',
    descripcion: 'Guante de protección manual fabricado en cuero vacuno flor de primera calidad, suave al tacto y de alta resistencia a la abrasión, desgarro y perforación.',
    categoria: ['EPP (Protección Personal)'],
    precio_normal: 32000,
    precio_oferta: 23900,
    en_oferta: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla', valor: 'Talla 9 (L)' },
      { tipo: 'Talla', valor: 'Talla 10 (XL)' }
    ],
    lo_que_incluye: ['Par de guantes de vaqueta natural'],
    caracteristicas: ['Norma EN 388 (Resistencia mecánica)', 'Elástico de ajuste dorsal para mayor firmeza', 'Refuerzo de doble cuero en palma y nudillos']
  },
  {
    id: 'kit-alturas-profesional-4-piezas',
    nombre: 'Kit de Alturas Integral Certificado 4 Piezas (Arnés + Eslinga + Casco + Mosquetón)',
    descripcion: 'Combo profesional completo para trabajo seguro en alturas. Cumple con normatividad nacional e internacional OSHA / ANSI Z359 para detención y posicionamiento.',
    categoria: ['Kits & Combos de Seguridad', 'EPP (Protección Personal)'],
    precio_normal: 385000,
    precio_oferta: 299900,
    en_oferta: true,
    es_kit: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578873375969-d7054a3a60a7?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Talla Arnés', valor: 'Ajustable Universal (M - XL)' }
    ],
    lo_que_incluye: [
      '1x Arnés de seguridad 4 argollas en X certificado ANSI',
      '1x Eslinga de detención con absorbedor de impacto 1.8m',
      '1x Casco dieléctrico Tipo 1 con barboquejo 3 puntos',
      '1x Mosquetón carabinero en acero forjado 50kN con doble seguro',
      '1x Maletín industrial impermeable de transporte'
    ],
    caracteristicas: [
      'Certificación total ANSI Z359.11-2014 & OSHA 1926.502',
      'Herrajes en acero de alta resistencia 5,000 lbs',
      'Listo para inspección y trabajo en obra civil e industrial'
    ]
  },
  {
    id: 'kit-brigada-emergencia-extincion',
    nombre: 'Kit Integral Brigada de Emergencia & Extinción de Incendios',
    descripcion: 'Dotación reglamentaria de respuesta inmediata para brigadas empresariales contra incendios y control de emergencias en Cali y Valle del Cauca.',
    categoria: ['Kits & Combos de Seguridad', 'Extintores y Equipos Contra Incendio'],
    precio_normal: 265000,
    precio_oferta: 195000,
    en_oferta: true,
    es_kit: true,
    destacado: true,
    visible: true,
    imagenes: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
    ],
    youtube_url: '',
    variantes: [
      { tipo: 'Capacidad Extintor', valor: '20 Libras ABC PQS' }
    ],
    lo_que_incluye: [
      '1x Extintor ABC multipropósito 20 Lbs recargable con soporte',
      '1x Chaleco reflectivo tipo brigadista de alta visibilidad',
      '1x Gafas panorámicas de seguridad anti-impacto ANSI Z87+',
      '1x Par de guantes de vaqueta reforzada para rescate',
      '1x Señalización de extintor fotoluminiscente de alta visibilidad'
    ],
    caracteristicas: [
      'Cumple estándar NFPA 10 y normativas de bomberos',
      'Pintura electrostática anticorrosiva y manómetro de precisión',
      'Entrega inmediata en Cali con certificación'
    ]
  }
];
