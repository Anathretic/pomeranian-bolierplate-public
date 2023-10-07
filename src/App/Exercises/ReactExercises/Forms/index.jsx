import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './styles.css';

const phoneRegExp =
  /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/;

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const errorMessages = {
  requiredField: 'To pole jest wymagane!',
};

const schema = yup.object({
  course: yup
    .string()
    .oneOf(['10', '20'], 'Wybierz kurs!')
    .required(errorMessages.requiredField),
  payMethod: yup.string().required('Wybierz formę płatności!'),
  extraOption: yup
    .array()
    .min(1, 'Wybierz chociaż jedno! - jest gratis :)')
    .of(yup.string().required())
    .required(errorMessages.requiredField),
  name: yup
    .string()
    .matches(/^[A-Za-z]*$/, 'Proszę, podaj prawidłowe dane!')
    .max(30, 'Maks. 30 znaków!')
    .required(errorMessages.requiredField),
  nick: yup
    .string()
    .max(18, 'Maks. 18 znaków!')
    .required(errorMessages.requiredField),
  address: yup
    .string()
    .min(5, 'Wpisz poprawny adres - min. 5 znaków!')
    .required(errorMessages.requiredField),
  email: yup
    .string()
    .email('Wpisz poprawny e-mail!')
    .required(errorMessages.requiredField),
  number: yup
    .string()
    .matches(phoneRegExp, 'Nieprawidłowy numer telefonu!')
    .required(errorMessages.requiredField),
  moreInfo: yup.string(),
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
        .required(errorMessages.requiredField),
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
    <form onSubmit={handleSubmit(onSubmit)} className="order-form">
      <div className="order-form-container">
        <h2>zamówienie produktu</h2>
        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="course">
            Wybierz produkt*
          </label>
          <select
            aria-invalid={errors.course ? true : false}
            id="course"
            {...register('course')}
          >
            <option value="0">wybierz kurs</option>
            <option value="10">kurs front-end</option>
            <option value="20">kurs-backend</option>
          </select>
          {errors.course && (
            <p className="order-form-box-error">{errors.course?.message}</p>
          )}
        </div>

        <fieldset className="order-form-box">
          <legend className="order-form-box-title">
            Wybierz formę płatności*
          </legend>
          <label className={`${errors.payMethod && 'text-error'}`}>
            <input
              className="order-form-box-radio"
              type="radio"
              {...register('payMethod')}
            />
            blik
          </label>
          <label className={`${errors.payMethod && 'text-error'}`}>
            <input
              className="order-form-box-radio"
              type="radio"
              {...register('payMethod')}
            />
            paypal
          </label>
          <label className={`${errors.payMethod && 'text-error'}`}>
            <input
              className="order-form-box-radio"
              type="radio"
              {...register('payMethod')}
            />
            tradycyjny przelew
          </label>
          {errors.payMethod && (
            <p className="order-form-box-error">{errors.payMethod?.message}</p>
          )}
        </fieldset>

        <fieldset className="order-form-box">
          <legend className="order-form-box-title">
            Opcje dodatkowe do zamówienia
          </legend>
          <label className={`${errors.extraOption && 'text-error'}`}>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('extraOption')}
            />
            ustawienia środowiska
          </label>
          <label className={`${errors.extraOption && 'text-error'}`}>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('extraOption')}
            />
            intro do GitHuba
          </label>
          <label className={`${errors.extraOption && 'text-error'}`}>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('extraOption')}
            />
            materiały dodatkowe
          </label>
          {errors.extraOption && (
            <p className="order-form-box-error">
              {errors.extraOption?.message}
            </p>
          )}
        </fieldset>
      </div>

      <div className="order-form-container">
        <h2>dane do realizacji zamówienia</h2>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="name">
            Imię i nazwisko*
          </label>
          <input
            aria-invalid={errors.name ? true : false}
            className="order-form-box-userdata-input"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <p className="order-form-box-error">{errors.name?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="nick">
            Twój pseudonim*
          </label>
          <input
            aria-invalid={errors.nick ? true : false}
            className="order-form-box-userdata-input"
            id="nick"
            {...register('nick')}
          />
          {errors.nick && (
            <p className="order-form-box-error">{errors.nick?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="address">
            Adres do wysyłki*
          </label>
          <input
            aria-invalid={errors.address ? true : false}
            className="order-form-box-userdata-input"
            id="address"
            {...register('address')}
          />
          {errors.address && (
            <p className="order-form-box-error">{errors.address?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="email">
            Adres e-mail*
          </label>
          <input
            aria-invalid={errors.email ? true : false}
            className="order-form-box-userdata-input"
            id="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="order-form-box-error">{errors.email?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="number">
            Numer kontaktowy*
          </label>
          <input
            aria-invalid={errors.number ? true : false}
            className="order-form-box-userdata-input"
            id="number"
            {...register('number')}
          />
          {errors.number && (
            <p className="order-form-box-error">{errors.number?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label className="order-form-box-title" htmlFor="moreInfo">
            Dodatkowe uwagi do zamówienia
          </label>
          <textarea
            aria-invalid={errors.moreInfo ? true : false}
            className="order-form-box-userdata-textarea"
            id="moreInfo"
            {...register('moreInfo')}
          />
          {errors.moreInfo && (
            <p className="order-form-box-error">{errors.moreInfo?.message}</p>
          )}
        </div>
      </div>

      <div className="order-form-container">
        <h2>zakładanie konta</h2>

        <div className="order-form-box">
          <p className="order-form-box-instruction">
            Chcę założyć konto razem z zamówieniem
          </p>
          <label>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('createAccount')}
            />
            zakładam konto
          </label>
          {errors.createAccount && (
            <p className="order-form-box-error">
              {errors.createAccount?.message}
            </p>
          )}
        </div>

        <div className="order-form-box">
          <label htmlFor="password">Moje hasło:</label>
          <input
            aria-invalid={errors.password ? true : false}
            className="order-form-box-password-input"
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <p className="order-form-box-error">{errors.password?.message}</p>
          )}
        </div>

        <div className="order-form-box">
          <label htmlFor="checkPassword">Powtórz hasło:</label>
          <input
            aria-invalid={errors.checkPassword ? true : false}
            className="order-form-box-password-input"
            id="checkPassword"
            type="password"
            {...register('checkPassword')}
          />
          {errors.checkPassword && (
            <p className="order-form-box-error">
              {errors.checkPassword?.message}
            </p>
          )}
        </div>
      </div>

      <div className="order-form-container">
        <h2>zgody i newsletter</h2>

        <div className="order-form-box">
          <p className="order-form-box-instruction">
            Realizując zamówienie, akceptujesz regulamin naszego sklepu
          </p>
          <label>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('regulations')}
            />
            <span className={`${errors.regulations && 'text-error'}`}>
              akceptuję regulamin*
            </span>
          </label>
          {errors.regulations && (
            <p className="order-form-box-error">
              {errors.regulations?.message}
            </p>
          )}
        </div>

        <div className="order-form-box">
          <p className="order-form-box-instruction">
            Dołącz do naszego newsletter z promocjami dla naszych klientów
          </p>
          <label>
            <input
              className="order-form-box-checkbox"
              type="checkbox"
              {...register('newsletter')}
            />
            zapisuję się na listę mailignową
          </label>
          {errors.newsletter && (
            <p className="order-form-box-error">{errors.newsletter?.message}</p>
          )}
        </div>
      </div>

      
        <div className="order-form-box">
          <input
            className="order-form-submit-btn"
            type="submit"
            value="Składam zamówienie"
          />
        </div>
      
    </form>
  );
}
