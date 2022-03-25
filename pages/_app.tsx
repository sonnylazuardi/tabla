import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { TinaEditProvider } from 'tinacms/dist/edit-state';
import { TinaCMS, TinaProvider } from 'tinacms';
import { useMemo } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        sidebar: true,
        enabled: false,
      }),
    [],
  );
  return (
    <TinaEditProvider editMode={cms}>
      <TinaProvider cms={cms}>
        <Component {...pageProps} />
      </TinaProvider>
    </TinaEditProvider>
  );
}

export default MyApp
