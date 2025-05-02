export type ToggleInputProps = {
  options: string[];
  onSelect?: (selectedOption: string) => void;
};

export type CurrentNameProp = {
  name: string;
};

export type CurrentEmailProp = {
  email: string;
};

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
