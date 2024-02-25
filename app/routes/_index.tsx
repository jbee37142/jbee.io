import type { MetaFunction } from "@remix-run/node";
import { HomePage } from '~/pages/home/HomePage';

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Jbee.io" },
    { name: "개발 블로그", content: "Welcome to Jbee.io" },
  ];
};

export default HomePage;
