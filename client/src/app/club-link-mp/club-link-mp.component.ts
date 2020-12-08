import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MercadoPagoService} from "../_services/mercado-pago.service";
import {AlertService} from "../_services";

@Component({
  templateUrl: 'ClubLinkToMP.html',
  styleUrls: ['./clubLink.css']
})

export class ClubLinkMpComponent implements OnInit{

  clubId: string;
  isAlreadyLinked: boolean;
  operationState: string;

  constructor(private mpService: MercadoPagoService, private route: ActivatedRoute, private alertService: AlertService) {}

  ngOnInit(): void {
    this.clubId = this.route.snapshot.params['id'];
    this.operationState = this.route.snapshot.queryParamMap.get('state');
    if(this.operationState !== null && this.operationState === 'success') {
      this.isAlreadyLinked = true;
      this.alertService.success('Su cuenta de Mercado Pago se ha vinculado con éxito!', true);
    } else if (this.operationState !== null && this.operationState === 'failure') {
      this.isAlreadyLinked = false;
      this.alertService.error('Ocurrió un error al vincular la cuenta de Mercado Pago, por favor intentá nuevamente más tarde.');
    }
    this.alreadyLinked();
  }

  public alreadyLinked(){
    this.mpService.accountIsAlreadyLinked(this.clubId).subscribe((res:any) => {
      this.isAlreadyLinked = res.isAlreadyLinked;
    },
      error => {
        this.alertService.error(error);
        this.isAlreadyLinked = false;
      });
  }

  linkMPAccount(){
    this.mpService.linkMPAccount(this.clubId).subscribe((res: any) => {
      window.location.href = res.authorizationURL;
    });
  }

}

