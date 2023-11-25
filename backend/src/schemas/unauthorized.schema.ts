import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const UnauthorizedSchema: SchemaObject = {
    properties: {
        "statusCode": {
            example: 401,
        },
        "message": {
            example: "Unauthorized"
        }
    }
}