# GUÍA PARA GENERACIÓN DE HTML PERSONALIZADO (CUALY SHOP)

Este documento sirve como contexto para que cualquier IA (como Gemini o ChatGPT) genere el código HTML y CSS necesario para personalizar la página de un producto en Cualy Shop sin errores.

## 1. Contexto del Proyecto
Cualy Shop es una tienda online moderna. El sistema permite inyectar HTML y CSS personalizado por producto. Cuando se inyecta HTML, este reemplaza TODA la interfaz de la página del producto (a excepción del header y footer globales).

## 2. Funciones Globales Disponibles
El código inyectado puede ejecutar acciones del sistema usando el objeto global `window.cualyShop`. 
**Es obligatorio usar estos botones en el diseño:**

- `window.cualyShop.addToCart()`: Añade el producto actual al carrito.
- `window.cualyShop.whatsapp()`: Abre el chat de WhatsApp con el mensaje preconfigurado del producto.

### Ejemplo de botón:
```html
<button onclick="window.cualyShop.addToCart()">Añadir al Carrito</button>
<button onclick="window.cualyShop.whatsapp()">Consultar WhatsApp</button>
```

## 3. Estructura de Datos Requerida
Para que el HTML sea dinámico y no estático, la IA debe pedir al usuario o usar como variables los siguientes datos del producto:
- **Nombre del producto**
- **Precio Oferta** (el que se ve grande)
- **Precio Normal** (el tachado, si existe)
- **URL de Imágenes** (usualmente un array de URLs)
- **Descripción**
- **Especificaciones/Detalles** (clave: valor)

## 4. Reglas de Diseño
1. **Responsividad:** El diseño DEBE ser `flex` o `grid` y verse bien en móviles.
2. **Aislamiento:** Usa una clase contenedor principal (ej: `.custom-layout`) para que el CSS no afecte a otros elementos (aunque el sistema ya lo intenta aislar).
3. **Variables de Color del Sitio:**
   - `--tech-blue`: #00AEEF
   - `--tech-blue-dark`: #0081B1
   - `background`: Generalmente oscuro (#0f172a) a menos que el tema pida lo contrario.

## 5. Plantilla Base Sugerida
La IA debe generar un bloque de `<style>` y un bloque de `<div>` contenedor. 

---
**Instrucción Final para la IA:** "Lee los datos del producto que te daré a continuación y genera un archivo TXT con el HTML y CSS combinados que use `window.cualyShop` para las acciones. Hazlo visualmente impactante y temático."
