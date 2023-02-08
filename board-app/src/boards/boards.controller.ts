import { Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import {
  Body,
  Delete,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common/decorators';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

    @Get('/')
  getAllBoards(): Promise <Board[]> {
    return this.boardsService.getAllBoards();
  }
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    console.log(id);
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   console.log(id);
  //   return this.boardsService.getBoardById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() boardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(boardDto);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() boardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(boardDto);
  // }
  @Delete('/:id')
  deleteBoard(@Param('id',ParseIntPipe) id: number): Promise <void> {
    return this.boardsService.deleteBoard(id);
  }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) : Promise <Board>{
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
