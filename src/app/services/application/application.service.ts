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
    return this.http.get('http://localhost:3000/users').map(res => res.json());
  }

  addApplication(newUser: Object)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user', JSON.stringify(newUser), {headers: headers})
      .map(res => res.json());
  }

  deleteApplication(id: number)
  {
    return this.http.delete('http://localhost:3000/user/'+id)
      .map(res => res.json());
  }

}
