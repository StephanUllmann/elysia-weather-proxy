import { Elysia, Handler } from 'elysia';
const weatherApiKey = process.env.WEATHER_API_KEY;

if (!weatherApiKey) {
  console.log('No API key');
  process.exit(1);
}

const weatherHandler: Handler = async ({ request, server, query }) => {
  const { lat, lan } = query;
  let data;
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lan}`);
    data = await res.json();
  } catch (error) {
    console.log(error);
    return { message: 'Lookup failed' };
  }

  return {
    now: 'Hey',
    ip: server?.requestIP(request),
    data,
  };
};

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .get('/weather-now', weatherHandler)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
