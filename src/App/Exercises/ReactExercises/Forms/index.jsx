import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  course: yup
    .string()
    .oneOf(['10', '20'], 'Wybierz kurs!')
    .required('To pole jest wymagane!'),
  payMethod: yup
    .array()
    .min(1, 'Wybierz metodę płatności!')
    .max(1, 'Możesz wybrać tylko jedną!')
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
  createAccount: yup.boolean().default(false),
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
      payMethod: [],
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '350px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="course">Wybierz produkt:</label>
        <select {...register('course')}>
          <option value="0">wybierz kurs</option>
          <option value="10">kurs front-end</option>
          <option value="20">kurs-backend</option>
        </select>
        <p style={{ color: 'red' }}>{errors.course?.message}</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="blik">blik</label>
        <input type="checkbox" {...register('payMethod')} />
        <label htmlFor="paypal">paypal</label>
        <input type="checkbox" {...register('payMethod')} />
        <label htmlFor="traditional">tradycyjny przelew</label>
        <input type="checkbox" {...register('payMethod')} />
        <p style={{ color: 'red' }}>{errors.payMethod?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="name">Imię i nazwisko:</label>
        <input {...register('name')} />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="nick">Twój pseudonim:</label>
        <input {...register('nick')} />
        <p style={{ color: 'red' }}>{errors.nick?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="address">Adres do wysyłki:</label>
        <input {...register('address')} />
        <p style={{ color: 'red' }}>{errors.address?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="email">Adres e-mail:</label>
        <input {...register('email')} />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="number">Numer kontaktowy</label>
        <input {...register('number')} />
        <p style={{ color: 'red' }}>{errors.number?.message}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="moreInfo">Dodatkowe uwagi do zamówienia</label>
        <textarea {...register('moreInfo')} />
        <p style={{ color: 'red' }}>{errors.moreInfo?.message}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label htmlFor="checkbox">zakładam konto</label>
        <input type="checkbox" {...register('createAccount')} />
        <p style={{ color: 'red' }}>{errors.createAccount?.message}</p>
      </div>

      <input type="submit" />
    </form>
  );
}
