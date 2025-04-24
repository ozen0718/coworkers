import type { PropsWithChildren, ReactNode } from 'react';
import { ButtonProps } from '../Button/Button';
import { PaddingStyleType, RadiusStyleType } from './style';

export type ModalProps = PropsWithChildren<{
  /**
   * padding 스타일 설정값 (Desktop 기준)
   * - default: 48px, 52px, 32px (default)
   * - todo: 24px, 32px
   * - danger: 48px, 52px, 42px
   */
  padding?: PaddingStyleType;
  /**
   * border-radius 스타일 설정값 (Desktop 기준)
   * - '12': 12px (default)
   * - '24': 24px
   */
  borderRadius?: RadiusStyleType;
  headerIcon?: ReactNode;
  title?: string;
  description?: string;

  cancelButtonLabel?: string;
  submitButtonLabel: string;
  cancelButtonVariant?: ButtonProps['variant'];
  submitButtonVariant?: ButtonProps['variant'];

  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
}>;

export type ModalHeaderProps = Pick<
  ModalProps,
  | 'headerIcon'
  | 'title'
  | 'description'
>;

export type ModalButtonsProps = Pick<
  ModalProps,
  | 'cancelButtonLabel'
  | 'submitButtonLabel'
  | 'cancelButtonVariant'
  | 'submitButtonVariant'
  | 'onClose'
  | 'onSubmit'
  | 'disabled'
>;
