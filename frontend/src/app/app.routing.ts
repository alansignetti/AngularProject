// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes a los cuales les quiero hacer una page exclusiva
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormComponent } from './components/form/form.component';
import { MoviesComponent } from './components/movies/movies.component';
import { PageComponent } from './components/page/page.component';
import { ErrorComponent } from './components/error/error.component';

// Array de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'form', component: FormComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'page', component: PageComponent},
    {path: 'page/:name/:lastName', component: PageComponent},
    {path: '**', component: ErrorComponent}

];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
