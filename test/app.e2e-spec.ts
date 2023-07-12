import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));

    await app.init();
    await app.listen(3333);

    prisma = app.get<PrismaService>(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');

  });

  afterAll(async () => {
    await app.close();
  });


    // Auth
    describe('Auth', () => {
      const dto: AuthDto = {
        email: 'dan@man.com',
        password: '123',
      };

      // Signup
      describe('Signup', () => {
        it('should throw if email empty', () => {
          return pactum.spec()
            .post('/auth/signup')
            .withBody({
              password: dto.password,
            })
            // .inspect()
            .expectStatus(400);
        });
        it('should throw if password empty', () => {
          return pactum.spec()
            .post('/auth/signup')
            .withBody({
              email: dto.email,
            })
            // .inspect()
            .expectStatus(400);
        });
        it('should throw if no req body provided', () => {
          return pactum.spec()
            .post('/auth/signup')
            // .inspect()
            .expectStatus(400);
        });
        it('should create a user', () => {
          return pactum.spec()
            .post('/auth/signup')
            .withBody(dto)
            // .inspect()
            .expectStatus(201);
        });
      });

      // Signin
      describe('Signin', () => {
        it('should throw if email empty', () => {
          return pactum.spec()
            .post('/auth/signin')
            .withBody({
              password: dto.password,
            })
            // .inspect()
            .expectStatus(400);
        });
        it('should throw if password empty', () => {
          return pactum.spec()
            .post('/auth/signin')
            .withBody({
              email: dto.email,
            })
            // .inspect()
            .expectStatus(400);
        });
        it('should throw if no req body provided', () => {
          return pactum.spec()
            .post('/auth/signin')
            // .inspect()
            .expectStatus(400);
        });
        it('should signin', () => {
          return pactum.spec()
            .post('/auth/signin')
            .withBody(dto)
            // .inspect()
            .expectStatus(200)
            .stores('userAt', 'access_token');
        });
      });
    });

    // User
    describe('User', () => {
      // Get user
      describe('Get user', () => {
        it('should get current user', () => {
          return pactum
            .spec()
            .get('/users/me')
            // .inspect()
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200);
        });
      });

      // Update user
      describe('Update user', () => {
        it('should edit user', () => {
          const dto: EditUserDto = {
            firstname: 'Dan',
            email: 'dan@codewithdan.com',
          };

          return pactum
            .spec()
            .patch('/users')
            // .inspect()
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.email)
            .expectBodyContains(dto.firstname);
        });
      });
    });
    // Bookmark
    describe('Bookmark', () => {
      // create
      describe('Create bookmark', () => { });
      // get by id
      describe('Get bookmark by id', () => { });
      // get all
      describe('Get all bookmarks', () => { });
      // update by id
      describe('Update bookmark by id', () => { });
      // delete by id
      describe('Delete bookmark by id', () => { });
    });

});