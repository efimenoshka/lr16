import { Pipe, PipeTransform } from '@angular/core';
import { Mworker } from '../models/mworker.model';

@Pipe({
  name: 'workerSn'
})
export class WorkerSnPipe implements PipeTransform {

  transform(workerSn: Mworker[], stringSn: string): any[] {
    if (stringSn === '' ) {
      return workerSn;
    } else {
      let arr = stringSn.split(' ');
      let surname = arr[0];
      let name = arr[1];
      if (name === '' || name == undefined) {
        let filterItems = workerSn.filter((item) => item.surname.toLowerCase().indexOf(surname.toLowerCase()) !== -1);
        return filterItems;
      } else {
        let filterSurname = workerSn.filter((item) => item.surname.toLowerCase().indexOf(surname.toLowerCase()) !== -1);
        let filterName = filterSurname.filter((item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
        return filterName;
      }
    }
  }
}