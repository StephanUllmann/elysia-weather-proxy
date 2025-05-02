import { Elysia, Handler } from 'elysia';
import { cors } from '@elysiajs/cors';
const weatherApiKey = process.env.WEATHER_API_KEY;
const port = process.env.PORT ?? 3000;

if (!weatherApiKey) {
  console.log('No API key');
  process.exit(1);
}

let data;

const weatherHandler: Handler = async ({ request, server, query }) => {
  const { lat, lon } = query;
  // if (!data) {
  console.log('Running');
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&hour_fields=temp_c&days=2`
    );
    data = await res.json();
  } catch (error) {
    console.log(error);
    return { message: 'Lookup failed' };
    // }
  }

  return {
    now: 'Hey',
    ip: server?.requestIP(request),
    data,
  };
};

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173', 'https://startling-starship-eb2844.netlify.app'],
    })
  )
  .get('/', () => 'Hello Elysia')
  .get('/weather-now', weatherHandler)
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
