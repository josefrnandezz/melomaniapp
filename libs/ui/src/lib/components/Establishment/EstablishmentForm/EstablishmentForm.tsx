import {
  CreateEstablishmentDTO,
  EditEstablishmentDTO,
  EstablishmentDTO,
} from '@melomaniapp/contracts';
import { Button, GenreFilter } from '@melomaniapp/ui';
import { Form, Input } from 'antd';
import React, { useState } from 'react';

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
      <Form.Item
        name="username"
        label="Username"
        initialValue={establishment?.username}
      >
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
        initialValue={establishment?.location}
      >
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" initialValue={establishment?.email}>
        <Input />
      </Form.Item>
      <Form.Item
        name="genres"
        label="Genres"
        initialValue={establishment?.genres.map((genre) => genre.id)}
        trigger="onChangeHandler"
      >
        <GenreFilter
          genres={[
            { id: 'rock', name: 'Rock' },
            { id: 'rap', name: 'Rap' },
            { id: 'pop', name: 'Pop' },
            { id: 'techno', name: 'Techno' },
          ]}
          selectedGenres={establishment?.genres}
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
