import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const InviteTokenSchema: SchemaObject = {
    properties: {
        inviteToken: {
            type: 'string',
            example: 'cb2e98f6-199f-48dd-aafd-42b95fa368f2'
        }
    }
}