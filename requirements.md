1. Creación y Configuración del Proyecto Angular
   Necesitas tener Node.js y el CLI de Angular instalados.
   Paso 1: Instalar el CLI de Angular
   Si aún no lo tienes, instala el Command Line Interface (CLI) de Angular globalmente:
   desde consola CMD:
   npm install -g @angular/cli

npm install @ngneat/hot-toast /// Esto agrega el manejo de mensajes flotantes mas modernos al usuario.
npm install @ngneat/overview --legacy-peer-deps
npm install @angular/animations --legacy-peer-deps

Paso 2: Crear el Nuevo Proyecto
Abre tu terminal en el directorio donde deseas crear la carpeta del frontend y usa el comando
ng new superheroe-frontend --strict –routing

ó si se quiere establecer de una vez que quiere usar SCSS y routing ejecutar lo siguiente:
ng new superheroe-frontend --strict --routing=true --style=scss

El CLI te hará algunas preguntas:
Pregunta Respuesta Sugerida
Would you like to add Angular routing? Yes (Aceptado en el comando --routing)
Which stylesheet format would you like to use? SCSS (Recomendado) o CSS

Esto creará la carpeta superheroe-frontend y configurará un proyecto Angular básico con TypeScript.

Paso 3: Iniciar la Aplicación
Navega a la nueva carpeta e inicia el servidor de desarrollo de Angular:
CMD:
cd superheroe-frontend
ng serve
ó
ng serve -o para compilar y ejecutar en automatico a un explorador ,Tu frontend estará corriendo, típicamente en http://localhost:4200

Asi se debe de ver la ramificación en tu visual code.

2. Integración y Conexión con el Backend
   El reto principal es manejar la comunicación segura entre el frontend (puerto 4200) y el backend (puerto 3000) y configurar el manejo de peticiones HTTP.
   A. Configurar el Proxy de Angular (Crucial)
   Para evitar errores de CORS en desarrollo, configuraremos Angular para que redirija las solicitudes API a tu backend.
1. Crea el archivo de configuración del proxy: En la raíz de tu proyecto Angular (superheroe-frontend/), crea un archivo llamado proxy.conf.json:
   JSON
   // proxy.conf.json
   {
   "/api": {
   "target": "http://localhost:3000",
   "secure": false,
   "changeOrigin": true
   }
   }
   Asegúrate de que http://localhost:3000 se a el puerto donde corre tu servidor Express. (Tu back-end)

NOTA: estando en modo CMD desde carpeta raiz del proyecto: superheroe-frontend , se puede ejcutar el comando para abrir el visual code desde esta carpeta usando la frase “code” espacio y un punto “.” de la siguiente manera: “code .” y Enter , esto abrirá el editor. De esta manera crear los documentos necesarios.

Configura Angular para usar el proxy: Abre el archivo angular.json en la raíz del proyecto. Busca la sección serve dentro de projects -> superheroe-frontend -> architect -> serve -> options y añade la propiedad proxyConfig:
JSON
// angular.json (Fragmento)
"serve": {
"builder": "@angular-devkit/build-angular:dev-server",
"options": {

    "proxyConfig": "proxy.conf.json" // <--- AGREGA ESTA LÍNEA

},
// ...
},

Reinicia el servidor: Detén (Ctrl+C) y vuelve a iniciar el servidor de desarrollo para aplicar los cambios:
Bash(cmd)
ng serve , si no funciona este comando usar este otro: ng start
Ahora, cualquier solicitud HTTP que comience con /api será redirigida a tu backend en el puerto 3000.
\*\* en el documento tsconfig.json, verificar la configutración como a continuacion:

{
"compileOnSave": false,
"compilerOptions": {
"outDir": "./dist/out-tsc", /_ Agregamos esto para tener mi proyecto final_/
"strict": true,
"noImplicitOverride": true,
"noPropertyAccessFromIndexSignature": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true,
"skipLibCheck": true,
"isolatedModules": true,
"experimentalDecorators": true,
"importHelpers": true,
"target": "ES2022",
"module": "preserve"
},
"angularCompilerOptions": {
"enableI18nLegacyMessageIdFormat": false,
"strictInjectionParameters": true,
"strictInputAccessModifiers": true,
"strictTemplates": true
},
"files": [],
"references": [
{
"path": "./tsconfig.app.json"
},
{
"path": "./tsconfig.spec.json"
}
]
}

** En el archivo angular.json, buscar la seccion donde dice: “assets”: .. y agregar este renglon al json: “src/assets”, quedaria asi:
"assets": [
"src/assets",
{
"glob": "**/\*",
"input": "public"
}
],

lo demas sigue igual.

En la carpeta raiz “superheroe-front” dentro de carpeta public, agregar dos carpetas mas “assets/images” dentro de images, ir en el explorador a esta ruta y agregar las imagenes de los superherores, estan en png.

I. Frontend del Catálogo (HTML/TypeScript)
Este frontend se centrará en consumir los endpoints que creamos (/api/heroes/catalog y /api/heroes/favorites). Usaremos un diseño responsivo básico con CSS Grid para lograr la distribución de 4 columnas solicitada.
A. Estructura HTML (index.html)

<!doctype html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>Superheroes App</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
	<app-root></app-root>
</body>
</html>

B. Estilos CSS (styles.css)

body {
font-family: sans-serif;
margin: 0;
padding: 0;
background-color: #f4f4f9;
}

header {
background-color: #3f51b5;
color: white;
padding: 20px;
text-align: center;
}

nav button {
background-color: #ff9800;
color: white;
border: none;
padding: 10px 20px;
margin: 5px;
cursor: pointer;
border-radius: 4px;
transition: background-color 0.3s;
}

nav button:hover {
background-color: #f57c00;
}

main {
padding: 20px;
max-width: 1200px;
margin: 0 auto;
}

