import { useState } from 'react';
import Loader from './Loader';

interface Answer {
  role: string;
  content: string;
}

const Form = (): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer>();
  const [loading, setLoading] = useState(false);

  //make a request to openAI api

  function openaiFetchAPI() {
    setLoading(true);
    var url = 'https://api.openai.com/v1/chat/completions';
    var bearer = 'Bearer ' + process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
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
      <h1>Welcome on My GPT !</h1>
      <label htmlFor=''>Question : </label>
      <input
        type='text'
        className='m-2 border-2 border-black rounded-md w-100 text-stone-800 px-2'
        onChange={(e) => {
          setQuestion(e.target.value);
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
