import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Comment } from "../_models/comment";

@Injectable()
export class CommentService {

    public static  comment: Comment;

    constructor(private http: Http) {}

    create(comment: Comment) {
        return this.http.post('/comments/create', comment);
    }

    update(comment: Comment, _id: string, authorId: string) {
        return this.http.put('/comments/changeComment/' + _id, comment, authorId).map((response: Response)=> response.json());;
    }

    findAllCommentForAClub(_id: string) {
    	return this.http.get('/comments/' + _id).map((response: Response) => response.json());
    }

    findAllAuthorComments(_id: string) {
    	return this.http.get('/comments/' + _id).map((response: Response) => response.json());
    }

    deleteComment(_id: string) {
        return this.http.delete('/comments/' + _id);
    }
}