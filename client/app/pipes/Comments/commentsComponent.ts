import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import {Router} from "@angular/router";
import {ClubService} from "../../_services/club.service";


/**
 * Created by pablo on 19/11/2017.
 */

@Component({
    selector: 'comments',
    moduleId: module.id,
    templateUrl: 'comment.html'
    })

export class commentsComponent implements OnInit {
    private currentUser: any;
    private username: string;
    private authenticated:boolean;
    private textComment:string;
    public comment:{userName:string, _idClub:number, textComment:string};
    public comentarios:[]=[];

    constructor(private clubService: ClubService){}

ngOnInit(){

    this.isAuthenticated();
    this.comentarios=this.clubService.obtenerComentarios();
}

  isAuthenticated(){ //verifico si hay sesion abierta
      if(localStorage.currentUser){
          this.authenticated=true;
      }
      else this.authenticated=false;
  }

    addComment(){
    this.comment.textComment = this.textComment;



    }

    private getPlayer (_id: string) {

        console.log(this.player);
        this.playerService.getById(_id).subscribe(player => {
        this.comment.userName = player.name;
        });

    }


}