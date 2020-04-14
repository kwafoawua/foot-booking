import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../_models/comment';

@Injectable()
export class CommentService {

  //public static  comment: Comment;

  constructor(private http: HttpClient) {
  }

  create(comment: any) {
    console.log(comment);
    return this.http.post('/comments/create', comment);
  }

  update(comment: Comment, _id: string, authorId: string) {
    return this.http.put('/comments/changeComment/' + _id, { comment, authorId });
    ;
  }

  findAllCommentForAClub(_id: string) {
    return this.http.get<Comment[]>('/comments/clubComment/' + _id);
  }

  findAllAuthorComments(_id: string) {
    return this.http.get('/comments/authorComment/' + _id);
  }

  deleteComment(_id: string) {
    return this.http.delete('/comments/' + _id);
  }
}
