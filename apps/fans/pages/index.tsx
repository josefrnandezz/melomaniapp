import { FanLayout } from '@melomaniapp/ui';
import { Typography } from 'antd';

import { useSession } from 'next-auth/react';

export function Index() {
  const { data: session } = useSession();

  return (
    <FanLayout session={session}>
      <Typography.Title>
        Welcome {session ? session.user.name : 'to Melomaniapp'}
      </Typography.Title>
    </FanLayout>
  );
}

export default Index;
