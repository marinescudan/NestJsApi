import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(
        private readonly bookmarkService: BookmarkService,
    ) {}

    @Get()
    getBookmarks(
        @GetUser('id') userId: number
    ) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseArrayPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseArrayPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
    ) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseArrayPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
    }
}