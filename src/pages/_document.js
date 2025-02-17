import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
     <Head>
        <link rel="icon" href="https://images.squarespace-cdn.com/content/v1/5cd3f534e5f7d12adaea921c/1560377416809-QRU8OE9C4N1PELWNZ2VO/favicon.ico?format=100w" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
