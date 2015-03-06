var expect = require('chai').expect;
var PHT = require('./');

describe('probed-hash-table', function() {
  it('should properly work for linear probing', function() {
    var ht = new PHT(10, PHT.Linear);

    ht.put('test', 10);
    ht.put('testa', 5);
    ht.put('testar', 20);
    ht.put('testin', 14);

    expect(ht.get('test')).to.equal(10);
    expect(ht.get('testa')).to.equal(5);
    expect(ht.get('testar')).to.equal(20);
    expect(ht.get('testin')).to.equal(14);

    ht.put('test', 12);
    expect(ht.get('test')).to.equal(12);

    ht.remove('test');
    ht.remove('testa');

    expect(ht.get('test')).to.equal(undefined);
    expect(ht.get('testa')).to.equal(undefined);
    expect(ht.get('testar')).to.equal(20);
    expect(ht.get('testin')).to.equal(14);
  });
});
