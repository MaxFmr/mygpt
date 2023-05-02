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

  //make a request to openAI api

  function openaiFetchAPI() {
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
            content: `Génère moi un quizz sur le thème de ${theme} `,
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data['choices'][0]);
        setAnswer(data['choices'][0].message);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Something bad happened ' + error);
      });
  }

  return (
    <div>
      <h1>Welcome on My GPT Quizz Générator!</h1>
      <label htmlFor=''>Thème : </label>

      <input
        type='text'
        className='m-2 border-2 border-black rounded-md w-100 text-stone-800 px-2'
        onChange={(e) => {
          setTheme(e.target.value);
        }}
      />
      <button
        className='border-2 border-black px-2 py-1 bg-slate-300 br-2 hover:bg-slate-400 rounded-md'
        onClick={() => {
          openaiFetchAPI();
        }}>
        Valider
      </button>
      <div>{loading ? <Loader /> : answer?.content}</div>
    </div>
  );
};
export default Form;
