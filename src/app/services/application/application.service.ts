import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {
  constructor(private http: Http){
    console.log('UserService Initialized...')
  }

  getApplications()
  {
    return this.http.get('http://localhost:3005/apps').map(res => res.json());
  }

  addApplication(newApp: Object)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3005/apps', JSON.stringify(newApp), {headers: headers})
      .map(res => res.json());
  }

  deleteApplication(id: number)
  {
    return this.http.delete('http://localhost:3005/apps/'+id)
      .map(
        res => res.json()
      );
  }

  updateApplication(newApp: Object,id: number){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3005/apps/'+id, JSON.stringify(newApp), {headers: headers})
      .map(
        res => res.json()
      );
  }

}
