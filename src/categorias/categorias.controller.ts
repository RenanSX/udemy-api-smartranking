import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller("api/v1/categorias")
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias(): Promise<Array<Categoria>> {
    return this.categoriasService.consultarTodasCategorias();
  }

  @Get("/:categoria")
  @UsePipes(ValidationPipe)
  async consultarCategoriaPeloId(@Param("categoria") categoria: string): Promise<Categoria> {
    return this.categoriasService.consultarCategoriaPeloId(categoria);
  }
}
