import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiMethodNotAllowedResponse = ( message: string) => applyDecorators(
    ApiResponse({
        status: 405,
        schema: {
            properties: {
                "statusCode": {
                    example: 405
                },
                "message": {
                    example: message
                }
            }
        }
    })
)