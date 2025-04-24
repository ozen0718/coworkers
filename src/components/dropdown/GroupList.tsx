import DropDownGroupsItem, { GroupOption } from './Groups';

interface Props {
  groups: GroupOption[];
}

export default function DropDownGroupsItemList({ groups }: Props) {
  return (
    <>
      {groups.map((group) => (
        <DropDownGroupsItem key={group.id} group={group} />
      ))}
    </>
  );
}
