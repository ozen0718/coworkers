export interface InputProps {
  id?: string;
  placeholder?: string;
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

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'height'> {
  height?: string;
}

export type ReplyItemProps = {
  comment: string;
  profileUrl?: string;
  name?: string;
  date?: string;
};
