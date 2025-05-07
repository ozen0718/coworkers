export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

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

export type ReplyItemProps = {
  comment: string;
  profileUrl?: string;
  name?: string;
  date?: string;
};
