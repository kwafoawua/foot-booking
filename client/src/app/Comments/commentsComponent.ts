import { Component, OnInit } from '@angular/core';
import { ClubService } from '../_services/club.service';
import { Club } from '../_models/club';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../_models/comment';
import { CommentService } from '../_services/comment.service';
import { AuthService } from '../_services/auth.service';
import {StorageService} from '../_services/storage.service';
import { PaginationService } from '../_services';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'comments',
  templateUrl: 'comment.html'
})

export class CommentsComponent implements OnInit {
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
    public snackBar: MatSnackBar
  ) {
    const user = JSON.parse(localStorage.getItem(('currentUser')));
    if (user) {
      this.currentUser = user;
      this.name = user.name;
      if (user.rol !== 'Club')
      {this.authenticated = true; }
    }
  }

  ngOnInit() {
    this.getComentarios();
    this.getClub(this.route.snapshot.params.id);
    this.storageService.getStorage('currentUser').subscribe(user => {
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
      this.snackBar.open('Comentario publicado con éxito', null, {duration: 2000});
    }, error => {
      this.snackBar.open('No ha sido posible publicar tu comentario, intenta nuevamente más tarde', null, {duration: 5000});
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
    const params = this.paginationService.getRequestParams(this.page, this.pageSize);
    this.commentService.findAllCommentForAClub(this.route.snapshot.params.id, params).subscribe((data: any) => {
      this.clubComentarios = data.comments;
      this.count = data.totalItems;
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
