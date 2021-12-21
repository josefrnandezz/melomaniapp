import { EstablishmentDTO } from '@melomaniapp/contracts/establishment';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

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

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="name"
        label="Name of your establishment"
        initialValue={establishment?.name}
      >
        <Input />
      </Form.Item>
      <Form.Item name="alias" label="Alias" initialValue={establishment?.alias}>
        <Input placeholder="@my_establishment" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        initialValue={establishment?.description}
      >
        <TextArea
          autoSize
          placeholder="Tell us a little bit about your business..."
        />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        initialValue={establishment?.address}
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" initialValue={establishment?.email}>
        <Input />
      </Form.Item>
      <Form.Item
        name="genres"
        label="Genres"
        initialValue={establishment?.genreIds.map((genre) => genre)}
        trigger="onChangeHandler"
      >
        <GenreFilter
          genres={[
            { _id: 'rock', name: 'Rock' },
            { _id: 'rap', name: 'Rap' },
            { _id: 'pop', name: 'Pop' },
            { _id: 'techno', name: 'Techno' },
          ]}
          selectedGenres={establishment?.genreIds.map((genre) => genre)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EstablishmentForm;
