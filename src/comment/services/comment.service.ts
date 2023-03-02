import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentDocument } from '../entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectModel('comment') private readonly commentModel: Model<CommentDocument>
  ) { }

  async getCommentsByTitle(name: string) {
    try {

      const comments: CreateCommentDto[] = [];

      const results = await this.commentModel.find();

      results.map((item) => {    
        if (item.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
          comments.push(
            CreateCommentDto.convertAllElements(
              item.id,
              item.title,
              item.body,
              item.author,
            )
          )
        }
      });

      return comments;

    } catch (ex) {
      throw new InternalServerErrorException(`Não foi possível obter comentários com título ${name}`);
    }
  }

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
      throw new InternalServerErrorException('Não foi possivel obter comentário');
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
      throw new InternalServerErrorException('Não foi possivel obter comentários');
    }
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const createComment = new this.commentModel(createCommentDto);
      const result = await createComment.save();

      return result.id;

    } catch (ex) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async updateComment(updateCommentDto: UpdateCommentDto): Promise<Comment> {
    try {

      const commentExist = await this.commentModel.findById(updateCommentDto.id);

      if (!commentExist) throw new BadRequestException(`Comentário com título ${updateCommentDto.title} não existe`);

      const updateComment = new this.commentModel(updateCommentDto);

      const responseUpdateComment = await updateComment.updateOne(
        { _id: commentExist._id},
        {
          $set: { title: updateCommentDto.title, body: updateCommentDto.body }
          //{ $currentDate: { lastUpdated: true } }
        }
        )

      return responseUpdateComment.id;

    } catch (ex) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
