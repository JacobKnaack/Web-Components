import server from './webserver.setup';

export default async function() {
  console.log('Stopping server...');
  await server.stop();
}
