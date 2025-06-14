export type StudioModel = {
  id: number;
  name: string;
};

export type CreateStudioModelInput = Omit<StudioModel, 'id'>;