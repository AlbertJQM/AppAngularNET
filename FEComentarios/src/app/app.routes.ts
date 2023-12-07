import { Routes, RouterModule } from '@angular/router';
import { ListComentariosComponent } from './components/list-comentarios/list-comentarios.component';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/agregar-editar-comentario.component';
import { VerComentarioComponent } from './components/ver-comentario/ver-comentario.component';

export const routes: Routes = [
    { path: '', component: ListComentariosComponent },
    { path: 'agregar', component: AgregarEditarComentarioComponent},
    { path: 'editar/:id', component: AgregarEditarComentarioComponent},
    { path: 'ver/:id', component: VerComentarioComponent},
    { path: '**', redirectTo: '/', pathMatch: 'full'}
];
