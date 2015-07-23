var test = require('tape');
var qp = require('../index.js');

var basicTests = function basicTests(t, uri) {
  var queryParams = qp(uri);
  t.ok(
    queryParams.nomin != null &&
    queryParams.jqnomin != null &&
    queryParams.nomin === 'true' &&
    queryParams.jqnomin === 'true',
    'Can get values from uri'
  );
  t.ok(
    queryParams.fizz != null &&
    queryParams.fizz === '',
    'Parameters can have empty string values'
  );
  t.ok(
    queryParams.help.length === 2 &&
    queryParams.help[0] === 'on e' &&
    queryParams.help[1] === 'two',
    'Parameters that show up more than once are put into an array'
  );
  t.ok(
    queryParams.buzz === null,
    'Parameters with no = are exist but are null'
  );
  t.ok(queryParams[''] === 'bar', 'Parameters can have empty keys');
};

var emptyKeyNullTest = function emptyKeyNullTest(t, uri) {
  var queryParams = qp(uri);
  t.ok(queryParams[''] === null, 'Parameters with empty keys can have null values');
};


test('qp tests with &', function(t) {
  t.plan(6);
  basicTests(t, 'http://jsfiddle.net?nomin=true&jqnomin=true&help=on%20e&help=two&buzz&fizz=&=bar');
  emptyKeyNullTest(t, 'http://jsfiddle.net?&nomin=true&jqnomin=true&help=on%20e&help=two&buzz&fizz=');
  t.end();
});

test('qp tests with ;', function(t) {
  t.plan(6);
  basicTests(t, 'http://jsfiddle.net?nomin=true;jqnomin=true;help=on%20e&help=two;buzz;fizz=;=bar');
  emptyKeyNullTest(t, 'http://jsfiddle.net?;nomin=true;jqnomin=true;help=on%20e;help=two;buzz;fizz=');
  t.end();
});