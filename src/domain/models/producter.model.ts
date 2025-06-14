export type ProducerModel = {
  id: number;
  name: string
};

export type CreateProducerModelInput = Omit<ProducerModel, 'id'>;