/**
 * 이미지 업로드 API
 */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('UPLOAD_FAIL');
  const { url } = await res.json();
  return url as string;
}

/**
 * 팀 생성 API
 */
export async function createTeam(name: string, imageUrl?: string): Promise<{ id: string }> {
  const form = new FormData();
  form.append('name', name);
  if (imageUrl) form.append('imageUrl', imageUrl);

  const res = await fetch('/api/teams', { method: 'POST', body: form });
  if (res.status === 409) throw new Error('DUPLICATE_NAME');
  if (!res.ok) throw new Error('CREATE_FAIL');
  return res.json();
}

/**
 * 팀 참여 API
 */
export async function joinTeam(link: string): Promise<{ id: string }> {
  const res = await fetch('/api/teams/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link }),
  });
  if (res.status === 404) throw new Error('NOT_FOUND');
  if (!res.ok) throw new Error('JOIN_FAIL');
  return res.json();
}
