import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentDocument } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment') private readonly commentModel: Model<CommentDocument>
  ) { }

  async getCommentsById(id: string) {
    try {
      const results = await this.commentModel.findById(id);

      return CreateCommentDto.convertAllElements(
        results.id, 
        results.title,
        results.body, 
        results.author
      );
    } catch (ex) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getAllComments() {
    try {

      const comments: CreateCommentDto[] = [];

      const results = await this.commentModel.find();

      results.map((item) => {
        comments.push(
          CreateCommentDto.convertAllElements(
            item.id,
            item.title,
            item.body,
            item.author,
          )
        )
      });

      return comments;

    } catch (ex) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async createUser(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const createComment = new this.commentModel(createCommentDto);
      const result = await createComment.save();

      return result.id;

    } catch (ex) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
