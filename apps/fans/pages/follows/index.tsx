import { PageHeader, Spin, Tabs } from 'antd';
import { useSession } from 'next-auth/client';
import React from 'react';
import { ArtistsFollowedList } from '../../components/follows/ArtistsFollowedList';
import { EstablishmentsFollowedList } from '../../components/follows/EstablishmentsFollowedList';
import { EventsFollowedList } from '../../components/follows/EventsFollowedList';
import { GenresFollowedList } from '../../components/follows/GenresFollowedList';

const Follows: React.FC = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <PageHeader
      style={{ margin: 'auto', borderRadius: '20px' }}
      ghost={false}
      onBack={() => window.history.back()}
      title="Subscripciones"
    >
      <Tabs>
        <Tabs.TabPane tab="Eventos" key="events">
          <EventsFollowedList session={session} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Artistas" key="artists">
          <ArtistsFollowedList session={session} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Establecimientos" key="establishments">
          <EstablishmentsFollowedList session={session} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Géneros" key="genres">
          <GenresFollowedList session={session} />
        </Tabs.TabPane>
      </Tabs>
    </PageHeader>
  );
};

export default Follows;
