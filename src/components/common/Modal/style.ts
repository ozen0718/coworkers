export type PaddingStyleType = 'default' | 'todo' | 'danger';
export type RadiusStyleType = '12' | '24';

export const paddingStyle: Record<PaddingStyleType, string> = {
  default: 'pt-12 pb-8 px-12 sm:px-[52px]',
  todo: 'py-8 px-6',
  danger: 'pt-12 sm:pt-[42px] pb-8 sm:px-[52px]',
};

export const radiusStyle: Record<RadiusStyleType, string> = {
  '12': 'rounded-t-xl sm:rounded-xl',
  '24': 'rounded-t-3xl sm:rounded-3xl',
};
