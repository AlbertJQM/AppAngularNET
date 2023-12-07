import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { ComentarioService } from '../../services/comentario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-comentario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent implements OnInit{
  agregarComentario: FormGroup;
  accion = "Agregar";
  id = 0;
  comentario: Comentario | undefined;

  constructor(private fb: FormBuilder, 
              private comentarioService: ComentarioService, 
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required]
    })
    this.id = +this.aRoute.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {  
    this.esEditar();
  }

  esEditar(){
    if(this.id != 0){
      this.accion = "Editar";
      this.comentarioService.getComentario(this.id).subscribe({
        next: (data) => {
          this.comentario = data;
          this.agregarComentario.patchValue({
            titulo: data.titulo,
            creador: data.creador,
            texto: data.texto
          });
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

  agregarEditarComentario(){

    if(this.comentario == undefined){
      const comentario: Comentario = {
        titulo: this.agregarComentario.get('titulo')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fecha: new Date
      }
  
      this.comentarioService.postComentario(comentario).subscribe({
          next: (data) => {
            this.router.navigate(["/"]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            // Código a ejecutar cuando el observable se complete (opcional)
          }
        }
      );
    } else {
      const comentario: Comentario = {
        id: this.comentario.id,
        titulo: this.agregarComentario.get('titulo')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fecha: this.comentario.fecha
      }
      this.comentarioService.putComentario(this.id, comentario).subscribe({
        next: (data) => {
          this.router.navigate(["/"]);
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
}

