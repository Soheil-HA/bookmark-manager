import { Module } from '@nestjs/common';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  // metadata imports , controllers , providers
  imports: [BookmarksModule],
})
export class AppModule {}
