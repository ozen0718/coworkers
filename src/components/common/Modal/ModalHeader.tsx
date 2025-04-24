interface ModalHeaderProps {
  title?: string;
  description?: string;
}

export default function ModalHeader({ title, description }: ModalHeaderProps) {
  if (!title && !description) return null;

  return (
    <div className="flex flex-col gap-2 text-center">
      {title && <h2 className="text-lg-medium">{title}</h2>}
      {description && <p className="text-gray300 text-md-medium">{description}</p>}
    </div>
  );
}
