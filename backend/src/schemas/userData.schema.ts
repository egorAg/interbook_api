import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const UserDataSchema: SchemaObject = {
    properties: {
        id: {
            example: 1,
            description: 'user data id'
        },
        name: {
            example: 'Timber',
            description: 'User firstname'
        },
        surname: {
            example: 'Saw',
            description: 'User lastname'
        },
        email: {
            example: 'timberSaw@mail.com',
            description: 'User email'
        }
    }
}