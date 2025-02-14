import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from 'supertest'

describe('Authenticate (E2E)', async () => {
  let app: INestApplication 
  let prisma: PrismaService

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prisma.user.create({ 
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await hash('123456789', 8)
      }
    })

    const response = await request(app.getHttpServer()).post('/accounts').send({
      email: 'john@doe.com',
      password: '123456789'
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.access_token).toEqual(expect.any(String))
  })
})