import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies/movies.service';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  holder: string;
  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.holder = 'what are you looking for?';
    this.sticky();
  }

  sticky() {
    $('#search').visibility({
      type: 'fixed',
      once: true,
      transition: {
        animation: 'fade in',
        duration: '1s',
      }
    });
  }

  search(query: string) {
    if (/\S/.test(query)) {
      this.router.navigate(['/search', query]);
    }
  }

}
