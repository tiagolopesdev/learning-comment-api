import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, Put } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  
  @Get('name')
  @ApiOperation({ summary: 'Obter comentários por nome' })
  async getCommentsByTitle(
    @Res() response,
    @Query('title') title: string 
  ) {
    const commentReponse = await this.commentService.getCommentsByTitle(title);

    response.status(HttpStatus.OK).send(commentReponse);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter comentários por id' })
  async getCommentsById(
    @Res() response,
    @Param('id') id: string 
  ) {
    const commentReponse = await this.commentService.getCommentsById(id);

    response.status(HttpStatus.OK).send(commentReponse);
  }
  
  @Get()
  @ApiOperation({ summary: 'Obter todos os comentários' })
  async getAllComments(
    @Res() response    
  ) {
    const commentReponse = await this.commentService.getAllComments();

    response.status(HttpStatus.OK).send(commentReponse);
  }

  @Post('createComment')    
  @ApiOperation({ summary: 'Adicionar um comentário' })
  async createComment(
    @Res() response,
    @Body() payloadCreate: CreateCommentDto
  ) {
    const commentResponse = await this.commentService.createComment(payloadCreate);

    response.status(HttpStatus.CREATED).send({
      message: 'Comentário criado com sucesso',
      id: commentResponse
    })
  }

  @Put()    
  @ApiOperation({ summary: 'Adicionar um comentário' })
  async updateComment(
    @Res() response,
    @Body() payloadUpdate: UpdateCommentDto
  ) {
    const commentResponse = await this.commentService.updateComment(payloadUpdate);

    response.status(HttpStatus.CREATED).send({
      message: 'Comentário atualizado com sucesso',
      id: commentResponse
    })
  }

  @Delete(':id')    
  @ApiOperation({ summary: 'Excluir um comentário' })
  async deleteComment(
    @Res() response,
    @Param('id') id: string
  ) {
    const commentResponse = await this.commentService.deleteComment(id)

    response.status(HttpStatus.CREATED).send({
      message: 'Comentário excluido com sucesso'
    })
  }
}
