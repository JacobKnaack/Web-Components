import server from './webserver.setup';

export default async function() {
  console.log('Starting server...');
  await server.start();
}
