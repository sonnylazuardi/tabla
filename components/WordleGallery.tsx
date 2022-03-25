import React from 'react';
import { publish } from "../utils/pubsub"

const gallery = [
  {
    label: 'Wordle 🇺🇸',
    value: 'https://www.nytimes.com/games/wordle/index.html'
  },
  {
    label: 'Worldle 🌏',
    value: 'https://worldle.teuteuf.fr/'
  },
  {
    label: 'Katla 🇮🇩',
    value: 'https://katla.vercel.app'
  }, 
  {
    label: 'Kotla 🇮🇩',
    value: 'https://kotla.vercel.app'
  }, 
  {
    label: 'Globle Game 🌏',
    value: 'https://globle-game.com/'
  },
  {
    label: 'Nerdle 🧮',
    value: 'https://nerdlegame.com/'
  }, 
  {
    label: 'Keclap 🇮🇩',
    value: 'https://keclap.vercel.app/'
  }, 
  {
    label: 'Batangan 🇮🇩',
    value: 'https://batangan.lantip.xyz/'
  }, 
  {
    label: 'Chengyu 🇨🇳',
    value: 'https://cheeaun.github.io/chengyu-wordle/'
  },
  {
    label: 'Word-leh 🇸🇬',
    value: 'https://www.word-leh.com/'
  },
  {
    label: 'Ketapat 🇲🇾',
    value: 'https://www.projecteugene.com/katapat.html'
  }
]

export default function WordleGallery({ field, input, meta }: any) {
  return (
    <>
      <div className="mb-6">
        <div className="mb-4">
          <label className="font-bold text-sm">Wordle Gallery (Quick Add)</label>
        </div>
        <div className='w-full flex flex-row flex-wrap space-x-2'>
          {gallery.map((item, i: number) => {
            return (
              <div className='chip' key={i} onClick={() => {
                const result = {...item};
                publish('gallery', result);
                input.onChange(JSON.stringify(result));
              }}>{item.label}</div>
            )
          })}
        </div>
        <input
          className="hidden"
          {...input}
        />
      </div>
    </>
  );
}

export const wordleGalleryFieldPlugin = {
  __type: 'field',
  Component: WordleGallery, // Extend the built-in text field
  name: 'wordle-gallery',
};
