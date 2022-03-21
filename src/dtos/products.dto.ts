import { IsInt, IsString, IsJSON } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public title: string;

  @IsString()
  public slug: string;

  @IsInt()
  public quantity: number;

  @IsInt()
  public price: number;

  @IsString()
  public status: string;

  @IsString()
  public description: string;

}
