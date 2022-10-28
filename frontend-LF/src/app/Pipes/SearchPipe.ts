import { Pipe, PipeTransform } from '@angular/core';
import {Item} from "../models/item";

@Pipe({
  name: 'filtered'
})
export class SearchPipe implements PipeTransform{
  transform(value: Item[], filterString: string) {
    if (value.length === 0) {
      return value;
    }
    if (filterString === null) {
      console.log("No data entered")
      return value;
    }
    const lists = [];
    for(const list of value) {
      if (list.name.toLowerCase().includes(filterString?.toLowerCase())) {
        lists.push(list);
      }
    }
    return lists;
  }
}