/_ --- GRID Responsivo de 4 Columnas --- _/
.hero-grid {
display: grid;
/_ Por defecto, una columna _/
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;
margin-top: 20px;
}

.hero-card {
background-color: white;
border: 1px solid #ddd;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
transition: transform 0.2s;
}

.hero-card:hover {
transform: translateY(-5px);
}

.hero-card img {
width: 100%;
height: 200px;
object-fit: cover;
}

.hero-content {
padding: 15px;
}

.hero-content h3 {
margin-top: 0;
color: #3f51b5;
}

.hero-content p {
font-size: 0.9em;
margin: 5px 0;
}

/_ Media query para asegurar 4 columnas en pantallas grandes _/
@media (min-width: 1000px) {
.hero-grid {
/_ Fija las columnas a 4 _/
grid-template-columns: repeat(4, 1fr);
}
}

\*\* Logica para archivo app.html

<nav class="navbar">
<div class="container">
<div class="logo" routerLink="/">
<span class="icon">🦸‍♂️</span>
<strong>SuperHero App</strong>
</div>

<nav class="menu">
<a routerLink="/catalog" routerLinkActive="active" class="menu-item">
Catálogo
</a>
<a routerLink="/user-registration" routerLinkActive="active" class="menu-item">
Alta de Usuarios
</a>
<a routerLink="/about" routerLinkActive="active" class="menu-item">
Sobre el Proyecto
</a>
@if (!authService.currentUser()) {
<button routerLink="/login" class="btn-login">Iniciar Sesión</button>
}
@else {
<a routerLink="/add-hero" class="btn-nav">➕ Nuevo Héroe</a>
<a routerLink="/favoritos" routerLinkActive="active" class="menu-item">
Mis Favoritos
</a>
<div class="user-info">
<span class="user-welcome">Hola, {{ authService.currentUser()?.nombre }}</span>
<button (click)="logout()" class="btn-logout">Cerrar Sesión</button>
</div>
}
</nav>

</div>
</nav>

<main class="content-area">
<router-outlet></router-outlet>
</main>

<footer class="main-footer">
<p>&copy; 2025 Superhero Project - Desarrollado con Angular & Knex.js</p>
</footer>

@if (notify.message()) {

<div class="comic-toast" [ngClass]="notify.type()">
<div class="comic-content">
{{ notify.message() }}
</div>
</div>
}

