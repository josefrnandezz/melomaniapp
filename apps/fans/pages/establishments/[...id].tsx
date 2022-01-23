import { useEstablishment } from '@melomaniapp/hooks';
import { FanLayout } from '@melomaniapp/ui';
import { useRouter } from 'next/router';

export const EstablishmentPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const establishment = useEstablishment(id as string);

  return (
    <FanLayout>
      <div>{establishment?.name}</div>
    </FanLayout>
  );
};

export default EstablishmentPage;
