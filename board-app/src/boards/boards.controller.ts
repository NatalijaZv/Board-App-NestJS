import { Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import {
  Body,
  Delete,
  Param,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common/decorators';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) { }

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  @Get('/:id')
  getBoardById(
    @Param('id') id: number,
    @GetUser() user: User): Promise<Board> {
    console.log(id);
    return this.boardsService.getBoardById(id, user);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   console.log(id);
  //   return this.boardsService.getBoardById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() boardDto: CreateBoardDto,
    @GetUser() user: User): Promise<Board> {
    return this.boardsService.createBoard(boardDto, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() boardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(boardDto);
  // }
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
