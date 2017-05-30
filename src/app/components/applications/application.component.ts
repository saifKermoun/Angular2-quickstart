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

      this.showAddAppi = false;
      this.updateShow = true;
      this.idHide = false;

      this.myForm = this.fb.group({
        id_app: [''],
        nom_app: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
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
          this.appService.addApplication(newApplication)
            .subscribe(apps => {
              this.appis.push(apps);
            });

            this.showAddAppi = false;
        }
    }

    editApp(appi: applications, isValid: boolean){
      var appis = this.appis;
      var service = this.appService;
      this.appis.forEach(function(value,index){
        if(appi.id_app == value.id_app){
          if(appi.nom_app == value.nom_app && appi.desc_app == value.desc_app && appi.src_app == value.src_app)
          {
            console.log("La meme valeur");
            console.log(appi)
            console.log('----- meme valeur -----')
          }else {

            service.updateApplication(appi, value.id_app)
              .subscribe(
                app => appis[index] = appi,
                error => console.log('Error: ' + error),
                () => console.log("L'application à bien été mis à jour")
              );
          }
        }
      });

    }

  deleteApi(i: number): void {
  var app = this.appis[i];
  var id = app.id_app;
  this.appService.deleteApplication(id)
    .subscribe(
      res => this.appis.splice(i, 1),
      error => console.log("Error", error),
      () => console.log("L'application à bien été supprimer")
    );

}
}

interface applications{
  id_app: number;
  nom_app: string;
  desc_app: string;
  src_app: string
}
