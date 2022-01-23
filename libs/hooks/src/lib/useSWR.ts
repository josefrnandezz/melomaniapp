import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { GenreDTO } from '@melomaniapp/contracts/genre';
import useSWR from 'swr';

export const useGenres = (): GenreDTO[] => {
  const { data, error } = useSWR(['api/genres'], fetchURL);

  if (error) {
    console.error(error);
  }

  return data;
};

export const useEstablishments = (): EstablishmentDTO[] => {
  const { data, error } = useSWR(['api/establishments'], fetchURL);

  if (error) {
    console.error(error);
  }

  return data;
};

export const useEstablishment = (id: string): EstablishmentDTO => {
  const { data, error } = useSWR([`api/establishments/${id}`], fetchURL);

  if (error) {
    console.error(error);
  }

  return data;
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
