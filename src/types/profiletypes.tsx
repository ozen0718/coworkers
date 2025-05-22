export interface BaseProfileProps {
  imageUrl: string;
  width: number;
  showEditIcon?: boolean;
}

export type ProfileProps = {
  profileUrl?: string | null;
  width: number;
};

export type TeamProfileProps = {
  teamProfileUrl?: string | null;
  width: number;
};
