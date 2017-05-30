import { Component  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilterPipe } from './filter.pipe'

@Component({
    moduleId: module.id,
    selector: 'mes-apps',
    templateUrl: `application.component.html`,
    styleUrls: ['application.component.css'],
})



export class ApplicationComponent  {

    public myForm: FormGroup;
    public searchAppForm: FormGroup;
    title = 'Mes Applications';
    appis:applications[];
    showAddAppi:boolean;
    public submitted: boolean;
    public events: any[] = [];
    choice: boolean;
    titleForm:string;
    updateShow: boolean;
    idHide:boolean;

    constructor(public fb: FormBuilder){
        this.showAddAppi = false;
        this.updateShow = true;
        this.idHide = false;
        this.appis = [
            {
              app_id: 1,
              app_name: "API 1",
              app_desc: "Desc 1",
              app_src: "Src 1"
            },
            {
              app_id: 2,
              app_name: "API 2",
              app_desc: "Desc 2",
              app_src: "Src 2"
            },
            {
              app_id: 3,
              app_name: "API 3",
              app_desc: "Desc 3",
              app_src: "Src 3"
            }
        ];

        this.myForm = this.fb.group({
          app_id: [''],
          app_name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
          app_desc: ["", Validators.required],
          app_src: ["", Validators.required]

        });
      this.searchAppForm = this.fb.group({
        search: ["", Validators.required]
      });



        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }


    toggleAddApp(choice:boolean,i: number)
    {
      switch(choice){
        case true:
          if(this.showAddAppi == true){
            this.showAddAppi = false;
            this.idHide = false;
          }else{
            this.titleForm = "Ajouter une application";
            this.showAddAppi = true;
            this.updateShow = true;
            this.idHide = false;
          }
          break;
        case false:
          console.log(choice);
          if(this.showAddAppi == true){
            this.showAddAppi = false;
            this.idHide = false;
            if(!this.myForm.reset()){
              this.myForm.reset();
            }
            this.updateShow = true;
          }else{
            this.titleForm = "Modifier l'application";
            this.myForm.setValue(this.appis[i]);
            this.showAddAppi = true;
            this.updateShow = false;
            this.idHide = false;
          }
          break;
        default :
          console.log('Je ne sais pas qui tu es -_-');
      }

    }

    addApi(appis: applications, isValid: boolean)
    {
        this.submitted = true;

        if(isValid)
        {
            this.appis.push(appis);
            this.showAddAppi = false;
        }
        //console.log(appis, isValid);
    }

    editApp(appi: applications, isValid: boolean)
    {
      var id: number;
      var appis = this.appis;
      id = appi.app_id;
      //console.log(appi);
      this.appis.forEach(function(element, index){
        if(element.app_id == id){
          appis[index] = appi;
        }
      });

      /*for(var i = 0; i < this.appis.length; i++)
      {
        //console.log(i);
        //console.log(this.appis[i].app_id);
        console.log(this.myForm.value.app_id);
        /!*if(this.appis[i].app_id == this.myForm.getRawValue().app_id){
          this.appis.push(this.myForm.getRawValue());
        }*!/
        /!*if(users[i].id_app == id)
        {
          users.splice(i,1);
        }*!/
      }*/

    }

    deleteApi(i: number){
        var app = this.appis;
        app.splice(i,1);
    }

    searchApp(appi: Object){

      /*var appis = this.appis;

      appis.forEach(function(element,index){

        if(element.app_name == appi.search){
          appis.push(appis[index])
        }else{
          appis.splice(index)
        }


      });*/

    }


}

interface applications{
  app_id: number,
  app_name: string,
  app_desc: string,
  app_src: string
}
