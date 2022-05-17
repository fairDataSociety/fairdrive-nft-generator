import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { LoginForm } from '@components/Forms';

const Home: NextPage = () => {
  return (
    <AuthenticationLayout>
      <LoginForm />
    </AuthenticationLayout>
  );
};

export default Home;
