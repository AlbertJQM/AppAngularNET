import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListComentariosComponent } from "./components/list-comentarios/list-comentarios.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/agregar-editar-comentario.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      ReactiveFormsModule,
      RouterOutlet,
      HttpClientModule,
      NavbarComponent,
      ListComentariosComponent,
      AgregarEditarComentarioComponent]
})
export class AppComponent {
  title = 'FEComentarios';
}
