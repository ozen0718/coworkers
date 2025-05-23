export function getKoreanDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export const getFutureDateString = (yearsAhead: number): string => {
  const now = new Date();
  now.setFullYear(now.getFullYear() + yearsAhead);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatElapsedTime = (updatedAt: string): string => {
  const updated = new Date(updatedAt);
  const now = new Date();
  const diffMs = now.getTime() - updated.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}시간 ${minutes}분 ${secs}초`;
};
