import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from 'supertest'

describe('Create Question (E2E)', async () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test('[POST] /accounts', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await hash('123456789', 8)
      }
    })
    const accessToken = jwt.sign({ sub: user.id })
    const response = await request(app.getHttpServer()).post('/question')
      .set('Authorizaiont', `Bearer ${accessToken}`)
      .send({
        title: 'new question',
        content: 'new question content',
      })

    expect(response.statusCode).toEqual(201)
    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'new question'
      }
    })
    expect(questionOnDatabase).toBeTruthy()
  })
})