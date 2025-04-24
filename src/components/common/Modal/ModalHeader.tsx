import { ModalHeaderProps } from './types';

export default function ModalHeader({ headerIcon, title, description }: ModalHeaderProps) {
  if (!headerIcon && !title && !description) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      {headerIcon && headerIcon}
      <div className="flex flex-col items-center gap-2">
        {title && <h2 className="text-lg-medium">{title}</h2>}
        {description && <p className="text-gray300 text-md-medium">{description}</p>}
      </div>
    </div>
  );
}
