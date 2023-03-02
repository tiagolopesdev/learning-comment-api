import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    title: string;
    @Prop()
    body: string;
    @Prop()
    author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);