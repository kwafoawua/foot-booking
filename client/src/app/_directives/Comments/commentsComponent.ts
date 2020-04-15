/**
 * Created by pablo on 19/11/2017.
 */

import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../_services/club.service';
import { Club } from '../../_models/club';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../_models/comment';
import { CommentService } from '../../_services/comment.service';
import { AuthService } from '../../_services/auth.service';
import { now } from 'moment';

@Component({
  selector: 'comments',
  templateUrl: 'comment.html'
})

export class commentsComponent implements OnInit {
  public comment: Comment = new Comment();
  public clubComentarios: Comment[] = [];
  public currrentUser: any;
  public isClub: any;
  public authenticated: boolean;
  private textComment: string = '';
  private club: Club;

  constructor(
    private clubService: ClubService, private  userService: UserService,
    private route: ActivatedRoute, private commentService: CommentService,
    private authenticatedService: AuthService
  ) {
  }

  ngOnInit() {
    // this.isAuthenticated();
    this.getComentarios();
    this.getClub(this.route.snapshot.params[ 'id' ]);
    if (this.authenticatedService.isAuthenticated()) {
      this.authenticated = true;
      this.currrentUser = JSON.parse(localStorage.getItem('currentUser')).username;
      this.isClub = this.authenticatedService.isUserClub();
      if (this.isClub == true) {
        this.authenticated = false
      }// this.currrentUser =  this.authenticatedService.getUserAuthenticated
    }
  }

  isAuthenticated() { //verifico si hay sesion abierta
    if (localStorage.currentUser) {
      this.authenticated = true;
      this.currrentUser = JSON.parse(localStorage.getItem('currentUser')).username;

    } else this.authenticated = false;
  }

  agregarComment() {
    this.comment.userName = this.currrentUser;
    this.comment._idClub = this.club._id;
    this.comment.comment = this.textComment;
    this.commentService.create(this.comment).subscribe(data => {
      this.clubComentarios.push(this.comment);
    }, error => {
      console.log(error)
    });
    this.textComment = '';
    this.getComentarios();
  }

  private getClub(_id: string) {
    this.clubService.getResultById(_id).subscribe(club => {
      this.club = club;
    });
  }

  private getComentarios() {
    console.log(this.route.snapshot.params[ 'id' ]);
    this.commentService.findAllCommentForAClub(this.route.snapshot.params[ 'id' ]).subscribe((comments) => {
      this.clubComentarios = comments;
      console.log(comments)
    });
  }

  // agregarRespuesta(){
  //
  // }
}
