import { useRef } from 'react';
import { ref } from 'yup';

export const UncontrolledForm = () => {
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log(myRef?.current);
    console.log(myRef?.current.value);
    myRef.current.value = 'Bye bye';
    console.log('Event target: ', event.target);
    for (const element of event.target) {
      console.log(element.name, element.value);
    }
  };

  const myRef = useRef(null);

  return (
    <div>
      <h2>Uncontrolled component / form</h2>
      <form onSubmit={handleOnSubmit}>
        <input name="with-ref" type="text" ref={myRef} />
        <input name="without-ref" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
