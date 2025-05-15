export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string;
}

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

export type CurrentPasswordProp = {
  onClick?: () => void;
};

export type ReplyItemProps = {
  comment: string;
  profileUrl?: string;
  name?: string;
  date?: string;
};
