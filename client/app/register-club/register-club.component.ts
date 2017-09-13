import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
/*ng-chhips*/
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';

import { AlertService, ClubService } from '../_services/index';
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";

@Component({
    moduleId: module.id,
    templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent {
    model: any = {};
    loading = false;
    registerClubForm: FormGroup;

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService,
        private fb: FormBuilder) {
        this.createForm();
    }

    register() {
        this.loading = true;
        this.clubService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registración Exitosa', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    createForm() {
        this.registerClubForm = this.fb.group({
            user: this.fb.group({
                username: '',
                email: '',
                password: ''
            }),
            name: '',
            description: '',
            phoneNumber: '',
            address: '',
            services: [],
            profileImg: null,
            galleryImg: [],
            field: this.fb.group({
                fieldName: '',
                services: [],
                fieldImg: ''
            }),
            socialMedia: this.fb.group({
                facebookId: '',
                twitterId: '',
                instagramId: '',
                googleId: ''

            })
        });
    }

        disabled = true;
        autocompleteItems = ['Item1', 'item2', 'item3'];
    public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
            return Observable.of([
                'Asador', 'Buffet', 'Parking', 'Techado', 'Bar', 'Nocturno'
            ]);
        };

    public profileUploaded(file: FileHolder) {
        this.registerClubForm.controls['profileImg'].setValue(file);
        console.log(this.registerClubForm.controls['profileImg']);
    }

    public options = {
            readonly: false,
            placeholder: '+ Tag'
        };

    public onAdd(item: string) {
            console.log('tag added: value is ' + item);
        }

    public onRemove(item: string) {
            console.log('tag removed: value is ' + item);
        }

    public onSelect(item: string) {
            console.log('tag selected: value is ' + item);
        }

    public onFocus(item: string) {
            console.log('input focused: current value is ' + item);
        }

    public onTextChange(text: string) {
            console.log('text changed: value is ' + text);
        }

    public onBlur(item: string) {
            console.log('input blurred: current value is ' + item);
        }

    public onTagEdited(item: string) {
            console.log('tag edited: current value is ' + item);
        }

    public onValidationError(item: string) {
            console.log('invalid tag ' + item);
        }

    public transform(value: string): Observable<object> {
            const item = {display: `@${value}`, value: `@${value}`};
        return Observable.of(item);
    }

    private startsWithAt(control: FormControl) {
            if (control.value.charAt(0) !== '@') {
                return {
                    'startsWithAt@': true
                };
            }

            return null;
        }

    private endsWith$(control: FormControl) {
            if (control.value.charAt(control.value.length - 1) !== '$') {
                return {
                    'endsWith$': true
                };
            }

            return null;
        }

    private validateAsync(control: FormControl) {
            return new Promise(resolve => {
                const value = control.value;
                const result = isNaN(value) ? {
                    isNan: true
                } : null;

                setTimeout(() => {
                    resolve(result);
                }, 1);
            });
        }

    public asyncErrorMessages = {
            isNan: 'Please only add numbers'
        };

    public validators = [this.startsWithAt, this.endsWith$];

    public asyncValidators = [this.validateAsync];

    public errorMessages = {
            'startsWithAt@': 'Your items need to start with \'@\'',
            'endsWith$': 'Your items need to end with \'$\''
        };

    public onAdding(tag: string): Observable<any> {
            const confirm = window.confirm('Do you really want to add this tag?');
        return Observable
            .of(tag)
            .filter(() => confirm);
    }

    public onRemoving(tag: string): Observable<any> {
            const confirm = window.confirm('Do you really want to remove this tag?');
        return Observable
            .of(tag)
            .filter(() => confirm);
    }

    public asyncOnAdding(tag: string): Observable<any> {
            const confirm = window.confirm('Do you really want to add this tag?');
        return Observable
            .of(tag)
            .filter(() => confirm);
    }








}
