export type ToggleInputProps = {
  options: string[];
  onSelect?: (selectedOption: string) => void;
};

export interface CurrentEmailProp {
  email: string;
}

export interface TextInputProps {
  placeholder?: string;
}

export type TextAreaInputProps = {
  placeholder?: string;
  height?: string;
};

export type ReplyItemProps = {
  comment: string;
  profileUrl?: string;
  name?: string;
  date?: string;
};

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
