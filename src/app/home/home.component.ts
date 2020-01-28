import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[];

  constructor(private moviesService: MoviesService) {
    this.getMovies();
  }

  ngOnInit() {
  }

  getMovies(){
    this.moviesService.get().subscribe({
      next: (data: Movie[]) => {this.movies = data}, 
      error: (error) => {console.log(error); alert('Ocurrio un error')}
    });
  }

  delete(id){
    if (confirm('Estas seguro de elminar este registro ?')){
      this.moviesService.delete(id).subscribe({
        next: (data) => {alert('Eliminado con Exito'); console.log(data); this.getMovies();}, 
        error: (error) => {console.log(error); alert('Ocurrio un error')}
      });
    } else {
      
    }
    
  }

}
