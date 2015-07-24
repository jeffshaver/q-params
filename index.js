module.exports = qp;

// Parsing rules taken from http://zzzzbov.com/blag/querystring-hell

function qp(uri) {
  var qsr = /([^&;]*?={0,1}[^&;]*)(?:[&;]{0,1})/g;
  var queryParams = [];
  var match;

  uri = decodeURIComponent(uri.substring(uri.indexOf('?') + 1));

  if (!uri) {
    throw new Error('No query string :(');
  }

  match = qsr.exec(uri);

  while (match[0] !== '') {
    queryParams.push(match[1]);
    match = qsr.exec(uri);
  }

  return queryParams.map(function(queryParam) {
    var obj = {};
    var indexOfEqual = queryParam.indexOf('=');
    obj[queryParam.substring(0, (indexOfEqual !== -1 ? indexOfEqual : queryParam.length))] = indexOfEqual !== -1 ? queryParam.substring(indexOfEqual + 1) : null;
    return obj;
  }).reduce(function(prev, cur) {
    var currentKey = Object.keys(cur)[0];
    if (prev[currentKey] && typeof prev[currentKey] === 'string') {
      prev[currentKey] = [prev[currentKey], cur[currentKey]];
    } else if (prev[currentKey]) {
      prev[currentKey].push(cur[currentKey]);
    } else {
      prev[currentKey] = cur[currentKey];
    }
    return prev;
  });
};