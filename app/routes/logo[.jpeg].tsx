import { LoaderFunctionArgs } from 'react-router';
import logo from '~/components/icon/logo.png';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  url.pathname = logo

  const imageBuffer = await fetch(url).then(
    (res) => res.body,
  )

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}
