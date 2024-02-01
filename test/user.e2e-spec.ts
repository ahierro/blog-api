import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MongoDBContainer } from "@testcontainers/mongodb";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../src/user/user.module";
import { AuthModule } from "../src/auth/auth.module";
import { BcryptModule } from "../src/bcrypt/bcrypt.module";
import { AdminModule } from "../src/admin/admin.module";
import { PostModule } from "../src/post/post.module";
import { isValidObjectId } from 'mongoose';

describe('User (e2e)', () => {
  let app: INestApplication;
  let mongodbContainer = null;

  beforeEach(async () => {
    mongodbContainer = await new MongoDBContainer("mongo:6.0.13").start();
    const connectionUrl = `mongodb://127.0.0.1:${mongodbContainer.getMappedPort(27017)}/blog?directConnection=true`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(),MongooseModule.forRoot(connectionUrl), UserModule, AuthModule, BcryptModule, AdminModule, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await mongodbContainer.stop();
  });

  it('Register a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        "username": "user1",
        "password": "p4ssw0rd1",
        "isAdmin": true
      });
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual("user1");
    expect(response.body.isAdmin).toEqual(true);
    expect(isValidObjectId(response.body._id)).toEqual(true);
    expect(response.body.__v).toEqual(0);
  });

  it('Register a duplicated user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        "username": "user1",
        "password": "p4ssw0rd1",
        "isAdmin": true
      });
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        "username": "user1",
        "password": "p4ssw0rd1",
        "isAdmin": true
      });
    expect(response.status).toBe(409);
  });

  afterAll(done => {
    done();
  });

});
