import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JogadoresModule } from "./jogadores/jogadores.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://renansx:1299102869@cluster0.t9ezojr.mongodb.net/smartranking?retryWrites=true&w=majority"), JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
