import { useState } from 'react';
import Loader from './Loader';

//Data Typing

interface Answer {
  role: string;
  content: string;
}

interface Question {
  id: number;
  text: string;
  answer: string;
}
interface Quizz {
  questions: Question[];
}

//Component

const Form = (): JSX.Element => {
  const [answer, setAnswer] = useState<Answer>();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('');
  const [level, setLevel] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  //make a request to openAI api

  function openaiFetchAPI() {
    const quizModel: Quizz = {
      questions: [
        {
          id: 1,
          text: 'Quelle est la capitale de la France ?',
          answer: 'Paris',
        },
      ],
    };

    setLoading(true);
    const url = 'https://api.openai.com/v1/chat/completions';
    const bearer = 'Bearer ' + process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Sur le modèle de ${quizModel}, Génère moi un qcm de ${numberOfQuestions} questions de niveau ${level} sur le thème de ${theme}.`,
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAnswer(data['choices'][0].message);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Something bad happened ' + error);
      });
  }

  return (
    <div>
      <h1>Welcome on My GPT Quizz Générator !</h1>

      <div className='flex-col'>
        <label htmlFor=''>Thème : </label>

        <input
          type='text'
          className='m-2 border-2 border-black rounded-md w-100 text-stone-800 px-2'
          onChange={(e) => {
            setTheme(e.target.value);
          }}
        />
        <label>Niveau : </label>

        <select
          className='rounded-md text-stone-800 mr-2'
          onChange={(e) => setLevel(e.target.value)}>
          <option value=''>Choisir</option>
          <option value='primaire'>Primaire</option>
          <option value='collège'>Collège</option>
          <option value='seconde'>Seconde</option>
          <option value='première'>Première</option>
          <option value='terminale'>Terminale</option>
          <option value='bts'>BTS</option>
        </select>

        <label>Nombre de questions : </label>

        <input
          type='number'
          min={3}
          max={10}
          onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
          className='m-2 border-2 border-black rounded-md w-100 text-stone-800 px-2 ml-2'
        />
        <button
          className=' ml-2 border-2 border-black px-2 py-1 bg-slate-300 br-2 hover:bg-slate-400 rounded-md'
          onClick={() => {
            openaiFetchAPI();
          }}>
          Valider
        </button>
        <div>{loading ? <Loader /> : answer?.content}</div>
      </div>
    </div>
  );
};
export default Form;
