/* eslint-disable no-undef */
import 'reflect-metadata';
import request from 'supertest';
import { DataSourceOptions, DataSource } from 'typeorm';
import { expect } from 'chai';
import app from '../../app';
import { AppDataSource } from '../../src/config/data-source';
import redis from 'redis-mock'


describe('인증번호 전송을 위한 /user/signup/auth 은...', () => {
    it('# 회원가입에 성공하면 202을 리턴한다.', (done) => {  
      request(app).post('/user/signup/auth').send({phone: '01000000000'}).expect(202, done);
    });
});

describe('회원가입을 위한 /user/signup 은...', () => {
    it('# 회원가입에 성공하면 201을 리턴한다.', (done) => {  
      request(app).post('/user/signup').send({
        'email': 'jihoon411@gmail.com',
        'password': 'qwer1234',
        'phone': '01000000000',
        'userType': 'employee'
      }).expect(201, done);
    });
});

describe('로그인을 위한 /user/signin 은...', () => {
    it('# 로그인에 성공하면 200을 리턴한다.', (done) => {  
      request(app).post('/user/signin').send({phone: '01000000000', 'password': 'qwer1234'}).expect(200, done);
    });
});

describe('로그아웃을 위한 /user/logout 은...', () => {
    let authToken: string;

    before((done) => {
      request(app)
        .post('/user/signin')
        .send({
          phone: '01000000000',
          password: 'qwer1234',
        })
        .expect(200, (_, { headers }) => {
          expect(headers).to.include.keys(['authorization']);
          authToken = headers.authorization;
          done();
        });
    });

    it('# 로그아웃에 성공하면 204을 리턴한다.', (done) => {  
      request(app).post('/user/logout').send({phone: '01000000000', 'password': 'qwer1234'}).expect(204, done);
    });
});

describe('비밀변호 변경을 위한 /user/changepassword 은...', () => {
    let authToken: string;

    before((done) => {
      request(app)
        .post('/user/signin')
        .send({
          phone: '01000000000',
          password: 'qwer1234',
        })
        .expect(200, (_, { headers }) => {
          expect(headers).to.include.keys(['authorization']);
          authToken = headers.authorization;
          done();
        });
    });

    it('# 비밀번호 변경에 성공하면 200 리턴한다.', (done) => {  
      request(app).patch('/user/changepassword').send({'originPassword': 'qwer1234', 'changePassword': 'qwer12345'}).expect(200, done);
    });
});

describe('회원탈퇴을 위한 /user/withdrawal 은...', () => {
    let authToken: string;

    before((done) => {
      request(app)
        .post('/user/signin')
        .send({
          phone: '01000000000',
          password: 'qwer12345',
        })
        .expect(200, (_, { headers }) => {
          expect(headers).to.include.keys(['authorization']);
          authToken = headers.authorization;
          done();
        });
    });

    it('# 계정 삭제에 성공하면 204 리턴한다.', (done) => {  
      request(app).delete('/user/withdrawal').send({'password': 'qwer12345'}).expect(204, done);
    });
});
