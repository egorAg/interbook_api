import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UnauthorizedSchema } from "@/schemas/unauthorized.schema";

export const ApiUnauthorized = applyDecorators(ApiResponse({
    status: 401,
    description: 'Unauthorized error',
    schema: UnauthorizedSchema
}))