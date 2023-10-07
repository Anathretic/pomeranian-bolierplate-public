import { useState } from 'react';

import * as yup from 'yup';

const schema = yup.object({
  inputValue: yup.string().length(4, 'Maks. 4 znaki!'),
});

export const ControlledForm = () => {
  const [inputValue, setInputValue] = useState('Hello');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log(`Input value: ${inputValue}`);
    schema
      .validate({ inputValue })
      .then((data) => console.log(data))
      .catch(console.log);
  };

  return (
    <div>
      <h2>Controlled component / form</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
