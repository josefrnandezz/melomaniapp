import { EventDTO } from '@melomaniapp/contracts/event';

export const getMockEvents = (): { data: EventDTO[]; error?: any } => ({
  data: [
    {
      _id: '5DACD3E1-61E5-46B4-8CE3-94BACED5A005',
      name: 'Concierto C.Tangana',
      description: 'Primer concierto de C.Tangana en Córdoba',
      artistIds: ['95E3D553-43D8-4F91-A1C9-4E2B92CACA60'],
      establishmentId: 'CA1BEDC1-0DD5-4EE7-90B3-1D257D3CA8DA',
      genreIds: [
        '236F1504-5A99-4489-8DC1-530F6ACF6387',
        'F4CC582A-2EBF-4A52-A1D5-EEE67230E501',
      ],
      userId: 'e29d19e4-fec0-4b04-a9a7-65c34781afd1',
      startsAt: new Date(),
      endsAt: new Date(),
      address: {
        full: 'Av. de Chinales, 18',
        city: 'Córdoba',
      },
    },
    {
      _id: '5DACD3E1-61E5-46B4-8CE3-94BACED5A005',
      name: 'Concierto de Mecano',
      description: 'Primer concierto de C.Tangana en Córdoba',
      artistIds: ['95E3D553-43D8-4F91-A1C9-4E2B92CACA60'],
      establishmentId: 'CA1BEDC1-0DD5-4EE7-90B3-1D257D3CA8DA',
      genreIds: ['236F1504-5A99-4489-8DC1-530F6ACF6387'],
      userId: 'e29d19e4-fec0-4b04-a9a7-65c34781afd1',
      startsAt: new Date(),
      endsAt: new Date(),
      address: {
        full: 'Av. de Chinales, 18',
        city: 'Córdoba',
      },
    },
    {
      _id: '5DACD3E1-61E5-46B4-8CE3-94BACED5A005',
      name: 'Gira Motomami',
      description: 'Primer concierto de C.Tangana en Córdoba',
      artistIds: ['27F6AB17-55B8-4007-9D6D-D80AE21A1CF1'],
      establishmentId: 'CA1BEDC1-0DD5-4EE7-90B3-1D257D3CA8DA',
      genreIds: [
        '97BFFBBD-E37E-4D25-AE65-CF15E3B15BFD',
        '13036B6F-F032-4448-840A-F1BDCC6166C1',
      ],
      userId: 'e29d19e4-fec0-4b04-a9a7-65c34781afd1',
      startsAt: new Date(),
      endsAt: new Date(),
      address: {
        full: 'Av. de Chinales, 18',
        city: 'Córdoba',
      },
    },
    {
      _id: '5DACD3E1-61E5-46B4-8CE3-94BACED5A005',
      name: 'Concierto C.Tangana',
      description: 'Primer concierto de C.Tangana en Córdoba',
      artistIds: ['95E3D553-43D8-4F91-A1C9-4E2B92CACA60'],
      establishmentId: 'CA1BEDC1-0DD5-4EE7-90B3-1D257D3CA8DA',
      genreIds: [
        '236F1504-5A99-4489-8DC1-530F6ACF6387',
        'F4CC582A-2EBF-4A52-A1D5-EEE67230E501',
      ],
      userId: 'e29d19e4-fec0-4b04-a9a7-65c34781afd1',
      startsAt: new Date(),
      endsAt: new Date(),
      address: {
        full: 'Av. de Chinales, 18',
        city: 'Córdoba',
      },
    },
  ],
});
