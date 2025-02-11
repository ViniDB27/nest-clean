import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from 'supertest'

describe('Fetch Recent Question (E2E)', async () => {
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

  test('[GET] /question', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: await hash('123456789', 8)
      }
    })
    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          title: 'new question1',
          slug: 'new-questio1',
          content: 'new question content',
        },
        {
          authorId: user.id,
          title: 'new question2',
          slug: 'new-question2',
          content: 'new question content',
        }
      ]
    })

    const response = await request(app.getHttpServer())
      .set('Authorizaiont', `Bearer ${accessToken}`)
      .get('/question')


    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'new question1' }),
        expect.objectContaining({ title: 'new question2' }),
      ]
    })
  })
})