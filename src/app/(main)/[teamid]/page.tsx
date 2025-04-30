import { TasksItem } from '@/components/common/TaskElements';
import TeamHeader from '@/components/common/TeamHeader';
import Report from '@/components/Report';
import Member from '@/components/common/Member';

export default function TeamPage() {
  const sectionStyle = 'w-full py-6 flex flex-col items-center justify-start gap-4';
  const sectionHeaderStyle = 'flex w-full items-center justify-between';
  const sectionHeaderTitleStyle = 'flex items-center justtify-start gap-2';
  const sectionHeaderH2Style = 'text-lg-medium font-semibold text-gray100';
  const sectionHeaderPSTyle = 'text-lg-regular text-gray500';
  const sectionHeaderButtonStyle = 'text-md-regular text-primary';

  return (
    <div className="bg-bg300 flex min-h-[100vh] w-full min-w-[375px] flex-col items-center justify-start px-4 pt-6 sm:px-6">
      <div className="min-80 h-fit w-full max-w-300">
        <TeamHeader title="팀이름" />

        <section className={sectionStyle}>
          <header className={sectionHeaderStyle}>
            <div className={sectionHeaderTitleStyle}>
              <h2 className={sectionHeaderH2Style}>할 일 목록</h2>
              <p className={sectionHeaderPSTyle}>(4개)</p>
            </div>
            <button className={sectionHeaderButtonStyle}>+ 새로운 목록 추가하기</button>
          </header>

          <TasksItem completed={1} total={3} tasksTitle="할일목록 1" />
          <TasksItem completed={2} total={5} tasksTitle="할일목록 2" />
          <TasksItem completed={3} total={7} tasksTitle="할일목록 3" />
          <TasksItem completed={10} total={10} tasksTitle="할일목록 4" />
        </section>

        <section className={sectionStyle}>
          <header className={sectionHeaderStyle}>
            <div className={sectionHeaderTitleStyle}>
              <h2 className={sectionHeaderH2Style}>리포트</h2>
            </div>
          </header>

          <Report />
        </section>

        <section className={sectionStyle}>
          <header className={sectionHeaderStyle}>
            <div className={sectionHeaderTitleStyle}>
              <h2 className={sectionHeaderH2Style}>멤버</h2>
              <p className={sectionHeaderPSTyle}>(8명)</p>
            </div>
            <button className={sectionHeaderButtonStyle}>+ 새로운 목록 추가하기</button>
          </header>
          <div className="grid-rows-auto grid w-full grid-cols-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr_1fr]">
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
            <Member name="가나다" email="abc123@email.com" />
          </div>
        </section>
      </div>
    </div>
  );
}
