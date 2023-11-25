import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { UserDataSchema } from "@/schemas/userData.schema";
import { SpaceSchema } from "@/schemas/space.schema";

export const UserSchema: SchemaObject = {
    properties: {
        id: {
            type: "number",
            example: 1,
            description: 'User id'
        },
        login: {
            type: "string",
            example: "changeme",
            description: 'User login'
        },
        userData: UserDataSchema,
        spaces: {
            properties: { ...SpaceSchema.properties },
            example: [{
                ...SpaceSchema.example
            }],
        }
    }
}