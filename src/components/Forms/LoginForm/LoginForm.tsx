import { FC, useContext, useState } from 'react';
import router from 'next/router';
import { useForm } from 'react-hook-form';

import UserContext from '@context/UserContext';
import PodContext from '@context/PodContext';

import { login, userStats } from '@api/authentication';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';

const LoginForm: FC = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { setUser, setPassword, setAddress } = useContext(UserContext);
  const { clearPodContext } = useContext(PodContext);

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data: { user_name: string; password: string }) => {
    login(data)
      .then(() => {
        setUser(data.user_name);
        setPassword(data.password);

        userStats()
          .then((res) => {
            setAddress(res.data.reference);
            clearPodContext();
            router.push('/gallery');
          })
          .catch(() => {
            setErrorMessage(
              'Login failed. Incorrect user credentials, please try again.'
            );
          });
      })
      .catch(() => {
        setErrorMessage(
          'Login failed. Incorrect user credentials, please try again.'
        );
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        title="Welcome back"
        content="Please log in to get access to your images."
      />

      <div className="w-98 mt-8">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="username"
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.user_name}
            errorMessage="Username or e-mail is required"
          />

          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.password}
            errorMessage="Password is required"
          />

          <div className="mt-14 text-center">
            <Button type="submit" variant="secondary" label="Login" />
          </div>

          <div className="my-6 text-center">
            <a
              href="https://fairdrive.vercel.app/register"
              target="_blank"
              rel="noreferrer"
              className="font-normal text-xs text-color-accents-purple-black"
            >
              Don&apos;t have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
