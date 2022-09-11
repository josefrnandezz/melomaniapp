import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { ArtistDTO } from '@melomaniapp/contracts/artist';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import { EventDTO } from '@melomaniapp/contracts/event';
import useSWR from 'swr';
import { getMockEvents } from '../mocks/events';

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
  // const { data, error } = useSWR(['api/events'], fetchURL);
  const { data, error } = getMockEvents();

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
  // const { data, error } = useSWR(['api/events'], fetchURL);
  const { data, error } = getMockEvents();

  console.log(data);

  const events =
    establishmentId &&
    data.filter((event) => event.establishmentId === establishmentId[0]);

  console.log(events);

  console.log(establishmentId);

  if (error) {
    console.error(error);
  }

  return {
    data: events || [],
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
