export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public profileImageUrl: string;
  public password: string;
  public wishlist: [] = [];
  public ownlist: [] = [];
  public roles: string[] = [];
  public authorities: [] = [];

  public isActive: boolean;
  public isNotLocked: boolean;

  constructor() {
    this.firstName='';
    this.lastName='';
    this.username='';
    this.password = '';
    this.email='';
    this.profileImageUrl='';
    this.wishlist = [];
    this.ownlist = [];
    this.roles= [];
    this.authorities=[];
  }
}