import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { CoffeesModule } from "@/coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "localhost",
          port: 5433,
          username: "postgres",
          password: "123456",
          database: "postgres",
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("Create [POST /]");
  it.todo("Get all [GET /]");
  it.todo("Get all [GET /:id]");
  it.todo("Update one [PATCH /:id]");
  it.todo("Delete one [DELETE /:id]");

  afterAll(async () => {
    await app.close();
  });
});
