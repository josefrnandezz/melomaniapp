import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { EventDTO, FullEventDTO } from '@melomaniapp/contracts/event';
import { UserDto } from '@melomaniapp/contracts/user';
import {
  FollowArtistArtistDTO,
  FollowType,
  FollowUserArtistDTO,
  FollowUserEstablishmentDTO,
  FollowUserEventDTO,
  FollowUserGenreDTO,
} from '@melomaniapp/contracts/follow';
import useSWR from 'swr';
import { Session } from 'next-auth';

type Follow =
  | FollowUserArtistDTO
  | FollowUserEstablishmentDTO
  | FollowUserGenreDTO
  | FollowUserEventDTO
  | FollowArtistArtistDTO;

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

export const useEvents = (
  city: string,
  session: Session
): Response<EventDTO[]> => {
  const params = session
    ? [`api/events/at/${city}`, session['accessToken']]
    : null;

  const { data, error } = useSWR(params, fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEvent = (id: string): Response<FullEventDTO | undefined> => {
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
    [`api/establishments/${establishmentId}/events`],
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

export const useUser = (session: Session): Response<UserDto> => {
  const param = session ? [`api/users/me`, session['accessToken']] : null;

  const { data, error } = useSWR(param, fetchURL);

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

export const useFollows = <T>(
  type: FollowType,
  session: Session
): Response<T[]> => {
  const params = session
    ? [`api/follows/me/type/${type}`, session['accessToken']]
    : null;

  const { data, error } = useSWR(params, fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useMyEstablishment = (
  session: Session | null
): Response<EstablishmentDTO> => {
  const params = session
    ? [`api/users/me/establishment`, session['accessToken']]
    : null;

  const { data, error } = useSWR(params, fetchURL);

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error as Error,
  };
};

export const useEstablishmentEvents = (
  establishmentId: string
): Response<EstablishmentDTO[]> => {
  const { data, error } = useSWR(
    [`api/establishments/${establishmentId}/events`],
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

const fetchURL = async (url: string, token: string) =>
  fetch(`http://localhost:3333/${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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
