import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../interfaces/Comentario';
import { RouterModule } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule
  ],
  templateUrl: './list-comentarios.component.html',
  styleUrl: './list-comentarios.component.css'
})
export class ListComentariosComponent implements OnInit{
  listComentarios: Comentario[] = [];

  
  constructor(private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios(){
    this.comentarioService.getListComentarios().subscribe({
      next: (data) => {
        this.listComentarios = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // Código a ejecutar cuando el observable se complete (opcional)
      }
    });
  }
  
  eliminarComentario(id: any){
    this.comentarioService.deleteComentario(id).subscribe({
      next: (data) => {
        this.getComentarios();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // Código a ejecutar cuando el observable se complete (opcional)
      }
    });
  }
}
