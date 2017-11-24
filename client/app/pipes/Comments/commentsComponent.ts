import { Component, OnInit } from '@angular/core';
import {ClubService} from "../../_services/club.service";
import {Club} from "../../_models/club";
import {UserService} from "../../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../_models/Comment";
import {CommentService} from "../../_services/comment.service";



/**
 * Created by pablo on 19/11/2017.
 */

@Component({
    selector: 'comments',
    moduleId: module.id,
    templateUrl: 'comment.html'
    })

export class commentsComponent implements OnInit {

    private authenticated:boolean;
    private textComment:string="";
    public comment:Comment = new Comment();
    public clubComentarios:Comment[]=[];
    private club: Club;
    private userName:"";

    constructor(private clubService: ClubService, private  userService:UserService,
                private route: ActivatedRoute, private commentService : CommentService){}

ngOnInit(){

    this.isAuthenticated();
    this.getComentarios();
    this.getClub(this.route.snapshot.params['id']);
   }


    private getClub (_id: string) {
    this.clubService.getResultById(_id).subscribe(club => {this.club = club;});
    }

    private getComentarios(){
    console.log(this.route.snapshot.params['id']);
        this.commentService.findAllCommentForAClub(this.route.snapshot.params['id']).subscribe((comments)=>{
            this.clubComentarios = comments;
        console.log(comments)});
    }


  isAuthenticated(){ //verifico si hay sesion abierta
      if(localStorage.currentUser){
          this.authenticated=true;
         // const _id: string = JSON.parse(localStorage.getItem('currentUser')).playerOrClubId;
         // this.getUser(_id);
      }
      else this.authenticated=false;
  }


    private getUser (_id: string) {
        this.userService.getById(_id).subscribe(user => {this.userName = user.username;});
    }

    addComment(){
      console.log(this.textComment);

      this.comment.userName = JSON.parse(localStorage.getItem('currentUser')).username;
      this.comment._idClub = this.route.snapshot.params['id'];
      this.comment.comment = this.textComment;
      this.commentService.create(this.comment).subscribe(data => {
          console.log("entra al comment");
          this.clubComentarios.push(this.comment);
      }, error => {
          console.log(error)
      });
    }

    // private getPlayer (_id: string) {
    //
    //     console.log(this.player);
    //     this.playerService.getById(_id).subscribe(player => {
    //     this.comment.userName = player.name;
    //     });}




}