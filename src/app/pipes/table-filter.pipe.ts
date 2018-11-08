import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
    transform(items: any, filter: any, defaultFilter: boolean): any {
        if (!filter) {
            return items;
        }

        if (!Array.isArray(items)) {
            return items;
        }
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            if (defaultFilter) {
                return items.filter(item =>
                    filterKeys.reduce((x, keyName) =>
                        (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
            }
            else {
                return items.filter(item => {
                    return filterKeys.some((keyName) => {
                        let  value = this.fetchFromObject(item,keyName)
                        return new RegExp(filter[keyName], 'gi').test(value) || filter[keyName] == "";
                    });
                });
            }
        }
    }

    private fetchFromObject(obj: any, prop: any): any {
        //property not found
        if(typeof obj === 'undefined') return false;
        
        //index of next property split
        var _index = prop.indexOf('.')
    
        //property split found; recursive call
        if(_index > -1){
            //get object at property (before split), pass on remainder
            return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
        }
        //no split; get property
        return obj[prop];
    }
}