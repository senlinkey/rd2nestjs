import { Test, TestingModule } from "@nestjs/testing";
import { CoffeesService } from "@/coffees/coffees.service";
import { Connection, Repository } from "typeorm";
import { Flavor } from "@/coffees/entities/flavor.entity";
import { Coffee } from "@/coffees/entities/coffee.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe("CoffeeService", () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  // 设置阶段: 测试之前执行
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // beforeAll()
  // afterEach()
  // afterAll()

  describe("findOne", () => {
    describe("when coffee with ID exists", () => {
      it("should return the coffee object", async () => {
        const coffeeId = "1";
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe("otherwise", () => {
      it("should throw the 'NotFoundException'", async () => {
        const coffeeId = "1";

        coffeeRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
