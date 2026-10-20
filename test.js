const app = require('./app');
const http = require('http');

const server = app.listen(0, () => {
  const port = server.address().port;
  http.get(`http://localhost:${port}/health`, (res) => {
    let data = '';
    res.on('data', (c) => (data += c));
    res.on('end', () => {
      const ok = res.statusCode === 200 && JSON.parse(data).status === 'ok';
      console.log(ok ? 'TEST PASSED' : 'TEST FAILED');
      server.close();
      process.exit(ok ? 0 : 1);
    });
  });
});
