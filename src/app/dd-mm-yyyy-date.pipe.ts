import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ddMmYYYYDate'
})
export class DdMmYYYYDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
