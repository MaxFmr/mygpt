import { useState } from 'react';

interface Answer {
  role: string;
  content: string;
}

const Form = (): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer>();

  //make a request to openAI api

  function OpenaiFetchAPI() {
    console.log('Calling GPT3');
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

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
        // console.log(typeof data);
        // console.log(Object.keys(data));
        // console.log(data['choices'][0].text);
        setAnswer(data['choices'][0].message);
      })
      .catch((error) => {
        console.log('Something bad happened ' + error);
      });
  }

  //get the response
  //display the response

  return (
    <div>
      <label htmlFor=''>Question : </label>
      <input
        type='text'
        className='m-2 border-2 border-black rounded-md w-100'
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <button
        className='border-2 border-black p-1 bg-slate-300 br-2 hover:bg-slate-400 rounded-md'
        onClick={() => {
          OpenaiFetchAPI();
        }}>
        Valider
      </button>
      <div>{answer && answer.content}</div>
    </div>
  );
};
export default Form;
