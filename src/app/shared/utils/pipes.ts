import {Pipe, PipeTransform } from '@angular/core';
import {Util} from "./util";
import * as moment from 'moment';

@Pipe({
   name: 'date'
})

export class DatePipe implements PipeTransform {
  transform(value: any, format: string = ''): string {
  // Try and parse the passed value.
  const momentDate = moment(value);

  // If moment didn't understand the value, return it unformatted.
  if (!momentDate.isValid()) {
    return value;
  }

  // Otherwise, return the date formatted as requested.
  return momentDate.format(format);
}
}


@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], args : any[], val : any): any[] {
        let fields : string[];
        let value : string;

        if(args){
            fields= args;
            value = val;
        }
        if (!items) return [];
        //  if(!value || value.length < 3) return [];
        return items.filter(it =>
            {   
                if(  typeof(value) != 'string') return;
                if(value && value != ""){
                    for(let item of fields){
                        if(item.indexOf('.') > 0 ){
                             let splitItems = item.split('.');
                             if(splitItems.length == 2){
                                if(it[splitItems[0]][splitItems[1]].toString().toLowerCase().indexOf(value.toLowerCase()) > -1){
                                    return true;
                                  }
                             } else {
                                 return true;
                             }
                            // if(it[splitItems[0]] === 'Object'){

                        } else {
                            if(it[item] && it[item].toString() && it[item].toString().toLowerCase().indexOf(value.toLowerCase()) > -1){
                                return true;
                            }
                        }


                    }
                } else {
                    return true;
                }
                return false;

            }
        ) ;
    }
}
@Pipe({name: 'keyvalues'})
export class KeyValuesPipe implements PipeTransform {
  transform(items: any[], args:string[]) : any {
    let keys: any[] = [];
    let item : string = "";
    for (item in items) {
      keys.push( {key: item, value: items[item]});
    }
    return keys;
  }
}

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
    transform(value : any, args : any) {
        if (!value) {
            value = 0.00;
        }
        var sign = "";
        if(args && args[0]){
            sign = args[0];
        } else {
            sign = sessionStorage.getItem("CurrencySign");
            if(!sign){
                sign="\u0024"
            }
        }
        var p = value.toFixed(2).split(".");

        return  sign+p[0].split("").reverse().reduce(function(acc: any, num: any, i : any, orig: any) {
                return  num + (i && !(i % 3) ? "," : "") + acc;
            }, "") + "." + p[1];
    }
}

@Pipe({ name: 'decodeURI' })
export class DecodeURIPipe implements PipeTransform {
    transform(value : any, args : any) {
        if (!value || value == "") {
            value = "";
        } else {
            value =decodeURIComponent(value.replace(/\+/g,  " "));
        }
        return value;
    }
}
// @Pipe({ name: 'date' })
// export class DatePipe implements PipeTransform {
//     transform(value : any, args : any) {
//         return Util.DateFormate(value);
//     }
// }
@Pipe({ name: 'datetime' })
export class DateTimePipe implements PipeTransform {
    transform(value : any, args : any) {
        return Util.DateTimeFormate(value);
    }
}
@Pipe({ name: 'flag' })
export class FlagPipe implements PipeTransform {
    transform(value : any, args: any) {
        return value ? 'Active' : 'De-active';
    }
}

