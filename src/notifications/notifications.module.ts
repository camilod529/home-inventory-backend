import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  providers: [NotificationsGateway, NotificationsService],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
