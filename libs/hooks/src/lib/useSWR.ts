import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { EventDTO } from '@melomaniapp/contracts/event';
import { UserDto } from '@melomaniapp/contracts/user';
import { FollowDTO, FollowType } from '@melomaniapp/contracts/follow';
import useSWR from 'swr';

export type Response<T> = {
  data: T;
  isLoading: boolean;
  isError: Error;
};

export const useGenres = (): Response<GenreDTO[]> => {
  const { data, error } = useSWR(['api/genres'], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useGenre = (id: string): Response<GenreDTO> => {
  const { data, error } = useSWR([`api/genres/${id}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEstablishments = (): Response<EstablishmentDTO[]> => {
  const { data, error } = useSWR(['api/establishments'], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEstablishment = (id: string): Response<EstablishmentDTO> => {
  const { data, error } = useSWR([`api/establishments/${id}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useArtists = (): Response<ArtistDTO[]> => {
  const { data, error } = useSWR(['api/artists'], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useArtist = (id: string): Response<ArtistDTO> => {
  const { data, error } = useSWR([`api/artists/${id}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEvents = (): Response<EventDTO[]> => {
  const { data, error } = useSWR(['api/events'], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEvent = (id: string): Response<EventDTO | undefined> => {
  const { data, error } = useSWR([`api/events/${id}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEventsByEstablishment = (
  establishmentId: string
): Response<EventDTO[]> => {
  const { data, error } = useSWR(
    [`api/events?establishmentId=${establishmentId}`],
    fetchURL
  );

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useFan = (username: string): Response<UserDto> => {
  const { data, error } = useSWR([`api/users/${username}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useCities = (): Response<string[]> => {
  const { data, error } = useSWR(
    ['nti/territory/Province?_sort=label&_pageSize=52&_page=0'],
    fetchCitiesURL
  );

  const cities = data?.result.items.map(
    (city: { label: string }) => city.label
  );

  if (error) {
    console.error(error);
  }

  return {
    data: cities,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useFollows = (type: FollowType): Response<FollowDTO[]> => {
  const { data, error } = useSWR([`api/follows/@me?type=${type}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

const fetchURL = async (url: string) =>
  fetch(`http://localhost:3333/${url}`, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error;
    }
  });

const fetchCitiesURL = async (url: string) => {
  return fetch(`https://datos.gob.es/apidata/${url}`, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error;
    }
  });
};
