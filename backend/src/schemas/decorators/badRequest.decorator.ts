import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const ApiBadRequestResponse = (message: string | string[]) => {
    if ( Array.isArray(message) ) {
        const schemas: SchemaObject[] = [];

        for (const messageString of message ) {
            schemas.push({
                example: message
            })
        }
        return applyDecorators(ApiResponse({
            status: 400,
            schema: {
                properties: {
                    statusCode: {
                        example: 400,
                        description: "Status"
                    },
                    message: {
                        oneOf: schemas,
                        description: "Error description"
                    }
                }
            }
        }))
    }

    return applyDecorators(ApiResponse({
        status: 400,
        schema: {
            properties: {
                statusCode: {
                    example: 400,
                    description: "Status"
                },
                message: {
                    example: message,
                    description: "Error description"
                }
            }
        }
    }))
}