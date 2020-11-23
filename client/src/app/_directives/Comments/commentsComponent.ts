/**
 * Created by pablo on 19/11/2017.
 */

import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../_services/club.service';
import { Club } from '../../_models/club';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../_models/comment';
import { CommentService } from '../../_services/comment.service';
import { AuthService } from '../../_services/auth.service';
import { now } from 'moment';
import {StorageService} from '../../_services/storage.service';

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
  private textComment = '';
  private club: Club;
  currentUser: any;
  name = '';
  rol = '';

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authenticatedService: AuthService,
    private storageService: StorageService
  ) {
    const user = JSON.parse(localStorage.getItem(('currentUser')));
    if (user) {
      this.currentUser = user;
      this.name = user.name;
      if (user.rol !== 'Club')
      {this.authenticated = true; }
      console.log('el user', user);
    }
  }

  ngOnInit() {
    // this.isAuthenticated();
    this.getComentarios();
    this.getClub(this.route.snapshot.params.id);
    this.storageService.getStorage('currentUser').subscribe(user => {
      console.log('site header', user);
      if (user.value && Object.keys(user.value).length !== 0) {
        this.currentUser = user.value;
        this.name = user.value.name;
      }
    });

  }



  agregarComment() {
    this.comment.userName = this.name;
    this.comment._idClub = this.club._id;
    this.comment.comment = this.textComment;
    this.commentService.create(this.comment).subscribe(data => {
      this.clubComentarios.push(this.comment);
    }, error => {
      console.log(error);
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
    console.log(this.route.snapshot.params.id);
    this.commentService.findAllCommentForAClub(this.route.snapshot.params.id).subscribe((data: any) => {
      this.clubComentarios = data.comments;
      console.log(data);
    });
  }


}
