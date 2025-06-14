type GetAwardsDto = {
  producer: string;
  interval: number;
  previosWin: number;
  followingWin: number;
}

export type GetAwardsResponseDto = {
  min: GetAwardsDto[];
  max: GetAwardsDto[];
}