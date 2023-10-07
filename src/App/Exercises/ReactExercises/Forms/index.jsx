import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const phoneRegExp =
  /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/;

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = yup.object({
  course: yup
    .string()
    .oneOf(['10', '20'], 'Wybierz kurs!')
    .required('To pole jest wymagane!'),
  payMethod: yup.string().required('To pole jest wymagane!'),
  extraOption: yup
    .array()
    .min(1, 'Wybierz chociaż jedno!')
    .of(yup.string().required())
    .required('To pole jest wymagane!'),
  name: yup
    .string()
    .matches(/^[A-Za-z]*$/, 'Proszę, podaj prawidłowe dane!')
    .max(30, 'Maks. 30 znaków!')
    .required('To pole jest wymagane!'),
  nick: yup
    .string()
    .max(18, 'Maks. 18 znaków!')
    .required('To pole jest wymagane!'),
  address: yup
    .string()
    .min(5, 'Wpisz poprawny adres - min. 5 znaków!')
    .required('To pole jest wymagane!'),
  email: yup
    .string()
    .email('Wpisz poprawny e-mail!')
    .required('To pole jest wymagane!'),
  number: yup
    .string()
    .matches(phoneRegExp, 'Nieprawidłowy numer telefonu!')
    .required('To pole jest wymagane!'),
  moreInfo: yup
    .string()
    .min(35, 'Min. 35 znaków')
    .required('To pole jest wymagane!'),
  createAccount: yup.boolean(),
  password: yup.string().when('createAccount', {
    is: true,
    then: () =>
      yup
        .string()
        .matches(
          passwordRegExp,
          'Hasło powinno zawierać conajmniej 1 małą literę, 1 dużą literę, 1 znak specjalny i musi mieć min. 8 znaków!'
        ),
  }),
  checkPassword: yup.string().when('createAccount', {
    is: true,
    then: () =>
      yup
        .string()
        .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać!')
        .required('To pole jest wymagane!'),
  }),
  regulations: yup
    .boolean()
    .oneOf([true], 'Pole obowiązkowe!')
    .required('To pole jest wymagane!'),
  newsletter: yup.boolean(),
});

export function Forms() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      extraOption: [],
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '350px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="course">Wybierz produkt:</label>
        <select id="course" {...register('course')}>
          <option value="0">wybierz kurs</option>
          <option value="10">kurs front-end</option>
          <option value="20">kurs-backend</option>
        </select>
        {errors.course && (
          <p style={{ color: 'red' }}>{errors.course?.message}</p>
        )}
      </div>

      <fieldset
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <legend>Wybierz formę płatności</legend>
        <label>
          <input type="radio" {...register('payMethod')} />
          blik
        </label>
        <label>
          <input type="radio" {...register('payMethod')} />
          paypal
        </label>
        <label>
          <input type="radio" {...register('payMethod')} />
          tradycyjny przelew
        </label>
        {errors.payMethod && (
          <p style={{ color: 'red' }}>{errors.payMethod?.message}</p>
        )}
      </fieldset>

      <fieldset
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <legend>Opcje dodatkowe do zamówienia</legend>
        <label>
          <input type="checkbox" {...register('extraOption')} />
          ustawienia środowiska
        </label>
        <label>
          <input type="checkbox" {...register('extraOption')} />
          intro do GitHuba
        </label>
        <label>
          <input type="checkbox" {...register('extraOption')} />
          materiały dodatkowe
        </label>
        {errors.extraOption && (
          <p style={{ color: 'red' }}>{errors.extraOption?.message}</p>
        )}
      </fieldset>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="name">Imię i nazwisko:</label>
        <input id="name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name?.message}</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="nick">Twój pseudonim:</label>
        <input id="nick" {...register('nick')} />
        {errors.nick && <p style={{ color: 'red' }}>{errors.nick?.message}</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="address">Adres do wysyłki:</label>
        <input id="address" {...register('address')} />
        {errors.address && (
          <p style={{ color: 'red' }}>{errors.address?.message}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="email">Adres e-mail:</label>
        <input id="email" {...register('email')} />
        {errors.email && (
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="number">Numer kontaktowy</label>
        <input id="number" {...register('number')} />
        {errors.number && (
          <p style={{ color: 'red' }}>{errors.number?.message}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="moreInfo">Dodatkowe uwagi do zamówienia</label>
        <textarea id="moreInfo" {...register('moreInfo')} />
        {errors.moreInfo && (
          <p style={{ color: 'red' }}>{errors.moreInfo?.message}</p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label>
          <input type="checkbox" {...register('createAccount')} />
          zakładam konto
        </label>
        {errors.createAccount && (
          <p style={{ color: 'red' }}>{errors.createAccount?.message}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="password">Moje hasło:</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="checkPassword">Powtórz hasło:</label>
        <input
          id="checkPassword"
          type="password"
          {...register('checkPassword')}
        />
        {errors.checkPassword && (
          <p style={{ color: 'red' }}>{errors.checkPassword?.message}</p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label>
          <input type="checkbox" {...register('regulations')} />
          akceptuję regulamin
        </label>
        {errors.regulations && (
          <p style={{ color: 'red' }}>{errors.regulations?.message}</p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label>
          <input type="checkbox" {...register('newsletter')} />
          zapisuję się na listę mailignową
        </label>
        {errors.newsletter && (
          <p style={{ color: 'red' }}>{errors.newsletter?.message}</p>
        )}
      </div>

      <input type="submit" />
    </form>
  );
}
