export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public profileImageUrl: string;
  public wishlist: [];
  public role: [];
  public authorities: [];

  public isActive: boolean;
  public isNotLocked: boolean;

  constructor() {
    this.firstName='';
    this.lastName='';
    this.username='';
    this.email='';
    this.profileImageUrl='';
    this.wishlist = [];
    this.role= [];
    this.authorities=[];
  }
}