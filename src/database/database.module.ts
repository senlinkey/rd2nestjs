import { Module } from "@nestjs/common";
import { createConnection } from "typeorm";

@Module({
  providers: [
    {
      provide: "CONNECTION",
      useValue: createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432
      })
    }
  ]
})
export class DatabaseModule {
}
