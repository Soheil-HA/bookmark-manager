import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];

  findAll(): Bookmark[] {
    return this.bookmarks;
  }

  find(getBookmarkDto: GetBookmarkDto): Bookmark[] {
    let bookmarks = this.findAll();
    const { url, desc, title } = getBookmarkDto;

    if (url) {
      return bookmarks.filter((bookmark) =>
        bookmark.url.toLowerCase().includes(url),
      );
    }
    if (desc) {
      return bookmarks.filter((bookmark) =>
        bookmark.desc.toLowerCase().includes(desc),
      );
    }
    if (title) {
      return bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(title),
      );
    }
  }

  findById(id: string): Bookmark {
    return this.bookmarks.find((bookmark) => bookmark.id == id);
  }

  createBookmark(createBookmarkDto: CreateBookmarkDto): Bookmark {
    const { url, desc, title } = createBookmarkDto;
    const bookmark: Bookmark = {
      id: uuid(),
      url,
      desc,
      title,
    };

    this.bookmarks.push(bookmark);
    return bookmark;
  }

  deleteBookmark(id: string): void {
    this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
  }

  updateBookmark(id: string, desc: string): Bookmark {
    const bookmark = this.findById(id);
    bookmark.desc = desc;
    return bookmark;
  }
}
