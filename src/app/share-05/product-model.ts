export class ProductModel {
  constructor(public id: number, public name: string, public sn: string) {
    this.name = this.name.slice(-10);
    this.sn = this.sn.slice(-10);
  }
}