<style>
.comic-toast {
position: fixed;
bottom: 30px;
right: 30px;
z-index: 10000;
animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.comic-content {
background: #fff;
color: #000;
border: 4px solid #000;
padding: 15px 25px;
font-weight: 900;
text-transform: uppercase;
font-family: 'Arial Black', sans-serif;
position: relative;
box-shadow: 8px 8px 0px #000;
}

/* Variaciones de color estilo cómic */
.success .comic-content { background: #2ecc71; color: white; }
.error .comic-content { background: #e74c3c; color: white; }
.info .comic-content { background: #f1c40f; color: black; }

@keyframes popIn {
0% { transform: scale(0) rotate(-10deg); opacity: 0; }
100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
</style>

C. Lógica TypeScript (app.ts)
import { Component, signal,inject } from '@angular/core';
import { RouterOutlet,RouterLink,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, RouterOutlet, RouterLink],
templateUrl: './app.html',
styleUrl: './app.scss'
})
export class App {
protected readonly title = signal('superheroes App');
// Inyectamos el servicio
authService = inject(AuthService);
private router = inject(Router);
public notify = inject(NotifyService);

// Podrías usar esto para cambiar el menú si el usuario está logueado
isLoggedIn: boolean = false;

constructor() {
// Aquí podrías verificar si hay un token en el localStorage al iniciar
this.isLoggedIn = !!localStorage.getItem('token');
}

logout() {
localStorage.removeItem('token');
this.isLoggedIn = false;
// Redirigir al login
this.authService.logout();
this.router.navigate(['/login']);
}

}

NOTA: Esto que esta aquí abajo esta en el proyecto de Back-end, donde lo quieran poner, solo dejarlo en un solo proyecto no en ambos, pasar al paso de generar la estructura de carpetas.
Script Seeder (Prisma)
Este script llenará tu tabla catsuperheroe con datos de ejemplo para que puedas probar el frontend y el grid de 4x3 inmediatamente.
A. Configuración

1. Crea la carpeta db/seeds si no existe.
2. Crea el archivo db/seeds/01_superheroes.ts.
3. Asegúrate de tener instalado ts-node y typescript como dev dependencies (npm install -D ts-node typescript).
   B. Código del Seeder (db/seeds/01_superheroes.ts)
   // seeds/01_superheroes.ts (o la ruta que uses para tus seeds de Knex)

import { Knex } from 'knex';

// ----------------------------------------------------
// 1. Datos de Semilla (La lista de Superhéroes)
// ----------------------------------------------------

const superHeroesData = [
{
nombre: 'Superman',
poder: 'Vuelo, Súper Fuerza, Visión de calor',
fortaleza: 'Sol Amarillo',
resistencia: 'Extremadamente alta',
debilidad: 'Kryptonita',
imagen_url: 'http://example.com/superman.jpg'
},
{
nombre: 'Wonder Woman',
poder: 'Fuerza sobrehumana, Vuelo, Lazo de la Verdad',
fortaleza: 'Su voluntad y su entrenamiento',
resistencia: 'Muy alta',
debilidad: 'Armas punzantes (anteriormente)',
imagen_url: 'http://example.com/wonderwoman.jpg'
},
{
nombre: 'Batman',
poder: 'Intelecto de genio, Maestría en combate',
fortaleza: 'Su preparación y gadgets',
resistencia: 'Humana máxima',
debilidad: 'Mortalidad y traumas',
imagen_url: 'http://example.com/batman.jpg'
},
{
nombre: 'Flash (Barry Allen)',
poder: 'Súper Velocidad, Capacidad de vibrar a través de la materia',
fortaleza: 'La Speed Force',
resistencia: 'Acelerada',
debilidad: 'Frío extremo',
imagen_url: 'http://example.com/flash.jpg'
},
{
nombre: 'Spider-Man (Peter Parker)',
poder: 'Fuerza y agilidad proporcionales a una araña, Sentido arácnido',
fortaleza: 'Su sentido arácnido y lanzaredes',
resistencia: 'Alta',
debilidad: 'Ciertos sonidos de alta frecuencia',
imagen_url: 'http://example.com/spiderman.jpg'
},
{
nombre: 'Iron Man (Tony Stark)',
poder: 'Genio multimillonario, Armadura avanzada',
fortaleza: 'Su inteligencia y recursos',
resistencia: 'La de su armadura',
debilidad: 'Su ego y dependencia de la armadura',
imagen_url: 'http://example.com/ironman.jpg'
},
// Puedes añadir más héroes aquí...
];

// ----------------------------------------------------
// 2. Funciones de Knex para Seed
// ----------------------------------------------------

/\*\*

- Función que inserta los datos. Es requerida por Knex.
- @param knex Instancia de Knex
  \*/
  export async function seed(knex: Knex): Promise<void> {
  const TABLE_NAME = 'catsuperheroe';

      // Borra *TODOS* los registros existentes de la tabla antes de insertar
      await knex(TABLE_NAME).del();

      // Inserta los nuevos datos
      await knex(TABLE_NAME).insert(superHeroesData);

      console.log(`✅ ${superHeroesData.length} Superhéroes insertados en la tabla '${TABLE_NAME}'.`);

  }

C. Ejecución del Seeder
Para ejecutar el seeder, deberás modificar tu package.json para añadir un script de ejecución y luego usar ts-node.

1. Abre package.json y añade el script bajo "scripts"
   "scripts": {
   "start": "ts-node src/index.ts",
   "seed": "ts-node prisma/seed.ts", <--- AÑADE ESTA LÍNEA
   "dev": "nodemon src/index.ts"
   }

// ejecutar esto para agregar los super heroes
npx knex seed:run

2.- Ejecuta la migración y el seeder (en ese orden) en tu terminal:

# 1. Aplica la migración para crear las tablas

npx prisma migrate dev --name init

# 2. Ejecuta el script seeder

npm run seed

Una vez que el seeder se ejecute con éxito, tu base de datos tendrá 12 superhéroes listos para ser mostrados en tu frontend en la configuración de grid 4x3.

\***\* Apartir de aquí generamos las carpetas de servicios y paginas que iremos ocupando **

##Generamos una carpeta ( Services)donde agregaremos los arachivos de servicios en nuestra carpeta Raiz ( app/services)

--Agregar un Archivo .Ts en modulo de services: “notify.service.ts”
// src/app/services/notify.service.ts

// src/app/services/notify.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotifyService {
message = signal<string | null>(null);
type = signal<'success' | 'error' | 'info'>('info');

show(msg: string, type: 'success' | 'error' | 'info' = 'info') {
this.message.set(msg);
this.type.set(type);
// Se limpia automáticamente tras 3 segundos
setTimeout(() => {
this.message.set(null);
}, 3000);
}
}
** Agregamos un archivo para el servicio de nuestra pagina de catalogo \***
heroes.service.ts
Ruta: src/app/services/heroes.service.ts

Dentro de ese archivo agregar lo siguiente:

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define un tipo de interfaz para la respuesta
export interface Heroe {
id?: number;
nombre: string;
poder: string;
fortaleza: string;
resistencia: string;
debilidad: string;
imagen_url: string;
esFavorito?: boolean;
}

@Injectable({
providedIn: 'root'
})
export class HeroesService {
// Usamos /api y el proxy se encarga de redirigir a http://localhost:3000/api
private readonly API_URL = '/api';

constructor(private http: HttpClient) { }

getCatalog(): Observable<Heroe[]> {
console.log('Llamando a getCatalog');
console.log(`URL de la API: ${this.API_URL}/catalog`);

return this.http.get<Heroe[]>(`${this.API_URL}/heroes/catalog`);
}

addFavorite(heroId: number): Observable<any> {
// 1. Obtener el token del localStorage, esto se agrega después del login
const token = localStorage.getItem('token');
if (!token || token === '') {
throw new Error('No se encontró el token de autenticación');
}

// 2. Crear las cabeceras con el formato 'Authorization: Bearer TOKEN'
const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`
});
return this.http.post(`${this.API_URL}/heroes/favorites`, { heroId }, { headers });
}
createHero(hero: { nombre: string, poder: string,fortaleza:string,resistencia:string, debilidad:string, imagen_url: string }): Observable<any> {
if (!hero.nombre || !hero.poder || !hero.fortaleza || !hero.resistencia || !hero.debilidad || !hero.imagen_url) {
throw new Error('Todos los campos del héroe son obligatorios');
}

// 1. Obtener el token del localStorage, esto se agrega después del login
const token = localStorage.getItem('token');
if (!token || token === '') {
throw new Error('No se encontró el token de autenticación');
}

// 2. Crear las cabeceras con el formato 'Authorization: Bearer TOKEN'
const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`
});

return this.http.post(`${this.API_URL}/heroes`, hero, { headers });
}
}

**_ Agregamos un archivo para el servio de nuestra pagina Favoritos _**
El Servicio de la pagina de Favoritos (favorites.service.ts)
\*\* en app/services

import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
private http = inject(HttpClient);
private apiUrl = '/api';

