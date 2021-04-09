import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plant } from '../model/plant';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private host = environment.apiUrl;

  private wishlist: number[] = [];
  private wishlistSubject = new BehaviorSubject([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http:HttpClient) { 
  }

  public getWishlist() {
    return this.http.get<any>(`${this.host}/wishlist/get`);
  }

  public addPlantToWishlist(plant: Plant): Observable<any> {
    return this.http.post<any>(`${this.host}/wishlist/add`, plant);
  }

  public deletePlantFromWishlist(plant: Plant) {
    return this.http.post<any>(`${this.host}/wishlist/delete`, plant);
  }

  public updateWishlistObservable(plantIds: number[]) {
    this.wishlist = plantIds;
    this.wishlistSubject.next(this.wishlist);
  }

}
