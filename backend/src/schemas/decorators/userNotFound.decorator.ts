import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiUserNotFoundResponse = applyDecorators(ApiResponse({
    status: 400,
    schema: {
        properties: {
            statusCode: {
                example: 400,
                description: "Status"
            },
            message: {
                example: `User with ID: ${Math.round(Math.random() * 100)} not found`,
                description: "Error description"
            }
        }
    }
}))