export class Comment {
  userName: String;
  comment: String;
  _idClub: String;
  createdOn: Date;

}

export class CommentPagination {
  comments: Comment[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
