import { Module } from '@nestjs/common';
import { EventHandlingService } from '@/services/eventHanling/eventHandling.service';

@Module({
  providers: [EventHandlingService],
})
export class EventHandlingModule {}
