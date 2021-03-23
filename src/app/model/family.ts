import { Plant } from "./plant";

export class Family {
  public id: number;
  public name: string;
  public plants: Plant[];

  constructor(id: number, name: string, plants: Plant[]) {
    this.id = id;
    this.name= name;
    this.plants= plants;
  }
}