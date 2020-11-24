import { describe, it } from "mocha";
import { expect } from 'chai';
import moment from 'moment';
import { formatSearchQuery } from '../../services/list-popular-repos.service';

describe('List Popular Repos Service', () => {

  describe('formatSearchQuery', () => {

    it('Should Set today date as default if no params were provided', () => {
      const query = formatSearchQuery(undefined, undefined, undefined);
      const today = moment().format('YYYY-MM-DD');

      expect(query).to.equal(`created:${today}`);
    });

    it('Should not default anything if one of the params was provided - searchtext provided case', () => {
      const query = formatSearchQuery('cats NOT "hello world"', undefined, undefined);

      expect(query).to.equal('cats NOT "hello world"');
    });

    it('Should not default anything if one of the params was provided - languages provided case', () => {
      const query = formatSearchQuery(undefined, ['java', 'python'], undefined);

      expect(query).to.equal('language:java language:python');
    });

    it('Should not default anything if one of the params was provided - created provided case', () => {
      const query = formatSearchQuery(undefined, undefined, '2020-11-24');

      expect(query).to.equal('created:2020-11-24');
    });

    it('Should set query if all params were provided.', () => {
      const query = formatSearchQuery('cats NOT "hello world"', ['java', 'python'], '2020-11-24');

      expect(query).to.equal('cats NOT "hello world" language:java language:python created:2020-11-24');
    });
  });
});