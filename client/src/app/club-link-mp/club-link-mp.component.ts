import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MercadoPagoService} from "../_services/mercado-pago.service";

@Component({
  templateUrl: 'ClubLinkToMP.html',
  styleUrls: ['./clubLink.css']
})

export class ClubLinkMpComponent implements OnInit{

  clubId: string;
  isAlreadyLinked: boolean;

  constructor(private mpService: MercadoPagoService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // trate de ver si ya esta asociado
    this.clubId = this.route.snapshot.params['id'];
  }

  linkMPAccount(){
    this.mpService.linkMPAccount(this.clubId).subscribe((res: any) => {
      window.location.href = res.authorizationURL;
    });
  }

}

