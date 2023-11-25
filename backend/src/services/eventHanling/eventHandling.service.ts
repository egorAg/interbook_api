import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { EventBus, EventsKeys } from "@/services/eventBus";
import { User } from "@/modules/user/entities/user.entity";
import { Space } from "@/modules/spaces/entities/space.entity";

@Injectable()
export class EventHandlingService implements OnModuleInit {
    onModuleInit (): any {
        EventBus.sub(EventsKeys.SPACE_INVITE, async (payload) => {
            await this.onSpaceInvite(payload)
        })
    }

    private async onSpaceInvite(payload: { user: User, space: Space, token: string }) {
        Logger.debug(`New invite event`, {
            from: payload.user.id,
            toSpace: payload.space.id,
            token: payload.token
        })
    }
}