import {
  NameInput,
  EmailInput,
  PasswordInput,
  ToggleInput,
  CurrentName,
  CurrentEmail,
  CurrentPassword,
  TodoCardReplyInput,
  TextInput,
  TextAreaInput,
} from '@/components/common/Inputs';
import {
  EditableProfile,
  EditableTeamProfile,
  Profile,
  TeamProfile,
} from '@/components/common/Profiles';
import { EditReplyItem, ReplyItem } from '@/components/common/ReplyItem';
import { ProgressBadge, TaskListTab, TasksItem } from '@/components/common/TaskElements';
import TeamHeader from '@/components/common/TeamHeader';

export default function Test() {
  return (
    <div className="w-100svw flex h-full flex-col gap-5 overflow-x-clip bg-black p-5">
      <NameInput placeholder="이름을 입력하세요." id="name" />
      <EmailInput placeholder="이메일을 입력하세요." />
      <PasswordInput placeholder="비밀번호를 입력하세요." />
      <ToggleInput options={['기본상태', '선택옵션1', '선택옵션2']} />
      <CurrentName name="김이박" />
      <CurrentEmail email="sample@email.com" />
      <CurrentPassword />
      <TodoCardReplyInput />
      <TextInput placeholder="텍스트인풋 플레이스홀더" />
      <TextAreaInput placeholder="텍스트에리아 플레이스홀더" height="h-30" />
      <ReplyItem comment="댓글댓글 대댓글" name="사용자" date="1초 전" />
      <EditReplyItem comment="댓글 수정 대댓글 수수정" />
      <div className="flex items-center justify-start gap-3">
        <h2>Profile:</h2>
        <Profile width={64} />
        <h2>EditableProfile:</h2>
        <EditableProfile width={64} />
        <h2>TeamProfile:</h2>
        <TeamProfile width={64} />
        <h2>EditableTeamProfile:</h2>
        <EditableTeamProfile width={64} />
      </div>
      <div className="flex items-center justify-start gap-3">
        <h2>TaskListTab:</h2>
        <TaskListTab title="정기 주총" isSelected={true} />
        <TaskListTab title="법인 설립" isSelected={false} />
      </div>
      <h2>TeamHeader:</h2>
      <TeamHeader title="경영관리팀" />
      <div className="flex items-center justify-start gap-3">
        <h2>ProgressBadge:</h2>
        <ProgressBadge completedTaskNumber={3} totalTaskNumber={5} />
        <ProgressBadge completedTaskNumber={5} totalTaskNumber={5} />
      </div>
      <h2>TasksItem:</h2>
      <TasksItem tasksTitle="법인 설립" completed={1} total={5} />
      <TasksItem tasksTitle="변경 등기" completed={3} total={5} />
      <TasksItem tasksTitle="정기 주총" completed={5} total={5} />
      <TasksItem tasksTitle="기타 등등" completed={0} total={2} />
    </div>
  );
}
