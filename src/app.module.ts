import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JogadoresModule } from "./jogadores/jogadores.module";
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { AwsModule } from './aws/aws.module';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://renansx:1299102869@cluster0.t9ezojr.mongodb.net/?retryWrites=true&w=majority"),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}