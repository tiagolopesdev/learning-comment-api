import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {

  @ApiProperty()
  id: string;
  
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  private constructor(id: string, title: string, body: string) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
