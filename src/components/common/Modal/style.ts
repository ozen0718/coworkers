export type PaddingStyleType = 'default' | 'todo' | 'danger';
export type RadiusStyleType = '12' | '24';

export const paddingStyle: Record<PaddingStyleType, string> = {
  default: 'pt-12 pb-8 px-12 md:px-[52px]',
  todo: 'py-8 px-6',
  danger: 'pt-12 md:pt-[42px] pb-8 md:px-[52px]',
};

export const radiusStyle: Record<RadiusStyleType, string> = {
  '12': 'rounded-t-xl md:rounded-xl',
  '24': 'rounded-t-3xl md:rounded-3xl',
};
