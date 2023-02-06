import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { v4 as uuidV4 } from "uuid";

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado!`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

    if (jogadorEncontrado) {
      this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidV4(),
      nome,
      telefoneCelular,
      email,
      ranking: "A",
      posicaoRanking: 1,
      urlFotoJogador: "http://teste.com/img.jpg",
    };

    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }
}
