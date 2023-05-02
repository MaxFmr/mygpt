import { useState } from 'react';

const Form = (): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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
        messages: [{ role: 'user', content: 'Hello!' }],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // console.log(typeof data);
        // console.log(Object.keys(data));
        // console.log(data['choices'][0].text);
        // setAnswer(data['choices'][0].text);
      })
      .catch((error) => {
        console.log('Something bad happened ' + error);
      });
  }

  //get the response
  //display the response

  return (
    <div>
      <label htmlFor=''>Question</label>
      <input
        type='text'
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      />
      <button
        onClick={() => {
          OpenaiFetchAPI();
        }}>
        Valider
      </button>
    </div>
  );
};
export default Form;
