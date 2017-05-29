import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'mes-apps',
    templateUrl: `application.component.html`,
})
export class ApplicationComponent  {
    public myForm: FormGroup;
    title = 'Mes Applications';
    appis:applications[];
    showAddAppi:boolean;
    labelAddCancel: string;
    public submitted: boolean;
    public events: any[] = [];

    constructor(public fb: FormBuilder){
        this.showAddAppi = false;
        this.labelAddCancel = "Add";
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
            app_name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            app_desc: ["", Validators.required],
            app_src: ["", Validators.required]
        });

        this.subcribeToFormChanges();
    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }


    toggleAddApp()
    {
        if(this.showAddAppi == true)
        {
            this.showAddAppi = false;
        }else {

            this.showAddAppi = true;
        }

    }

    addApi(appis: applications, isValid: boolean)
    {
        this.submitted = true;

        if(isValid)
        {
            this.appis.push(appis);
        }
        console.log(appis, isValid);
    }

    deleteApi(i: number){
        var app = this.appis;
        app.splice(i,1);
    }


}

interface applications{
    app_id: number,
    app_name: string,
    app_desc: string,
    app_src: string
}