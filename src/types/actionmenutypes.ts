export interface ActionMenuProps {
  trigger: React.ReactNode;
  onEdit?: () => void;
  onDelete: () => void;
  menuPosition?: 'right' | 'left';
}
