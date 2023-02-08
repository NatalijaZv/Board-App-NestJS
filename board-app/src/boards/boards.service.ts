import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
// import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class BoardsService {
  //Inject repository to the service
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {

  }
  //   private boards: Board[] = [];
    async getAllBoards(): Promise <Board[]> {
      return this.boardRepository.find();
    }


  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with ID ${id}`);
    }
    return found;
  }
  
  //   getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Board with ID ${id} does not exist`);
  //     }
  //     return found;
  //   }
  async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log('delete result',result)
        if(result.affected === 0){
          throw new NotFoundException(`Can't find Board with id ${id}`)
        }

      }
  
  //   deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title, //same as title:title => if key-value pair is the same, we can only write value
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board)
    return board;
  }

  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title, //same as title:title => if key-value pair is the same, we can only write value
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     console.log(this.boards);
  //     return board;
  //   }
  async updateBoardStatus(id: number, status: BoardStatus):Promise <Board> {
  const currentBoard = await this.getBoardById(id)
  currentBoard.status = status

  await this.boardRepository.save(currentBoard)

  return currentBoard
    }

  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
