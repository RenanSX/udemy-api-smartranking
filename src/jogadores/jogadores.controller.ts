import { Body, Controller, Post, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from "@nestjs/common";
import { AtualizarJogadorDto } from "./dtos/atualizar-jogador.dto";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { JogadoresService } from "./jogadores.service";
import { JogadoresValidacaoParametrosPipe } from "./pipes/jogadores-validacao-parametros.pipe";

@Controller("api/v1/jogadores")
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put("/:_id")
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Param("_id", JogadoresValidacaoParametrosPipe) _id: string,
    @Body() atualizarDto: AtualizarJogadorDto
  ) {
    await this.jogadoresService.atualizarJogador(_id, atualizarDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Get("/:_id")
  @UsePipes(ValidationPipe)
  async consultarJogadorPeloId(
    @Param("_id", JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<Jogador> {
    return this.jogadoresService.consultarJogadoresPeloId(_id);
  }

  @Delete("/:_id")
  async deletarJogador(
    @Param("_id", JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
