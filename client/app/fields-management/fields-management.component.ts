import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Injectable} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent ,CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { BookingService } from "../_services/booking.service";
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ClubService } from "../_services/club.service";
import { AlertService } from "../_services/alert.service";
import {BookingFilter} from "../_models/bookingfilter";
import {Moment} from "moment";
import {IDatePickerDirectiveConfig} from "ng2-date-picker";
import {Field} from "../_models/field";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const I18N_VALUES = {
    'es': {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    }
    // other languages you would support
};
// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
    language = 'es';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }
}

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

        },
        I18n,
        {provide: NgbDatepickerI18n,
            useClass: CustomDatepickerI18n}
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
    private montoPagado : number;
    //horas
    hoursArray: string [] = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];
    horasOcupadas: string [] = [];
    horasDisponibles: string [] = [];
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
    selectedField: Field = new Field();
    bookingFilter : BookingFilter;
    date: string;
    fieldIndex: number;
    fieldDropdown: any;
    nuevaReservaForm: FormGroup;



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

    activeDayIsOpen: boolean = false;

    constructor(private modal: NgbModal,
    private bookingService: BookingService,
    private clubService: ClubService, private alertService: AlertService,
    private fb: FormBuilder) {}
    ngOnInit(){
        this.getBookings(this._id);
        //this.getBookingsByStatus(this._id, "Cancelado");
        this.getClub(this._id);
        this.createForm();

    }

    private getClub (_id: string) {
        this.clubService.getById(_id).subscribe((club) => {
            this.club = club;
            this.nuevaReservaForm.get('clubAddress').setValue(this.club.address.address);
            this.nuevaReservaForm.get('clubName').setValue(this.club.name);
            this.nuevaReservaForm.get('clubId').setValue(this.club._id);
            this.nuevaReservaForm.get('clubPhoneNumber').setValue(this.club.phoneNumber);

        });
    }

    createForm () {
        this.nuevaReservaForm = this.fb.group({
            playerName: [null, Validators.required],
            playerLastName: [null, Validators.required],
            playerPhoneNumber: [null, Validators.required],
            clubId: [null, Validators.required],
            clubName: [null, Validators.required] ,
            clubAddress: [null, Validators.required],
            clubPhoneNumber: [null, Validators.required],
            fieldId: [null, Validators.required],
            fieldName: [null, Validators.required],
            fieldCantPlayers:[null, Validators.required],
            fieldPrice: [null, Validators.required],
            playingDate: [null, Validators.required],
            playingTime: [null, Validators.required],
            fee: null,
            status: null

        });
    }

    // private getBookingsByStatus(_id: string, bookingStatus: string){
    //     this.bookingService.findAllByReferenceId(_id).subscribe((bookings)=>{
    //         this.bookings = bookings;
    //         const eventArray :CalendarEvent[] = [];
    //         this.bookings.forEach((booking) => {
    //             if (booking.status == bookingStatus) {
    //
    //                 let colorStatus: any;
    //                 switch (booking.status){
    //
    //                     case 'Reservado':
    //                         colorStatus= colors.blue;
    //                         break;
    //                     case 'Cancelado':
    //                         colorStatus = colors.red;
    //                         break;
    //                     case 'Asistido':
    //                         colorStatus = colors.green;
    //                         break;
    //                     case 'Pendiente de Pago':
    //                         colorStatus = colors.yellow;
    //                         break;
    //                     default:
    //                         colorStatus = colors.yellow;
    //                         break;
    //                 }
    //                 //console.log(colorStatus);
    //                 let event = {
    //                     start: startOfDay(booking.playingDate),
    //                     end: startOfDay(booking.playingDate),
    //                     title: booking.field.fieldName + ' Horario: '+booking.playingTime+' Cliente: '+booking.player.name+' '+booking.player.lastName,
    //                     color: colorStatus,
    //                     actions: this.actions,
    //                     booking: booking
    //
    //                 };
    //                 eventArray.push(event);
    //
    //             }
    //         });
    //             this.events = eventArray;
    //             if(this.events) {
    //                 this.refresh.next();
    //             }
    //         console.log(this.events);
    //     });
    // }

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
            console.log(result);


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
        let registrado: Boolean;
        if(this.nuevaReservaForm.valid) {
            this.clubService.guardarReserva(this.nuevaReservaForm.value)
                .subscribe(
                    data => {
                        this.nuevaReservaForm.get('fieldId').setValue(null);
                        this.nuevaReservaForm.get('fieldName').setValue(null);
                        this.nuevaReservaForm.get('fieldCantPlayers').setValue(null);
                        this.nuevaReservaForm.get('fieldPrice').setValue(null);
                        this.nuevaReservaForm.get('playingDate').setValue(null);
                        this.nuevaReservaForm.get('fee').setValue(null);
                        this.nuevaReservaForm.get('status').setValue(null);
                        this.nuevaReservaForm.get('playingTime').setValue(null);
                        this.nuevaReservaForm.get('playerName').setValue(null);
                        this.nuevaReservaForm.get('playerLastName').setValue(null);
                        this.nuevaReservaForm.get('playerPhoneNumber').setValue(null);





                        this.refresh.next();

                    },
                    error => {
                        this.alertService.error(error);

                    });

        }

    }

//     filterbyStatusChange(status: string):void {
//         console.log("Entra al status change con status " + status);
//         if (status == "Todas" || status == "") {
//             this.getBookings(this._id);
//         } else {
//             this.getBookingsByStatus(this._id, status);
//         }
//     }
//
//     filterByFieldName(fieldName: string):void {
//         console.log("Entra al status change con fieldName " + fieldName);
//         if (fieldName == "Todas" || fieldName == "") {
//             this.getBookings(this._id);
//         }
//     }

    loadHoursValues(date:any) {
        console.log('la fecha: '+date);
        const parts : any = date.split("/");

        const fieldDate = new Date(parts[2],parts[1]-1,parts[0]);
        console.log('dateObject '+fieldDate);
        this.nuevaReservaForm.get('playingDate').setValue(fieldDate.toISOString());
        this.bookingFilter = new BookingFilter(this.nuevaReservaForm.controls['fieldId'].value, fieldDate);

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

    setFieldValues (field: any) {
        //this.fieldIndex = i;
        console.log(field);
        this.nuevaReservaForm.get('fieldId').setValue(field._id);
        this.nuevaReservaForm.get('fieldName').setValue(field.fieldName);
        this.nuevaReservaForm.get('fieldCantPlayers').setValue(field.cantPlayers);
        this.nuevaReservaForm.get('fieldPrice').setValue(field.price);

    }
 }
