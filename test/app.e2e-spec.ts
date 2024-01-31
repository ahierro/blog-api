import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/search')
      .expect(200)
      .expect('This action returns all search');
  });
  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    // mongoose.connection.close()
    done()
  })
});
