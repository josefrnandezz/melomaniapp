import { getProviders, signIn } from 'next-auth/react';
import { Button, Typography } from 'antd';
import { callbackify } from 'util';

type Provider = {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
};

type SignInProps = {
  providers: Provider[];
};

const SignIn = ({ providers }: SignInProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <Button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              type="primary"
            >
              <Typography.Text>Sign in with {provider.name}</Typography.Text>
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
