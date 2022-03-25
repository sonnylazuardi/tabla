import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import useDarkMode from "use-dark-mode";

const Home: NextPage = () => {
  const darkMode = useDarkMode();
  React.useEffect(() => {
    document.body.addEventListener("mousewheel", function (event: any) {
      event.preventDefault();
      document.body.scrollLeft += event.deltaY;
    }, { passive: false });
  }, [])
  return (
    <div className="app" id="scroll_container">
      <Head>
        <title>Tabla</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="module" src="https://unpkg.com/figma-plugin-bypass"></script>
      </Head>
      
      <div className="absolute top-0 left-0 right-0 pt-16">
        <h2 className='order-first font-semibold text-lg tracking-wide text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text'>Tabla</h2>
          <h1 className='text-6xl font-extrabold uppercase text-transparent tracking-tighest sm:text-5xl lg:text-7xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text'>{format(new Date(), "hh.mm aaaaa'm'")}</h1>
          <div className='text-2xl'>{format(new Date(), "LLLL dd", {locale: enUS})}</div>
          {/* <button onClick={() => darkMode.toggle()}>Click me</button> */}
        </div>
      <div className="wrap space-x-4 p-4 pb-16">
          {/* <div className="tab">
            <iframe style={frameStyle} src="" />
          </div>
          <div className="tab">
            <iframe style={frameStyle} src="" />
          </div>
          <div className="tab">
            <iframe style={frameStyle} src="" />
          </div> */}
          {/* <div className="tab">
            <iframe style={frameStyle} src="https://kotla.vercel.app" />
          </div> */}
          {/* <div className="tab">
            <iframe style={frameStyle} src="https://nerdlegame.com/" />
          </div> */}
          <div className="tab">
            <iframe
              is="x-frame-bypass"
              style={frameStyle}
              src="https://nytimes.com/games/wordle/index.html"
            />
          </div>
          <div className="tab">
            <iframe style={frameStyle} src="https://katla.vercel.app" />
          </div>
        </div>
        
    </div>
  )
}

const frameStyle = {
  border: "none",
  width: "100%",
  height: "100%"
};

export default Home
