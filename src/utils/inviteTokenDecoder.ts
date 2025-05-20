export default function extractGroupIdFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return String(decodedPayload.groupId);
  } catch {
    return null;
  }
}
