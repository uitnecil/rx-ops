import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asArray'
})
export class IsArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value instanceof Array) {
      return `[ ${value.join(', ')} ]`;
    }
  }

}
