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
import { PaginationService } from '../../_services';

@Component({
  selector: 'comments',
  templateUrl: 'comment.html'
})

export class commentsComponent implements OnInit {
  public comment: Comment = new Comment();
  public clubComentarios: Comment[] = [];
  public authenticated: boolean;
  private textComment = '';
  private club: Club;
  currentUser: any;
  name = '';
  rol = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authenticatedService: AuthService,
    private storageService: StorageService,
    private paginationService: PaginationService,
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
    console.log('getcomentarios')
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);
    this.commentService.findAllCommentForAClub(this.route.snapshot.params.id, params).subscribe((data: any) => {
      this.clubComentarios = data.comments;
      this.count = data.totalItems;
      console.log(data);
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.getComentarios();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.value;
    this.page = 1;
    this.getComentarios();
  }


}
