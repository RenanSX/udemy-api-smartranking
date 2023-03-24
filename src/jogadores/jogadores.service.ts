import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AtualizarJogadorDto } from "./dtos/atualizar-jogador.dto";

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(@InjectModel("Jogador") private readonly jogadorModule: Model<Jogador>) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModule.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
    }
    
    const jogadorCriado = new this.jogadorModule(criarJogadorDto);
    return jogadorCriado.save();
  }

  async atualizarJogador(_id: string, atualizar: AtualizarJogadorDto): Promise<void> {
    const jogadorEncontrado = await this.jogadorModule.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    this.jogadorModule.findOneAndUpdate({ _id }, { $set: atualizar }).exec();
  }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModule.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado!`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModule.find().exec();
  }

  async deletarJogador(_id: string): Promise<any> {
    return this.jogadorModule.deleteOne({ _id }).exec();
  }
}
