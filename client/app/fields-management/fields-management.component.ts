// import {Component, OnInit} from "@angular/core";
//
// @Component({
//     moduleId: module.id,
//     templateUrl: 'fields-managment.component.html',
// })
// export class FieldsManagmentComponent implements OnInit{
//     viewDate: Date = new Date();
//     events = [];
//     ngOnInit(){}
// }

import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent ,CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { BookingService } from "../_services/booking.service";
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ClubService } from "../_services/club.service";
import { AlertService } from "../_services/alert.service";

const colors: any = {
    red: {
        primary: '#C11B17',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#2B65EC',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    },
    green: {
        primary: '#009900',
        secondary: '#ccffcc'
    },
    lightgreen:{
        primary: '#F87217',
        secondary: '#fffbe2'

    }
};

@Component({
    selector: 'mwl-demo-component',
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    //styleUrls: ['styles.css'],
    templateUrl: 'fields-management.component.html',
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})

export class FieldsManagementComponent implements OnInit{

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';
    locale: string = 'es';
    viewDate: Date = new Date();
    selectedStatus: string;
    modalData: {
        action: string;
        event: CalendarEvent;
    };
    events: CalendarEvent[] = [];
    bookings : any[] = [];
    club : any = {};
     _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
    private montoPagado:Number;

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    // events: CalendarEvent[] = [
    //     {
    //         start: subDays(startOfDay(new Date()), 1),
    //         end: addDays(new Date(), 1),
    //         title: 'A 3 day event',
    //         color: colors.red,
    //         actions: this.actions
    //     },
    //     {
    //         start: startOfDay(new Date()),
    //         end: startOfDay(new Date()),
    //         title: 'An one day event',
    //         color: colors.yellow,
    //         actions: this.actions
    //     },
    //     {
    //         start: subDays(endOfMonth(new Date()), 3),
    //         end: addDays(endOfMonth(new Date()), 3),
    //         title: 'A long event that spans 2 months',
    //         color: colors.blue
    //     },
    //     {
    //         start: addHours(startOfDay(new Date()), 2),
    //         end: new Date(),
    //         title: 'A draggable and resizable event',
    //         color: colors.yellow,
    //         actions: this.actions,
    //         resizable: {
    //             beforeStart: true,
    //             afterEnd: true
    //         },
    //         draggable: true
    //     }
    // ];

    activeDayIsOpen: boolean = false;

    constructor(private modal: NgbModal,
    private bookingService: BookingService,
    private clubService: ClubService, private alertService: AlertService) {}


    ngOnInit(){
        this.getBookings(this._id);
        //this.getBookingsByStatus(this._id, "Cancelado");
        this.getClub(this._id);

    }

    private getClub (_id: string) {
        this.clubService.getById(_id);
    }

    private getBookingsByStatus(_id: string, bookingStatus: string){
        this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
            this.bookings = bookings;
            const eventArray :CalendarEvent[] = [];
            this.bookings.forEach((booking) => {
                if (booking.status == bookingStatus) {

                    let colorStatus: any;
                    switch (booking.status){

                        case 'Reservado':
                            colorStatus= colors.blue;
                            break;
                        case 'Cancelado':
                            colorStatus = colors.red;
                            break;
                        case 'Asistido':
                            colorStatus = colors.green;
                            break;
                        case 'Pendiente de Pago':
                            colorStatus = colors.yellow;
                            break;
                        default:
                            colorStatus = colors.yellow;
                            break;
                    }
                    //console.log(colorStatus);
                    let event = {
                        start: startOfDay(booking.playingDate),
                        end: startOfDay(booking.playingDate),
                        title: booking.field.fieldName + ' Horario: '+booking.playingTime+' Cliente: '+booking.player.name+' '+booking.player.lastName,
                        color: colorStatus,
                        actions: this.actions,
                        booking: booking

                    };
                    eventArray.push(event);

                }
            });
                this.events = eventArray;
                if(this.events) {
                    this.refresh.next();
                }
            console.log(this.events);
        });
    }

    private getBookings(_id: string){
        this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
            this.bookings = bookings;
            const eventArray :CalendarEvent[] = [];
            this.bookings.forEach((booking) => {
                let colorStatus: any;
                switch (booking.status){

                    case 'Pago Parcial':
                        colorStatus= colors.blue;
                        break;
                    case 'Cancelado':
                        colorStatus = colors.red;
                        break;
                    case 'Asistido':
                        colorStatus = colors.green;
                        break;
                    case 'Pendiente de Pago':
                        colorStatus = colors.yellow;
                        break;
                    case 'Pago Total':
                        colorStatus = colors.lightgreen;
                        break;
                    default:
                        colorStatus = colors.yellow;
                        break;
                }
                //console.log(colorStatus);
                let event = {
                    start: startOfDay(booking.playingDate),
                    end: startOfDay(booking.playingDate),
                    title: booking.field.fieldName + ' Horario: '+booking.playingTime+' Cliente: '+booking.player.name+' '+booking.player.lastName,
                    color: colorStatus,
                    actions: this.actions,
                    booking: booking,


                };
                eventArray.push(event);
            });
                this.events = eventArray;
                if(this.events) {
                    this.refresh.next();
                }
            console.log(this.events);
        });

    }

    onStatusChange(newStatus) {
        console.log(newStatus);
        this.selectedStatus = newStatus;
    }



    closeResult: string;
    // open(content) {
    //     this.modal.open(content)
    // }
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }


    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        console.log(event);
        this.montoPagado = (event as any).booking.payment.fee;
        this.modal.open(this.modalContent, { size: 'lg' }).result.then((result) => {
            console.log(this.selectedStatus);


            if (this.selectedStatus || this.montoPagado) {
                this.closeResult = result;
                let newStatus: any = {};
                newStatus.bookingId = result._id;

                if(this.selectedStatus){
                    newStatus.status = this.selectedStatus;
                }

                if(this.montoPagado){
                    newStatus.fee=this.montoPagado;
                }

                this.bookingService.updateBookingStatus(newStatus).subscribe((data) => {
                    this.selectedStatus = undefined;
                    this.montoPagado = undefined;

                    this.alertService.success('Se actualizó correctamente el estado de la reserva', false);
                    this.getBookings(this._id);
                    //this.getBookingsByStatus(this._id, "Cancelado");
                    console.log(this.selectedStatus);
                }, error => {
                    this.alertService.error('el error q viene de backend '+error);
                });
            }
        });
    }

    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }

    filterbyStatusChange(status: string):void {
        console.log("Entra al status change con status " + status);
        if (status == "Todas" || status == "") {
            this.getBookings(this._id);
        } else {
            this.getBookingsByStatus(this._id, status);
        }
    }

    filterByFieldName(fieldName: string):void {
        console.log("Entra al status change con fieldName " + fieldName);
        if (fieldName == "Todas" || fieldName == "") {
            this.getBookings(this._id);
        }
    }
}
