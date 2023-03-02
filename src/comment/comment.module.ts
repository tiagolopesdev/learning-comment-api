import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://comment:j5OJZ1uorYP8kxD4@cluster0.ad379n6.mongodb.net/?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature([
      {
        name: 'comment',
        schema: CommentSchema
      }
    ])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
