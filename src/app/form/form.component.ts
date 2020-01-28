import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  movie: Movie = {
    name:  null,
    year:  null,
    description: null,
    duration: null,
    gender: null,
  };

  id: any;
  editing: boolean = false;ç
  movies: Movie[];

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.editing = true;
      this.moviesService.get().subscribe({
        next: (data: Movie[]) => {
          this.movies = data; 
          this.movie = this.movies.find((m) => {return m.id == this.id});
          console.log(this.movie);
        }, 
        error: (error) => {console.log(error); alert('Ocurrio un error')}
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit() {
  }

  saveMovie(){
    if (this.editing) {
      this.moviesService.put(this.movie).subscribe({ 
        next: (data) => {alert('Película Actualizada'); console.log(data)}, 
        error: (error) => {console.log(error); alert('Ocurrio un error')}
      });
    } else {
      this.moviesService.save(this.movie).subscribe({ 
        next: (data) => {alert('Película Guardada'); console.log(data)}, 
        error: (error) => {console.log(error); alert('Ocurrio un error')}
      });
    }
    
  }

}
