import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { Club } from '../_models/index';
import { ClubService, BookingService } from '../_services/index';
import {DpDatePickerModule, IDatePickerDirectiveConfig} from  'ng2-date-picker';
import {Moment} from "moment";
import {ITimeSelectConfig} from "ng2-date-picker/time-select/time-select-config.model";
import {Field} from "../_models/field";
import {Booking} from "../_models/booking";
import { BookingFilter } from "../_models/bookingfilter";
import * as moment from 'moment';



@Component({
    moduleId: module.id,
    templateUrl: 'clubProfileClient.component.html'
})

export class ProfileClubClientComponent implements OnInit {

    bookingFilter : BookingFilter;
    hoursArray: string [] = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];
    horasOcupadas: string [] = [];
    horasDisponibles: string [] = [];
    club : Club ;
    galery: String [];
    selectedDate:any;
    selectedTime: any[] = [];
    NotanUser: Boolean;
    model: any = {};
    username:any    ;
    password : any;
    booking1: Booking = new Booking();
    selectedField: Field = new Field();
    date: string[] = [];
    configTime : ITimeSelectConfig = {
        minutesInterval: 60,
        minutesFormat: '00'
    };
    config: IDatePickerDirectiveConfig = {
        format: 'DD/MM/YYYY',
        enableMonthSelector: true,
        showNearMonthDays: false ,
        monthFormatter: (m: Moment): string => {
            return [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ][m.month()] +
                ', ' + m.year();
        },
        appendTo: 'body'};

    constructor(private autentication: AuthenticationService,
                private clubService: ClubService,
                private route: ActivatedRoute,
                private router: Router,
                private alertService: AlertService,
                private bookingService: BookingService
    ) {    }


    ngOnInit(): void{
    console.log(moment().format());

        this.getClub(this.route.snapshot.params['id']);

    }

        private getClub (_id: string) {
        this.clubService.getResultById(_id).subscribe(club => {
            this.club = club;
         this.galery = club.galleryImg;
     });

    }


    reservar(e:any, i: any){

        //if (this.autentication.isAuthenticated()){
        if(localStorage.currentUser){

            this.NotanUser =false ;

            if(e!=null){

               // console.lo

                this.booking1.field=e;
                this.booking1.club=this.club;
                this.booking1.dateBook=this.date[i];
                this.booking1.timeBook=this.selectedTime[i];

                if(ClubService.guardarBooking(this.booking1)){
                    console.log(this.booking1);
                    this.router.navigate(['confirmation'])
                }

            }

        }

    else {
            this.NotanUser = true;
           console.log("No esa autenticado")
        }

    }

    login(field:any, index: any) {
    console.log('ENTRA AL MODAL DE MODAL');
        console.log(field, index);

        this.autentication.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.reservar(field, index);
                },
                error => {
                    this.alertService.error(error);

                });
    }

    public makeHoursArray() {
        console.log("Entra al makeHoursArray");
        this.bookingService.findAllHoursBookings().subscribe(hoursBooking => {
            console.log(hoursBooking);
        });       
    }

    mostrameLasReservas() {
        //this.crearFiltros(this.idField,this.playingDate);
        console.log("1- Entró al mostrame las reservas. ");
        this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
            .subscribe(hoursBooking => {
                console.log("Ultimo- Lo que retorna la consulta: " + hoursBooking.playingTime);
        });
    }

    public crearFiltros(idField:string, playingDate:string): BookingFilter {
        console.log("1.A- Entra al crear filtros");
        return new BookingFilter(
        )
    }

    loadHoursValues(date:any, field) {
        console.log('la fecha: '+date);
        console.log(field);
        const parts : any = date.split("/");

        const fieldDate = new Date(parts[2],parts[1]-1,parts[0]);
            console.log('dateObject '+fieldDate);
        //console.log("El selectedDate: " + this.date);   
        //console.log("El selectedDate: " + this.selectedField._id);   

        this.selectedField = field;
        this.bookingFilter = new BookingFilter(this.selectedField._id, fieldDate);

        console.log("El selectedDate: " + this.bookingFilter);   

        this.bookingService.findAllBookingsByFieldAndDay(this.bookingFilter)
            .subscribe(hoursBooking => {
                if(hoursBooking.length >=1){
                     hoursBooking.forEach((booking, index)=>{
                        console.log(booking);
                        console.log("Ultimo- Lo que retorna la consulta: " + booking.playingTime);
                        this.horasOcupadas.push(booking.playingTime);
                        
                        this.horasDisponibles = this.hoursArray.filter(item => this.horasOcupadas.indexOf(item) < 0);
                        console.log("Array nuevo: " + this.horasDisponibles);


                    });  
                } else {
                        this.horasDisponibles = this.hoursArray;
                            console.log('No hay reservas en este día');
                        }                          
            });
            
    }

}