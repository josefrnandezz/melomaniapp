import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useGenres } from '@melomaniapp/hooks';
import CityDropdown from '../../CityDropdown/CityDropdown';

import GenreFilter from '../../Genre/GenreFilter/GenreFilter';

const { TextArea } = Input;

export interface EstablishmentFormProps {
  establishment?: EstablishmentDTO;
  onSubmit?: (establishment: EstablishmentDTO) => void;
}

export const EstablishmentForm: React.FC<EstablishmentFormProps> = ({
  establishment,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const { data: genres } = useGenres();

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="name" label="Nombre" initialValue={establishment?.name}>
        <Input />
      </Form.Item>
      <Form.Item
        name="alias"
        label="Nickname"
        initialValue={establishment?.alias}
      >
        <Input placeholder="@establecimiento" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        initialValue={establishment?.description}
      >
        <TextArea
          autoSize
          placeholder="Tell us a little bit about your business..."
        />
      </Form.Item>
      <Form.Item
        name="city"
        label="Ciudad"
        trigger="onChangeHandler"
        initialValue={establishment?.address.city}
      >
        <CityDropdown selectedCity={establishment?.address.city} />
      </Form.Item>

      <Form.Item
        name="full"
        label="Dirección"
        initialValue={establishment?.address.full}
      >
        <Input placeholder="Dirección del establecimiento" />
      </Form.Item>

      <Form.Item
        name="genreIds"
        label="Géneros musicales"
        initialValue={establishment?.genreIds.map((genre) => genre)}
        trigger="onChangeHandler"
      >
        <GenreFilter
          genres={genres}
          selectedGenres={establishment?.genreIds.map((genre) => genre)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Confirmar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EstablishmentForm;
