import {DataModel} from './data.model';

export function genRandomData(): DataModel {
  const name: string = this.getRandomString();
  const age: number = this.getRandomNumber(10, 60);
  const loc: string = this.getRandomString();
  const married = age > 18 &&  age % 2 === 0;

  return new DataModel(name, age, loc, married);
}

export function getRandomNumber(min: number = 10, max?: number): number {
  const randomVal = Math.round((Math.random() * 10) + min);
  return (randomVal && max) && (randomVal > max) ? (randomVal % max) : randomVal  ;
}

export function getRandomString(): string {
  return Array.from({length: getRandomNumber()}, () => String.fromCharCode(Math.floor(Math.random() * 22) + 97)).join('');
}
