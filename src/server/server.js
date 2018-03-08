import connect from 'connect';
import serveStatic from 'serve-static';
const app = connect();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 9812;
const production = NODE_ENV === 'production';

if (!production) {
    (require('./server.webpack').default)(app);
}

app.use('/', serveStatic(process.cwd() + '/dist/app'));

app.listen(PORT, '0.0.0.0', () => {
    console.log('server running on ',PORT); // eslint-disable-line no-console
});
