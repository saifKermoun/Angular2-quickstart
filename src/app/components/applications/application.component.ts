import { Component  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { ApplicationService } from '../../services/application/application.service';

@Component({
  moduleId: module.id,
  selector: 'mes-apps',
  templateUrl: `application.component.html`,
  styleUrls: ['application.component.css'],
  providers: [ApplicationService]
})



export class ApplicationComponent {
    appis:applications[];
    public myForm: FormGroup;
    public searchAppForm: FormGroup;
    title = 'Mes Applications';
    showAddAppi:boolean;
    public submitted: boolean;
    public events: any[] = [];
    choice: boolean;
    titleForm:string;
    updateShow: boolean;
    idHide:boolean;

    constructor(public fb: FormBuilder, public appService: ApplicationService){
      this.appService.getApplications().subscribe(
        appis => { this.appis = appis}
      );
      console.log(event.type)
      this.showAddAppi = false;
      this.updateShow = true;
      this.idHide = false;

      this.myForm = this.fb.group({
        id_app: [''],
        name_app: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
        desc_app: ["", Validators.required],
        src_app: ["", Validators.required]

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

    toggleAddApp(choice:boolean,i: number){
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

    addApi(appis: applications, isValid: boolean){
      var newApplication = {
        nom_app: appis.nom_app,
        desc_app: appis.desc_app,
        src_app: appis.src_app
      };

        this.submitted = true;

        if(isValid)
        {
          this.userService.addUser(newUser)
            .subscribe(apps => {
              this.appis.push(apps);

            });
            this.appis.push(appis);
            this.showAddAppi = false;
        }
    }

    editApp(appi: applications, isValid: boolean){
      var id: number;
      var appis = this.appis;
      id = appi.id_app;
      //console.log(appi);
      this.appis.forEach(function(element, index){
        if(element.id_app == id){
          appis[index] = appi;
        }
      });
    }

    deleteApi(i: number){
        var app = this.appis;
        app.splice(i,1);
    }
}

interface applications{
  id_app: number;
  nom_app: string;
  desc_app: string;
  src_app: string
}
