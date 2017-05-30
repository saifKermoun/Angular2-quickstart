"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var application_service_1 = require("../../services/application/application.service");
var ApplicationComponent = (function () {
    function ApplicationComponent(fb, appService) {
        var _this = this;
        this.fb = fb;
        this.appService = appService;
        this.title = 'Mes Applications';
        this.events = [];
        this.appService.getApplications().subscribe(function (appis) { _this.appis = appis; });
        this.showAddAppi = false;
        this.updateShow = true;
        this.idHide = false;
        this.myForm = this.fb.group({
            id_app: [''],
            nom_app: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            desc_app: ["", forms_1.Validators.required],
            src_app: ["", forms_1.Validators.required]
        });
        this.searchAppForm = this.fb.group({
            search: ["", forms_1.Validators.required]
        });
        this.subcribeToFormChanges();
    }
    ApplicationComponent.prototype.subcribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.myForm.statusChanges;
        var myFormValueChanges$ = this.myForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    ApplicationComponent.prototype.toggleAddApp = function (choice, i) {
        switch (choice) {
            case true:
                if (this.showAddAppi == true) {
                    this.showAddAppi = false;
                    this.idHide = false;
                }
                else {
                    this.titleForm = "Ajouter une application";
                    this.showAddAppi = true;
                    this.updateShow = true;
                    this.idHide = false;
                }
                break;
            case false:
                if (this.showAddAppi == true) {
                    this.showAddAppi = false;
                    this.idHide = false;
                    if (!this.myForm.reset()) {
                        this.myForm.reset();
                    }
                    this.updateShow = true;
                }
                else {
                    this.titleForm = "Modifier l'application";
                    this.myForm.setValue(this.appis[i]);
                    this.showAddAppi = true;
                    this.updateShow = false;
                    this.idHide = false;
                }
                break;
            default:
                console.log('Je ne sais pas qui tu es -_-');
        }
    };
    ApplicationComponent.prototype.addApi = function (appis, isValid) {
        var _this = this;
        var newApplication = {
            nom_app: appis.nom_app,
            desc_app: appis.desc_app,
            src_app: appis.src_app
        };
        this.submitted = true;
        if (isValid) {
            this.appService.addApplication(newApplication)
                .subscribe(function (apps) {
                _this.appis.push(apps);
            });
            this.showAddAppi = false;
        }
    };
    ApplicationComponent.prototype.editApp = function (appi, isValid) {
        var appis = this.appis;
        var service = this.appService;
        this.appis.forEach(function (value, index) {
            if (appi.id_app == value.id_app) {
                if (appi.nom_app == value.nom_app && appi.desc_app == value.desc_app && appi.src_app == value.src_app) {
                    console.log("La meme valeur");
                    console.log(appi);
                    console.log('----- meme valeur -----');
                }
                else {
                    service.updateApplication(appi, value.id_app)
                        .subscribe(function (app) { return appis[index] = appi; }, function (error) { return console.log('Error: ' + error); }, function () { return console.log("L'application à bien été mis à jour"); });
                }
            }
        });
    };
    ApplicationComponent.prototype.deleteApi = function (i) {
        var _this = this;
        var app = this.appis[i];
        var id = app.id_app;
        this.appService.deleteApplication(id)
            .subscribe(function (res) { return _this.appis.splice(i, 1); }, function (error) { return console.log("Error", error); }, function () { return console.log("L'application à bien été supprimer"); });
    };
    return ApplicationComponent;
}());
ApplicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mes-apps',
        templateUrl: "application.component.html",
        styleUrls: ['application.component.css'],
        providers: [application_service_1.ApplicationService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, application_service_1.ApplicationService])
], ApplicationComponent);
exports.ApplicationComponent = ApplicationComponent;
//# sourceMappingURL=application.component.js.map