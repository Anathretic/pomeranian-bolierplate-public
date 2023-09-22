import { useEffect, useState } from 'react';

import './style.css';
import { InputValidator } from './InputValidator';

export function TryCatchAndFinally() {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      throw new Error(`Ups, masz nowy error.. ${error}`);
    } finally {
      console.log('Wykonam się niezależnie czy API się położy, czy nie');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container--errors-prototypes-this">
      <p>Name: {userData?.name}</p>
      <p>Username: {userData?.username}</p>
      <InputValidator />
    </div>
  );
}
