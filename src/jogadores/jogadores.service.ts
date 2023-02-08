import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { v4 as uuidV4 } from "uuid";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(@InjectModel("Jogador") private readonly jogadorModule: Model<Jogador>) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModule.findOne({ email }).exec();

    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModule.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado!`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    //return this.jogadores;
    return this.jogadorModule.find().exec();
  }

  async deletarJogador(email: string): Promise<any> {
    return this.jogadorModule.remove({ email }).exec();
    /*const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
    if (jogadorEncontrado) {
      this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }*/
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModule(criarJogadorDto);
    return jogadorCriado.save();
    /*const { nome, telefoneCelular, email } = criarJogadorDto;
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
    this.jogadores.push(jogador);*/
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return this.jogadorModule.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();
    /*const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;*/
  }
}
