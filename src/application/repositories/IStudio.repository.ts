import { CreateStudioModelInput, StudioModel } from "@domain/models/studio.model";

export const STUDIO_REPOSITORY = "IStudioRepository";

export interface IStudioRepository {
  create(data: CreateStudioModelInput): Promise<StudioModel>;
}