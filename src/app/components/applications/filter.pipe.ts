import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(apps: any, search?: any): any{
    if(search === undefined ) return apps;
    return apps.filter(function(app: any){
      return app.app_name.toLowerCase().includes(search.toLowerCase());
    })
  }
}
