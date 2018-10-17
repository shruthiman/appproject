import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Movie } from './movie';

@Injectable()
export class MoviesService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '68b4fe2a513155a58dd0af4adacb281b';
  private language;
  private endDate: any;
  private startDate: any;

  constructor(private http: Http) {
    this.language = 'en';
  }

  getMovies(): Observable<Movie[]> {
    let moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${this.language}`;

    return this.http.get(moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNowPlayingMovies(): Observable<Movie[]> {
    const cd = new Date();
    const endDate = this.getCurrentDate(cd);
    const startDate = this.getCurrentDate(cd);

    let moviesUrl = `${this.discoverUrl}?api_key=${this.apiKey}&language=${this.language}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`;

    return this.http.get(moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchMovies(query: string) {
    let searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}&query=${query}`;

    return this.http.get(searchUrl)
      .map((res) => { return res.json() })
  }

  getDetails(id: number) {
    let detailsUrl = `${this.url}${id}?api_key=${this.apiKey}&language=${this.language}`;

    return this.http.get(detailsUrl)
      .map((res) => { return res.json() })
  }


  getLanguage() {
    return this.language;
  }

  getCurrentDate(date: Date) {
    let today: any = new Date(date);
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    let yyyy: any = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return today = yyyy + '-' + mm + '-' + dd;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.results || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
