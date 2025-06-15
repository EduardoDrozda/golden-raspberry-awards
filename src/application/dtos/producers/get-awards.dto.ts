export type GetAwardsDto = {
  producer: string;
  interval: number;
  previousWin?: number;
  followingWin?: number;
}

export type GetAwardsResponseDto = {
  min: GetAwardsDto[];
  max: GetAwardsDto[];
}