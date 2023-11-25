import { ApiProperty } from "@nestjs/swagger";

export class SpaceCreateDto {
    @ApiProperty({
        example: 'InterBook-1',
        description: 'Name of workspace',
        required: true
    })
    name: string
}