var _      = require('underscore');
var base85 = require('../lib/base85');
var data   = require('./data').data;

exports.testErrors = function(test)
{
  test.equal(base85.decode(1234), false)
  test.equal(base85.decode('<~u~>'), false);
  test.equal(base85.decode('<~uuuuu~>'), false);
  test.done();
}

exports.testBasic = function(test)
{
  test.expect(data.length);

  _.each(data, function (tc) {
    var exp = typeof tc.raw === 'string' ? new Buffer(tc.raw) : tc.raw;
    test.deepEqual(base85.decode(tc.enc), exp);
  });

  test.done();
}

exports.testWhiteSpace = function(test)
{
  test.deepEqual(base85.decode("<~\n@p\ns7\ntD.3~>"), new Buffer('canumb'));
  test.deepEqual(base85.decode("<~\n @  p \ns7 \n t D .3~>"), new Buffer('canumb'));
  test.deepEqual(base85.decode("<~\n @  p \ns7 \n t D .3            ~>"), new Buffer('canumb'));
  test.deepEqual(base85.decode("<~@ps7tD.3        \n    ~>"), new Buffer('canumb'));
  test.deepEqual(base85.decode("<~       @ps7tD.3     \n     ~>"), new Buffer('canumb'));
  test.done();
}
