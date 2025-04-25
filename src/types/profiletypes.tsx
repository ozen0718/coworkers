export interface BaseProfileProps {
  imageUrl: string;
  width: number;
  showEditIcon?: boolean;
}

export type ProfileProps = {
  profileUrl?: string;
  width: number;
};

export type TeamProfileProps = {
  teamProfileUrl?: string;
  width: number;
};
