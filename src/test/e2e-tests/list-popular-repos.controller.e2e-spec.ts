import supertest from "supertest";
import { SinonStub, stub } from "sinon";
import { expect } from "chai";
import { describe } from "mocha";
import githubApi from '../../third-party/github-api';

import ExpressApp from '../../index';
import { responses } from './data';
import moment from "moment";

describe('List Popular repos Controller.', () => {
  let get: SinonStub;


  describe("GET /api/repos", () => {

    beforeEach(() => {
      get = stub(githubApi, 'get');
    });

    afterEach(() => {
      get.restore();
    });

    it("List all with today date as default query", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos');
      expect(get.args[0][1].params.q).to.equal(`created:${moment().format('YYYY-MM-DD')}`);
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with language query", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?language=javascript');
      expect(get.args[0][1].params.q).to.equal('language:javascript');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with custom page", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?page=5');
      expect(get.args[0][1].params.q).to.equal(`created:${moment().format('YYYY-MM-DD')}`);
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(5);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with custom searchtext", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?searchText=cats NOT dogs');
      expect(get.args[0][1].params.q).to.equal('cats NOT dogs');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with custom creation date", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?createdAt=2020-11-24');
      expect(get.args[0][1].params.q).to.equal('created:2020-11-24');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with multiple languages query", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?language=javascript,java');
      expect(get.args[0][1].params.q).to.equal('language:javascript language:java');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(30);
    });

    it("List all with language query and custom per_page", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?language=javascript&per_page=25');
      expect(get.args[0][1].params.q).to.equal('language:javascript');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('desc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(25);
    });

    it("List all with language query and custom per_page and sorting asc", async () => {
      get.resolves({ data: responses.simpleRes });
      await supertest(ExpressApp).get('/api/repos?language=javascript&per_page=25&order=asc');
      expect(get.args[0][1].params.q).to.equal('language:javascript');
      expect(get.args[0][1].params.sort).to.equal('stars');
      expect(get.args[0][1].params.order).to.equal('asc');
      expect(get.args[0][1].params.page).to.equal(1);
      expect(get.args[0][1].params.per_page).to.equal(25);
    });

    it("Should throw error of creation date param in the future", async () => {
      get.resolves({ data: responses.simpleRes });

      const result = await supertest(ExpressApp).get(`/api/repos?createdAt=${moment().add(1, 'days')}`);
      expect((<any>result.error).status).equal(400);
    });

    it("Should throw error of creation date param is incorrect", async () => {
      get.resolves({ data: responses.simpleRes });

      const result = await supertest(ExpressApp).get('/api/repos?createdAt=2020-30-30');
      expect((<any>result.error).status).equal(400);
    });

    it("Should throw proper error if github api throws validation error", async () => {
      get.rejects(
        {
          isAxiosError: true,
          response: {
            data: {
              message: 'Validation Error',
              errors: [{ field: 'q', resource: 'Search', code: 'missing' }],
              documentation_url: 'string'
            }
          }
        }
      );

      const result = await supertest(ExpressApp).get('/api/repos?createdAt=2020-01-01');
      expect((<any>result.error).status).equal(400);
      expect((<any>result.error).text).equal(
        '{"errors":[{"message":"Validation Error","field":"Field q, with code missing, related to resource Search"}]}'
      );
    });

  });
})