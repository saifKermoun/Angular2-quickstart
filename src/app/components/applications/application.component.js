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
var ApplicationComponent = (function () {
    function ApplicationComponent(fb) {
        this.fb = fb;
        this.title = 'Mes Applications';
        this.events = [];
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
            app_name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            app_desc: ["", forms_1.Validators.required],
            app_src: ["", forms_1.Validators.required]
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
    ApplicationComponent.prototype.toggleAddApp = function () {
        if (this.showAddAppi == true) {
            this.showAddAppi = false;
        }
        else {
            this.showAddAppi = true;
        }
    };
    ApplicationComponent.prototype.addApi = function (appis, isValid) {
        this.submitted = true;
        if (isValid) {
            this.appis.push(appis);
        }
        console.log(appis, isValid);
    };
    ApplicationComponent.prototype.deleteApi = function (i) {
        var app = this.appis;
        app.splice(i, 1);
    };
    return ApplicationComponent;
}());
ApplicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mes-apps',
        templateUrl: "application.component.html",
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ApplicationComponent);
exports.ApplicationComponent = ApplicationComponent;
//# sourceMappingURL=application.component.js.map