import { FormEvent, useRef } from 'react';
import './App.css';

function App() {
  const buttonRef = useRef(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget, buttonRef.current);
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/',
      {
        method: 'POST',
        body: JSON.stringify({
          id: 1,
          userID: 1,
          title: formData.get('title'),
          body: formData.get('body'),
        }),
      }
    );
    const data = await response.json();
    formData.set('title', '');
    formData.set('body', '');
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='container min-h-screen flex flex-col gap-3 p-4'
      >
        <label className='text-3xl'>Create a Post</label>
        <label className='text-lg text-blue-500' htmlFor='title'>
          Title
        </label>
        <input
          type='text'
          className='rounded-lg p-2 outline-0 border-2'
          id='title'
          name='title'
          placeholder='Enter the title'
          required
        />
        <label className='text-lg text-blue-500' htmlFor='body'>
          Body
        </label>
        <textarea
          className='rounded-lg p-2 outline-0 border-2 '
          id='body'
          name='body'
          placeholder='Enter the body'
          required
          readOnly
        />
        <div className='flex gap-2'>
          <button
            ref={buttonRef}
            className='rounded-lg text-white bg-blue-500 p-2 flex-1'
            type='submit'
          >
            Submit
          </button>
          <button
            className='rounded-lg text-white bg-zinc-500 p-2 flex-1'
            type='reset'
          >
            Reset
          </button>
        </div>
      </form>
      <output id='output'></output>
    </>
  );
}

export default App;
