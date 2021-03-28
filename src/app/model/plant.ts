import { Family } from "./family";

export class Plant {

  public id: number;
  public name: string;
  public amountOfWater: string;
  public amountOfLight: string;
  public needsSpraying: boolean;
  public remarks: Text;
  public family: Family;
  public headerImageUrl: string;
  public profileImageUrl: string;
  
  constructor(id:number,name:string,amountOfWater: string, amountOfLight: string,
    needsSpraying: boolean, remarks: Text, family:Family ) {
      this.id = id;
      this.name= name;
      this.amountOfWater=amountOfWater;
      this.amountOfLight=amountOfLight;
      this.needsSpraying=needsSpraying;
      this.remarks=remarks;
      this.family=family;
    }

}