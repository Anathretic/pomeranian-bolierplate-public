import { CookieStorage } from './CookieStorage';
import { LocaleStorage } from './LocalStorage';
import { SessionStorage } from './SessionStorage';

export const JsonXmlStorage = () => {
  const jsonString = `{
    "name": "John",
    "surname": "Doe",
    "age": 30,
    "cars": ["Ford", "BMW", "Fiat"],
    "isAdult": true
  }`;
  const parsedJson = JSON.parse(jsonString);

  // parsowanie - deserializacja (zamiana tekstu w formacie jSON na obiekt JS)
  // stringify - serializacja (zamiana obiektu JS na tekst w formacie JSON)
  // !!!!! UNDEFINED NIE DA SIĘ DESERIALIZOWAĆ !!!!!

  return (
    <div>
      <LocaleStorage />
      <SessionStorage />
      <CookieStorage />
      <h1 style={{ textDecoration: 'underline' }}>JsonXMLStorage</h1>
      <h2>Kim jest JSON?</h2>
      <ul>
        <li>JavaScript Object Notation</li>
        <li>Lekki format wymiany danych</li>
        <li>Może być wykorzystywany przez różne języki programowania</li>
        <li>
          Format JSON może być bezpośrednio przetworzony na obiekt JavaScript
        </li>
        <li>
          Internet Media Type = application/json (formerly known as a MIME type)
        </li>
        <li>Rozszerzenie pliku - .json</li>
      </ul>
      <h2>Parsowanie/Stringify - JSON</h2>
      <p>
        Stringify - <strong>{jsonString}</strong>
      </p>
      <span style={{ paddingTop: '10px' }}>Parsowanie:</span>
      <ul style={{ margin: 0 }}>
        <li>
          Imię: <strong>{parsedJson.name}</strong>
        </li>
        <li>
          Nazwisko: <strong>{parsedJson.surname}</strong>
        </li>
        <li>
          Wiek: <strong>{parsedJson.age}</strong>
        </li>
        <li>
          Samochody: <strong>{parsedJson.cars.join(', ')}</strong>
        </li>
        <li>
          Czy jest dorosły?{' '}
          <strong>
            {parsedJson.isAdult ? 'Jest dorosły' : 'Nie ma 18 lat!'}
          </strong>
        </li>
      </ul>
      <h2>Co to XML?</h2>
      <ul>
        <li>Język znaczników zwany Extensible Markup Language</li>
        <li>Ciężki format wymiany danych</li>
        <li>Charakteryzuje się znacznikami początku i końca</li>
        <li>Rozszerzenie pliku - .xml</li>
      </ul>
      <h2>Czym jest Storage?</h2>
      <ul>
        <li>
          <strong>LocalStorage</strong> - dane przechowywane w pamięci
          przeglądarki do czasu usunięcia przez użytkownika, lub z poziomu JS
        </li>
        <li>
          <strong>SessionStorage</strong> - dane przechowywane do czasu
          zamknięcia karty/okna przeglądarki
        </li>
        <li>
          <strong>CookiesStorage</strong> - dane przesyłane z serwera do
          przeglądarki, są przechowywane jako pliki tekstowe na komputerze. Określane dodatkowymi opcjami jak np. parametr Expires
        </li>
      </ul>
    </div>
  );
};