// Obtener todos los favoritos del usuario actual
getFavorites(): Observable<any[]> {
// 1. Obtener el token del localStorage, esto se agrega después del login
const token = localStorage.getItem('token');
if (!token || token === '') {
throw new Error('No se encontró el token de autenticación');
}
// 2. Crear las cabeceras con el formato 'Authorization: Bearer TOKEN'
const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`
});
console.log('Obteniendo favoritos con token:', token);
return this.http.get<any[]>(`${this.apiUrl}/heroes/favorites`, { headers });
}

// Agregar a favoritos
addFavorite(heroeId: number): Observable<any> {
// 1. Obtener el token del localStorage, esto se agrega después del login
const token = localStorage.getItem('token');
if (!token || token === '') {
throw new Error('No se encontró el token de autenticación');
}
// 2. Crear las cabeceras con el formato 'Authorization: Bearer TOKEN'
const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`
});
return this.http.post(`${this.apiUrl}/heroes/favorites`, { heroeId }, { headers });
}

// Eliminar de favoritos
removeFavorite(heroeId: number): Observable<any> {
// 1. Obtener el token del localStorage, esto se agrega después del login
const token = localStorage.getItem('token');
if (!token || token === '') {
throw new Error('No se encontró el token de autenticación');
}
// 2. Crear las cabeceras con el formato 'Authorization: Bearer TOKEN'
const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`
});
return this.http.delete(`${this.apiUrl}/heroes/favorites/${heroeId}`, { headers });
}
}

**Agregaremos el componente para nuestra pagina de catalogo de superheroes**
ng generate component pages/catalog/catalog.component –skip-tests –flat
Se Generaron los siguientes 3 documentos:
--catalog.component.html
--catalog.component.scss
--catalog.component.ts

Dentro del documento catalog.component.html, agregar lo siguiente:

<div class="catalog-header">
<h2>Catálogo de Superhéroes</h2>
<p>Explora la liga de defensores de la justicia.</p>
</div>

@if (loading) {

<div class="loader">Cargando héroes...</div>
} @else if (heroes.length > 0) {
<div class="hero-grid">
@for (heroe of heroes; track heroe.id) {
<div class="hero-card">
<div class="card-image">
<img [src]="heroe.imagen_url ? 'assets/images/' + (heroe.imagen_url.startsWith('/') ? heroe.imagen_url.substring(1) : heroe.imagen_url) : 'assets/images/Placeholder.png'" [alt]="heroe.nombre">
<div class="overlay">
<button
(click)="addToFavorites(heroe)"
[class.is-fav]="heroe.esFavorito"
class="btn-fav">
{{ heroe.esFavorito ? '❤️' : '🤍' }}
</button>
</div>
</div>
<div class="card-content">
<h3>{{ heroe.nombre }}</h3>
<p class="power-tag">{{ heroe.poder }}</p>
</div>
</div>
}
</div>
} @else {
<div class="empty-msg">No se encontraron superhéroes.</div>
}

\*_Dentro del documento catalog.component.scss, agregar lo siguiente:
/_ src/app/pages/catalog/catalog.component.scss \*/

.catalog-header {
text-align: center;
margin-bottom: 40px;
h2 {
font-size: 2.5rem;
color: #2c3e50;
margin-bottom: 8px;
font-weight: 800;
}

p {
color: #7f8c8d;
font-size: 1.1rem;
}
}

.hero-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 30px;
padding: 10px;
}

.hero-card {
background: #ffffff;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
display: flex;
flex-direction: column;
height: 100%;

&:hover {
transform: translateY(-10px);
box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);

.card-image .overlay {
opacity: 1; // Muestra el botón al hacer hover
}
.card-image img {
transform: scale(1.1);
}
}

.card-image {
position: relative;
height: 250px;
width: 100%;
overflow: hidden;
background-color: #f0f0f0;

img {
width: 100%;
height: 100%;
object-fit: contain;
object-position: top;
transition: transform 0.5s ease;
}

.overlay {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.3); // Oscurece sutilmente
justify-content: flex-end; // Empuja al botón a la derecha
align-items: flex-start; // Empuja al botón hacia arriba
padding: 12px; // Espacio desde la esquina
opacity: 1; // Si quieres que se vea siempre, déjalo en 1
//transition: opacity 0.3s ease;
z-index: 2;

// EL BOTÓN AHORA ESTÁ AQUÍ ADENTRO
.btn-fav {
background-color: rgba(255, 255, 255, 0.8);
color: #e74c3c;
border: none;
width: 40px; // Lo hacemos circular
height: 40px;
border-radius: 50%;
font-size: 1.2rem;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
transition: transform 0.2s ease;

&:hover {
background: white;
box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
}

&.is-fav {
background-color: #e74c3c !important;
color: #ffffff !important;
transform: scale(1.1);
box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
}
}
}
}

.card-content {
padding: 20px;
flex-grow: 1;

h3 {
margin: 0 0 8px 0;
color: #2c3e50;
font-size: 1.4rem;
}

.power-tag {
display: inline-block;
background: #eef2f7;
color: #3498db;
padding: 4px 12px;
border-radius: 20px;
font-size: 0.85rem;
font-weight: 600;
margin-bottom: 16px;
border: 1px solid #d1d9e6;
}
}
}

.loader, .empty-msg {
text-align: center;
padding: 60px;
font-size: 1.2rem;
color: #95a5a6;
background: #fff;
border-radius: 12px;
margin-top: 20px;
}

\*\*\*Agregar en el archivo catalog.component.ts, lo siguiente:

// src/app/pages/catalog/catalog.component.ts
import { Component, OnInit,ChangeDetectorRef ,inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

//Servicios
import { HeroesService, Heroe } from '../../services/heroes.service';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
selector: 'app-catalog',
standalone: true,
imports: [CommonModule], // Puede quedar vacío si no usas pipes como | date o | json
templateUrl: './catalog.component.html',
styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
private authService = inject(AuthService);
private router = inject(Router);
private notify = inject(NotifyService);
private favService = inject(FavoritesService);

heroes: Heroe[] = [];
loading: boolean = true;

constructor(private heroesService: HeroesService, private cdr: ChangeDetectorRef) { }

ngOnInit(): void {
this.loadHeroes();
}

loadHeroes() {
this.loading = true;
this.heroesService.getCatalog().subscribe({
next: (data:any) => {
this.heroes = data;
this.loading = false;
this.cdr.detectChanges();
console.log('Catálogo renderizado con @for:', this.heroes);
},
error: (err:any) => {
console.error('Error:', err);
this.loading = false;
this.cdr.detectChanges();
}
});
}

toggleFavorite(heroe: any) {
if (heroe.esFavorito) {
// Si ya es favorito, lo eliminamos
this.favService.removeFavorite(heroe.id).subscribe({
next: () => {
heroe.esFavorito = false;
this.notify.show('Eliminado de favoritos', 'info');
this.cdr.detectChanges();
}
});
} else {
// Si no es favorito, lo agregamos (tu lógica anterior)
this.favService.addFavorite(heroe.id).subscribe({
next: () => {
heroe.esFavorito = true;
this.notify.show('¡Añadido! ❤️', 'success');
this.cdr.detectChanges();
}
});
}
}

addToFavorites(heroes: any) {
// 1. Validamos si está logueado
if (!this.authService.isLoggedIn()) {
this.notify.show('¡ALTO AHÍ! Inicia sesión primero 🔒', 'info');
return;
}

console.log('Añadiendo a favoritos el héroe con ID:', heroes.id);
// 2. Si está logueado, procedemos con la petición
this.heroesService.addFavorite(heroes.id).subscribe({
next: () => {
// 1. Buscamos el índice del héroe en nuestro array principal
const index = this.heroes.findIndex(h => h.id === heroes.id);
if (index !== -1) {
// 2. Creamos una copia del objeto y le añadimos/cambiamos la propiedad
// Esto rompe la referencia antigua y obliga a Angular a redibujar
this.heroes[index] = {
...this.heroes[index],
esFavorito: true
};
}

this.notify.show(`${heroes.nombre} añadido a tus favoritos ❤️`, 'success');
heroes.esFavorite = true;
this.cdr.detectChanges(); //esto hace que angular se de cuenta del cambio

},
error: (err:any) => {
if(err.status === 401 ){
this.notify.show('Tu sesión ha expirado. Por favor, inicia sesión de nuevo 🔒', 'error');
this.authService.logout();
this.router.navigate(['/login']);
}
else if (err.status === 400) {
this.notify.show(`${heroes.nombre} ya está en tus favoritos ❗`, 'info');
}
else
{
this.notify.show('Error al añadir a favoritos ❌', 'error');
console.error('Error al añadir a favoritos:', err);
}
}
});

}
}

Agregaremos los archivos para manejo de la pestaña “Favoritos”
en el CMD ejecutar lo siguiente:
ng generate component pages/favorites/favorites.component --skip-tests --flat

Agregamos los 3 documentos( .ts , .html y .scss) para poder agregar un superheroe:
en el CMD en la ruta del proyecto:

en la carpeta de app/pages/favorites , se generaron con el comando “ng generate component…” los siguientes archivos:
--favorites.component.html
--favorites.component.scss
--favorites.component.ts

\*\*Dentro del archivo favorites.component.html, agregar lo siguiente:

<div class="catalog-header">
<h2>Mis Favoritos ❤️</h2>
<p>Tu liga personal de defensores.</p>
</div>

@if (loading) {

<div class="loader">Cargando tus favoritos...</div>
} @else if (favorites.length > 0) {
<div class="hero-grid">
@for (heroe of favorites; track heroe.id) {
<div class="hero-card">
<div class="card-image">
<img [src]="heroe.imagen_url ? 'assets/images/' + heroe.imagen_url : 'assets/images/placeholder.png'" [alt]="heroe.nombre">
<div class="overlay">
<button
(click)="removeFromFavorites(heroe)"
class="btn-fav is-fav">
❤️
</button>
</div>
</div>
<div class="card-content">
<h3>{{ heroe.nombre }}</h3>
<p class="power-tag">{{ heroe.poder }}</p>
</div>
</div>
}
</div>
} @else {
<div class="empty-msg">Aún no has guardado ningún héroe.</div>
}

\*\*Dentro del archivo favorites.component.scss agregar lo siguiente:
//Con esto se importan los estilos del componente de catálogo para usarlos en el componente de favoritos
@import '../../catalog/catalog.component.scss';

\*\*Dentro del documento favorites.component.ts, Agregamos lo siguiente:
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotifyService } from '../../services/notify.service';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
selector: 'app-favorites',
standalone: true,
imports: [CommonModule],
templateUrl: './favorites.component.html',
styleUrls: ['./favorites.component.scss'] // Puedes reutilizar el SCSS del catálogo
})
export class FavoritesComponent implements OnInit {
favorites: any[] = [];
loading = true;

private favService = inject(FavoritesService);
private notify = inject(NotifyService);
private cdr = inject(ChangeDetectorRef);
private router = inject(Router);
private authService = inject(AuthService);

ngOnInit() {
this.loadFavorites();
}

loadFavorites() {
this.favService.getFavorites().subscribe({
next: (data) => {
this.favorites = data.map(f => ({ ...f, esFavorito: true }));
this.loading = false;
this.cdr.detectChanges();
},
error: (err) => {
if (err.status === 401) {
this.notify.show('Debe loguearse para ver favoritos', 'info');
this.router.navigate(['/login']);
this.authService.logout();
} else {
this.notify.show('Error al cargar favoritos', 'error');
}
this.loading = false;
}
});
}

removeFromFavorites(heroe: any) {
this.favService.removeFavorite(heroe.id).subscribe({
next: () => {
// Filtramos el array para quitarlo de la vista inmediatamente
this.favorites = this.favorites.filter(h => h.id !== heroe.id);
this.notify.show(`${heroe.nombre} eliminado de favoritos`, 'info');
this.cdr.detectChanges();
},
error: () => this.notify.show('No se pudo eliminar', 'error')
});
}
}

** Agregamos el arhivo para el servicio de login, este servicio consulta nuestro back-end**
En la carpeta: src/app/services, agregamos un documento y lo llamamos: users.service.ts y agregamos lo siguiente:
// src/app/services/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
private apiUrl = '/api/users'; // El proxy lo redirigirá a tu backend

constructor(private http: HttpClient) {}

registerUser(userData: any): Observable<any> {
return this.http.post(this.apiUrl, userData);
}
}

\*\* Agregamos el archivo para el servicio donde pedira la utenticación del usuario:
auth.service.ts
Ruta: src/app/service , Agregar lo siguinte el documento:

// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
currentUser = signal<{ nombre: string } | null>(null);
private apiUrl = 'api/auth/login'; // Ajusta según tu ruta de backend

constructor(private http: HttpClient) {
// Al cargar la app, revisamos si ya hay un usuario en el localStorage
const savedUser = localStorage.getItem('user_name');
const token = localStorage.getItem('token');
if (savedUser && token) {
this.currentUser.set({ nombre: savedUser });
}
}

// Llama a esto cuando el login sea exitoso
setLoginData(nombre: string, token: string) {
localStorage.setItem('token', token);
localStorage.setItem('user_name', nombre);
this.currentUser.set({ nombre }); // Actualiza el estado global
}

login(credentials: any): Observable<any> {
return this.http.post(this.apiUrl, credentials).pipe(
tap((res: any) => {
// Si el backend nos da un token, lo guardamos
if (res.token) {
localStorage.setItem('token', res.token);
localStorage.setItem('user', JSON.stringify(res.user));
}
})
);
}

logout() {
localStorage.removeItem('token');
localStorage.removeItem('user');
localStorage.clear();
this.currentUser.set(null); // Limpia el estado global
}

isLoggedIn(): boolean {
return !!this.currentUser();
}
}

\*\*Continuamos a generar los componentes para la pagina de Registro de usuarios:
ng generate component pages/user-registration/user_registration.component --skip-tests --flat
Aqui se generaron los siguientes archivos:
-- user_registration.component.html
-- user_registration.component.scss
-- user_registration.component.ts

\*\*En documento user_registration.component.html, agregar lo siguinte:

<div class="registration-container">
<h2>Crear Nueva Cuenta de Héroe</h2>
<p>Regístrate para gestionar tus superhéroes favoritos.</p>

<form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="hero-form">
<div class="form-group">
<label>Nombre Completo</label>
<input type="text" formControlName="nombre" placeholder="Ej. Tony Stark">
<span class="error" *ngIf="registerForm.get('nombre')?.invalid && registerForm.get('nombre')?.touched">
El nombre es requerido (mín. 3 caracteres).
</span>
</div>

<div class="form-group">
<label>Correo Electrónico</label>
<input type="email" formControlName="email" placeholder="heroe@avengers.com">
<span class="error" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
Ingresa un correo válido.
</span>
</div>

<div class="form-group">
<label>Contraseña</label>
<input type="password" formControlName="password" placeholder="******">
<span class="error" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
Mínimo 6 caracteres.
</span>
</div>

<button type="submit" [disabled]="registerForm.invalid" class="btn-submit">
Registrar Usuario
</button>

<div *ngIf="message" [ngClass]="{'msg-success': !isError, 'msg-error': isError}" class="feedback">
{{ message }}
</div>
</form>
</div>

\*\* En el documento :user_registration.component.scss, Agregar lo siguiente:

.form-group {
margin-bottom: 20px;
label { display: block; margin-bottom: 8px; font-weight: bold; color: #34495e; }
input {
width: 100%;
padding: 12px;
border: 2px solid #ddd;
border-radius: 8px;
transition: border-color 0.3s;
&:focus { border-color: #e74c3c; outline: none; }
}
}
}

.btn-submit {
width: 100%;
padding: 15px;
background-color: #e74c3c;
color: white;
border: none;
border-radius: 8px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
&:disabled { background-color: #bdc3c7; cursor: not-allowed; }
}

.error { color: #e74c3c; font-size: 0.8rem; margin-top: 5px; display: block; }

.feedback {
margin-top: 20px;
padding: 10px;
border-radius: 5px;
text-align: center;
}
.msg-success { background: #d4edda; color: #155724; }
.msg-error { background: #f8d7da; color: #721c24; }
.registration-container {
max-width: 500px;
margin: 40px auto;
padding: 30px;
background: white;
border-radius: 12px;
box-shadow: 0 10px 25px rgba(0,0,0,0.1);
text-align: center;

h2 { color: #2c3e50; margin-bottom: 10px; }
p { color: #7f8c8d; margin-bottom: 30px; }
}

.hero-form {
text-align: left;

\*\*En el documento: user_registration.component.ts , Agregar lo siguiente:
// src/app/pages/user-registration/user-registration.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
imports: [CommonModule,ReactiveFormsModule],
selector: 'app-user-registration',
templateUrl: './user-registration.component.html',
styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
registerForm!: FormGroup;
message: string = '';
isError: boolean = false;

constructor(private fb: FormBuilder, private usersService: UsersService) {}

ngOnInit(): void {
this.registerForm = this.fb.group({
nombre: ['', [Validators.required, Validators.minLength(3)]],
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.minLength(6)]],
role: ['user'] // Valor por defecto
});
}

onSubmit() {
if (this.registerForm.valid) {
this.usersService.registerUser(this.registerForm.value).subscribe({
next: (res) => {
this.message = '¡Usuario registrado con éxito!';
this.isError = false;
this.registerForm.reset({ role: 'user' });
},
error: (err) => {
this.message = err.error.message || 'Error al registrar usuario';
this.isError = true;
}
});
}
}
}

** Generamos los archivos para la pagina de Login **
ng generate component pages/login/login –skip-tests –flat
y deben aparecer estos 3 archivos:
--login.html
--login.scss
--login.ts

\*\* En el documento: login.html, Agregar lo siguiente:

<div class="login-page">
<div class="login-card">
<div class="login-header">
<span class="shield-icon">🛡️</span>
<h2>Acceso a la Atalaya</h2>
<p>Ingresa tus credenciales de héroe</p>
</div>

<form [formGroup]="loginForm" (ngSubmit)="onLogin()">
<div class="form-group">
<label>Email</label>
<input type="email" formControlName="email" placeholder="heroe@liga.com">
</div>

<div class="form-group">
<label>Password</label>
<input type="password" formControlName="password" placeholder="********">
</div>

<button type="submit" [disabled]="loginForm.invalid" class="btn-login">
Entrar al Sistema
</button>

<div *ngIf="errorMessage" class="error-box">
{{ errorMessage }}
</div>
</form>

<div class="login-footer">
<p>¿No tienes cuenta? <a routerLink="/user-registration">Regístrate aquí</a></p>
</div>
</div>
</div>

\*\* En el documento de login.scss, Agregar lo siguiente:
.login-page {
display: flex;
justify-content: center;
align-items: center;
height: 70vh;
}

.login-card {
background: white;
padding: 40px;
border-radius: 15px;
box-shadow: 0 15px 35px rgba(0,0,0,0.2);
width: 100%;
max-width: 400px;

.login-header {
text-align: center;
margin-bottom: 30px;
.shield-icon { font-size: 3rem; }
h2 { color: #2c3e50; margin: 10px 0; }
p { color: #7f8c8d; font-size: 0.9rem; }
}
}

.form-group {
margin-bottom: 20px;
label { display: block; margin-bottom: 5px; font-weight: bold; color: #34495e; }
input {
width: 100%;
padding: 12px;
border: 2px solid #eee;
border-radius: 8px;
&:focus { border-color: #3498db; outline: none; }
}
}

.btn-login {
width: 100%;
padding: 12px;
background: #2c3e50;
color: white;
border: none;
border-radius: 8px;
font-weight: bold;
cursor: pointer;
transition: background 0.3s;
&:hover { background: #34495e; }
&:disabled { background: #ccc; }
}

.error-box {
margin-top: 15px;
color: #e74c3c;
font-size: 0.85rem;
text-align: center;
background: #fdf2f2;
padding: 10px;
border-radius: 5px;
}

.login-footer {
margin-top: 20px;
text-align: center;
font-size: 0.9rem;
a { color: #e74c3c; text-decoration: none; font-weight: bold; }
}

\*\*En el documento: login.ts, Agregar lo siguiente:

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterOutlet,RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
selector: 'app-login',
imports: [ReactiveFormsModule,CommonModule,RouterLink],
templateUrl: './login.html',
styleUrl: './login.scss',
})

export class Login {

loginForm: FormGroup;
errorMessage: string = '';

constructor(
private fb: FormBuilder,
private authService: AuthService,
private router: Router
) {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required]]
});
}

onLogin() {
if (this.loginForm.valid) {
console.log('Formulario de login válido:', this.loginForm.value);
this.authService.login(this.loginForm.value).subscribe({
next: (res: any) => {
this.authService.setLoginData(res.nombre, res.token);
this.router.navigate(['/catalog']); // Redirigir al catálogo al entrar
},
error: (err) => {
this.errorMessage = err.error.message || 'Credenciales inválidas';
}
});
}
}
}

** Generamos los archivos para la pagina de agregar superheroe**

ng generate component pages/add-hero/add-hero.component --skip-tests –flat

\*\* En el documento: add-hero.component.html, Agregamos lo siguiente:

<div class="add-hero-container">
<div class="form-header">
<h3>🛡️ Reclutar Nuevo Defensor</h3>
</div>

<div class="main-layout">
<div class="preview-section">
<div class="preview-card">
<div class="image-container">
<img [src]="fullImagePath" alt="Vista previa">
</div>
<div class="preview-info">
<h4>{{ heroData.nombre || 'Nombre del Héroe' }}</h4>
<span>{{ heroData.poder || 'Superpoder' }}</span>
</div>
</div>
</div>

<form (ngSubmit)="onSubmit()" #heroForm="ngForm" class="hero-form">
<div class="form-group">
<label>Nombre</label>
<input type="text" [(ngModel)]="heroData.nombre" name="nombre" required>
</div>

<div class="form-row">
<div class="form-group">
<label>Superpoder</label>
<input type="text" [(ngModel)]="heroData.poder" name="poder" required>
</div>
<div class="form-group">
<label>Fortaleza</label>
<input type="text" [(ngModel)]="heroData.fortaleza" name="fortaleza" required>
</div>
</div>

<div class="form-row">
<div class="form-group">
<label>Resistencia</label>
<input type="text" [(ngModel)]="heroData.resistencia" name="resistencia" required>
</div>
<div class="form-group">
<label>Debilidad</label>
<input type="text" [(ngModel)]="heroData.debilidad" name="debilidad" required>
</div>
</div>

<div class="form-group">
<label>Seleccionar Imagen del Repositorio Local</label>
<div class="custom-file-upload">
<input type="file" #fileInput (change)="onFileSelected($event)"
accept="image/*" style="display: none;">
<button type="button" class="btn-browse" (click)="fileInput.click()">
🔍 Buscar en assets/images
</button>
<span class="file-name" *ngIf="fileNameSelected">
📄 {{ fileNameSelected }}
</span>
</div>
<small>Nota: La imagen debe existir físicamente en <code>src/assets/images/</code></small>
</div>

<button type="submit" [disabled]="!heroForm.valid" class="btn-submit">
🚀 Guardar Héroe
</button>

</form>
</div>
</div>

\*\* En el documento: add-hero.component.scss Agregamos lo siguiente:
.add-hero-container {
max-width: 900px;
margin: 2rem auto;
padding: 2rem;
background: #fff;
border-radius: 16px;
box-shadow: 0 10px 30px rgba(0,0,0,0.1);

.main-layout {
display: grid;
grid-template-columns: 1fr 1.5fr;
gap: 2rem;
align-items: start;
}

// --- SECCIÓN DE PREVISUALIZACIÓN ---
.preview-section {
.preview-card {
background: #f8f9fa;
border-radius: 12px;
overflow: hidden; // Crucial para que la imagen no se salga de las esquinas redondeadas
border: 1px solid #eee;

.image-container {
width: 100%;
height: 300px; // Altura fija para mantener la proporción de la carta
background: #e9ecef;
display: flex;
align-items: center;
justify-content: center;

img {
width: 100%;
height: 100%;
object-fit: contain; // Llena el contenedor recortando lo sobrante sin estirar
object-position: center; // Centra el recorte
display: block;
}
}

.preview-info {
padding: 15px;
text-align: center;
h4 { margin: 0; color: #2c3e50; font-size: 1.2rem; }
p { margin: 5px 0 0; color: #7f8c8d; font-size: 0.9rem; }
span { color: #3498db; font-weight: bold; font-size: 0.9rem; }
}
}
}

// --- FORMULARIO Y SELECTOR ---
.hero-form {
display: flex;
flex-direction: column;
gap: 1rem;

.form-row {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;
}

.form-group {
display: flex;
flex-direction: column;
label { font-size: 0.85rem; font-weight: bold; margin-bottom: 4px; color: #555; }
input {
padding: 10px;
border: 1.5px solid #ddd;
border-radius: 6px;
&:focus { border-color: #3498db; outline: none; }
}

.custom-file-upload {
display: flex;
align-items: center;
gap: 10px;
margin-top: 8px;

.btn-browse {
background: #34495e;
color: white;
padding: 8px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 0.8rem;
white-space: nowrap;
&:hover { background: #2c3e50; }
}

.file-name {
font-size: 0.8rem;
color: #27ae60;
font-weight: bold;
overflow: hidden;
text-overflow: ellipsis; // Si el nombre es muy largo, pone puntos suspensivos
}
}
}

.btn-submit {
margin-top: 10px;
background: #27ae60;
color: white;
padding: 12px;
border: none;
border-radius: 6px;
font-weight: bold;
cursor: pointer;
transition: background 0.2s;
&:disabled { background: #ccc; cursor: not-allowed; }
&:hover:not(:disabled) { background: #219150; }
}
}
}

@media (max-width: 768px) {
.add-hero-container {
padding: 1rem;
.main-layout { grid-template-columns: 1fr; }
}
}

\*\* En el documento: add-hero.component.ts, Agregamos lo siguiente:

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { NotifyService } from '../../services/notify.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-add-hero',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './add-hero.component.html',
styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent {
// Inicializamos el objeto con todos los campos requeridos
heroData: Heroe = {
nombre: '',
poder: '',
fortaleza: '',
resistencia: '',
debilidad: '',
imagen_url: ''
};

private heroService = inject(HeroesService);
private notify = inject(NotifyService);
private router = inject(Router);

fileNameSelected: string = '';

// Captura el nombre del archivo seleccionado
onFileSelected(event: any) {
const file: File = event.target.files[0];

if (file) {
this.fileNameSelected = file.name;
// Guardamos solo el nombre (ej: "batman.png")
this.heroData.imagen_url = file.name;
}
}

// Getter para la ruta de la imagen en la previsualización
get fullImagePath(): string {
const imageName = this.heroData.imagen_url || 'placeholder.png';
// Si la imagen es un placeholder, asumimos que está en la misma carpeta o ajusta la ruta
return `assets/images/${imageName}`;
}

onSubmit() {
this.heroService.createHero(this.heroData).subscribe({
next: () => {
this.notify.show(`¡${this.heroData.nombre} ha sido reclutado! 🛡️`, 'success');
this.router.navigate(['/dashboard']); // Ajusta según tu ruta de catálogo
},
error: (err) => {
this.notify.show('Error al registrar al héroe. Revisa los datos.', 'error');
console.error('Error en el servidor:', err);
}
});
}
}

\*\*Generamos una carpeta en nuestro proyecto Raiz SRC/APP, que se llame “guards”, dentro de esta carpeta agregar un archivo “auth.guard-guard.ts” y agregar lo siguiente:

// src/app/guards/auth.guard-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService: AuthService, private router: Router) {}

canActivate(): boolean {
if (this.authService.isLoggedIn()) {
return true; // Deja pasar al usuario
} else {
// Si no hay token, lo mandamos al login
this.router.navigate(['/login']);
return false;
}
}
}

\*\*En el documento de rutas: app.routes.ts, que esta en la ruta: “app/” ,agregamos el siguiente codigo:

import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CatalogComponent } from './pages/catalog/catalog.component'; // Importa tu componente
import { AuthGuard } from './guards/auth.guard-guard';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AddHeroComponent } from './pages/add-hero/add-hero.component';

export const routes: Routes = [

{ path: 'catalog', component: CatalogComponent }, // canActivate: [AuthGuard]
{ path: 'user-registration', component: UserRegistrationComponent },
{ path: 'add-hero', component: AddHeroComponent, canActivate: [AuthGuard] },
{ path: 'about', component: About },
{ path: 'login', component: Login },
{ path: 'favoritos', component: FavoritesComponent, canActivate: [AuthGuard] },
{ path: '\*\*', component: CatalogComponent },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
