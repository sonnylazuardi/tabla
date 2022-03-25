import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import useDarkMode from "use-dark-mode";
import { useForm, usePlugin, useCMS } from 'tinacms';
import { Website } from '../components/blocks';

const Home: NextPage = () => {
  const darkMode = useDarkMode();
  const [dateState, setDateState] = React.useState(new Date());

  const handleDataChange = async (data: any) => {
    typeof window !== 'undefined' && window.localStorage.setItem('tabla', JSON.stringify(data));
    console.log('Submitting', data);
    if (data.darkMode) {
      darkMode.enable();
    } else if (!data.darkMode) {
      darkMode.disable();
    }
  };

  const defaultData = {
    darkMode: darkMode.value,
    rawJson: {website: []}
  };
  
  const cms = useCMS();
  const formConfig = {
    id: '',
    label: 'Settings',
    fields: [
      { name: 'darkMode', label: 'Dark Mode', component: 'toggle' },
      {
        label: 'Website Links',
        name: 'rawJson.website',
        component: 'list',
        field: {
          component: 'text',
        },
      }
    ],
    initialValues: typeof window !== 'undefined' && window.localStorage.getItem('tabla')?.length ? JSON.parse(window.localStorage.getItem('tabla') || '{}') : defaultData,
    onChange: ({ values }: any) => handleDataChange(values),
    onSubmit: (values: any) => {
      handleDataChange(values);
      document.body.style.paddingLeft = '0';
      cms.disable();
    },
  };
  const [data, form] = useForm(formConfig);
  usePlugin(form);

  React.useEffect(() => {
    document.body.addEventListener("mousewheel", function (event: any) {
      event.preventDefault();
      document.body.scrollLeft += event.deltaY;
    }, { passive: false });
    const pool = setInterval(() => setDateState(new Date()), 30000);

    if (!(typeof window !== 'undefined' && window.localStorage.getItem('tabla')?.length)) {
      form.updateValues({
        rawJson: {website: [
          'https://www.nytimes.com/games/wordle/index.html', 'https://worldle.teuteuf.fr/'
        ]}
      })
    }

    return () => {
      clearInterval(pool);
    }
  }, [])
  return (
    <div className="app relative">
      <Head>
        <title>Tabla</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="module" src="https://unpkg.com/figma-plugin-bypass"></script>
      </Head>
      
      <div className="fixed top-0 left-0 right-0 pt-6">
        <h2 className='order-first font-semibold text-lg tracking-wide text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text'>Tabla</h2>
        <h1 className='text-2xl font-extrabold uppercase text-transparent tracking-tighest sm:text-3xl lg:text-5xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text'>{format(dateState, "hh.mm aaaaa'm'")}</h1>
        <div className='text-xl'>{format(dateState, "LLLL dd", {locale: enUS})}</div>
        <button className="absolute top-4 right-4 w-10 h-10 flex justify-center items-center bg-opacity-20 rounded-full dark-bg" onClick={() => {
          if (cms.enabled) { 
            document.body.style.paddingLeft = '0';
            cms.disable();
          } else {
            cms.enable();
          }
        }}>
          <img src='/settings.svg' alt='settings' className='w-6 h-6'/>
        </button>
      </div>
      <div className="wrap space-x-6 p-4 pb-6">
        {data.rawJson.website.length === 0 ? <div>Add your website <a href="#" className='text-red-500' onClick={() => cms.enable()}>here</a></div> : null}
          {data.rawJson.website.map((item: any, i: number) => {
            return (
              <div className="tab" key={'tab-'+item}>
                <iframe loading="lazy" key={'frame-'+item} style={frameStyle} src={item} {...(item.toLowerCase().includes('nytimes.com/games/wordle')? {is: 'x-frame-bypass'} : null)} />
              </div>
            )
          })}
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
