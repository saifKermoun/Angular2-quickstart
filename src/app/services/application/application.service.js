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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ApplicationService = (function () {
    function ApplicationService(http) {
        this.http = http;
        console.log('UserService Initialized...');
    }
    ApplicationService.prototype.getApplications = function () {
        return this.http.get('http://localhost:3005/apps').map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.addApplication = function (newApp) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3005/apps', JSON.stringify(newApp), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.deleteApplication = function (id) {
        return this.http.delete('http://localhost:3005/apps/' + id)
            .map(function (res) { return res.json(); });
    };
    ApplicationService.prototype.updateApplication = function (newApp, id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3005/apps/' + id, JSON.stringify(newApp), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return ApplicationService;
}());
ApplicationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApplicationService);
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map