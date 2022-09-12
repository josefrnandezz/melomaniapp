import { useEstablishment } from '@melomaniapp/hooks';
import { EstablishmentForm } from '@melomaniapp/ui';
import { Card, Spin } from 'antd';
import { useSession } from 'next-auth/client';
import { Layout } from '../../components/layout/Layout';

export const EditEstablishmentProfile: React.FC = () => {
  const [session] = useSession();

  const { data: establishment, isLoading } = useEstablishment(
    'CA1BEDC1-0DD5-4EE7-90B3-1D257D3CA8DA'
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Spin size="large" style={{ margin: 'auto' }} />;
      </div>
    );
  }

  const onSubmit = () => {
    console.log('YAY');
  };

  return (
    <Layout session={session}>
      <Card style={{ borderRadius: '20px', marginBottom: '70px' }}>
        <EstablishmentForm establishment={establishment} />
      </Card>
    </Layout>
  );
};

export default EditEstablishmentProfile;
