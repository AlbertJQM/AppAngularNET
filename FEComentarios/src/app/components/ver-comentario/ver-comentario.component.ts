import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../interfaces/Comentario';

@Component({
  selector: 'app-ver-comentario',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './ver-comentario.component.html',
  styleUrl: './ver-comentario.component.css'
})
export class VerComentarioComponent implements OnInit{
  id: number;
  comentario: Comentario | undefined;

  constructor(private aRoute: ActivatedRoute, private comentarioService: ComentarioService) { 
    this.aRoute.snapshot.paramMap.get("id");
    this.id = +this.aRoute.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getComentario();   
  }

  getComentario(){
    this.comentarioService.getComentario(this.id).subscribe({
        next: (data) => {
          this.comentario = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // Código a ejecutar cuando el observable se complete (opcional)
        }
      }
    );
  }
}
