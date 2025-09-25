/**
 * timeAgo
 *
 * @description
 * ISO 날짜 문자열을 받아 현재 시각과의 차이를 상대 시간으로 변환
 * - 60초 미만: "방금 전"
 * - 1시간 미만: "N분 전"
 * - 24시간 미만: "N시간 전"
 * - 그 이상: "N일 전"
 *
 * @param {string} iso ISO 8601 형식의 날짜 문자열 (예: "2025-09-25T12:34:56Z")
 * @param {number} [now=Date.now()] 기준 시각 (기본값은 현재 시각)
 * @returns {string} 상대 시간 문자열
 */
export const timeAgo = (iso: string, now = Date.now()) => {
  const diff = Math.floor((now - new Date(iso).getTime()) / 1000);

  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  return `${Math.floor(diff / 86400)}일 전`;
};
