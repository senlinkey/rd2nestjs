import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesService } from "@/coffees/coffees.service";
import { Connection } from "typeorm";
import { Flavor } from "@/coffees/entities/flavor.entity";
import { Coffee } from "@/coffees/entities/coffee.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("CoffeeService", () => {
  let service: CoffeesService;

  // 设置阶段: 测试之前执行
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} }
      ]
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });


  // beforeAll()
  // afterEach()
  // afterAll()
});
