import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// hooks
import useUser from '@/hooks/useUser';
import usePrototypes from '@/hooks/usePrototypes';
// type
import { CategoryType } from '@/type/common';
import { PostResType } from '@/type/post';
// components
import CreateSection from '@/components/Create/CreateSection';
import CreateBoard from '@/components/Create/CreateBoard';
import CreateCategory from '@/components/Create/CreateCategory';
import CreateImg from '@/components/Create/CreateImg';
import CreateAction from '@/components/Create/CreateAction';

export default function CreateContainer() {
  /* ===== constants ===== */
  const MAX_LEN = 280;
  const MAX_FILES = 4;

  /* ===== deps & router ===== */
  const user = useUser();
  const { setPrototypes } = usePrototypes();
  const router = useRouter();

  /* ===== local states ===== */
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>({
    id: null,
    name: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  /* ===== refs ===== */
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 이미지 미리보기 URL
   *
   * @description
   * - File → objectURL로 변환
   * - files 변경 시 새로 계산
   */
  const previews = useMemo(
    () => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [files]
  );

  /**
   * 파일 선택 핸들러
   *
   * @description
   * - 이미지 파일만 허용
   * - 최대 4장 제한 (초과분 컷)
   */
  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadFiles = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
    const upload = [...files, ...uploadFiles].slice(0, MAX_FILES);

    if ([...files, ...uploadFiles].length > MAX_FILES) {
      alert(`이미지는 최대 ${MAX_FILES}장까지 업로드할 수 있어요.`);
    }

    setFiles(upload);
  };

  /**
   * 미리보기 개별 이미지 제거
   *
   * @param id 제거할 미리보기 인덱스
   */
  const removeAt = (id: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== id));
  };

  /**
   * 작성 취소
   *
   * @description
   * - 작성 중(텍스트/이미지/카테고리 선택)일 경우 확인 모달
   * - 확인 시 이전 페이지로 이동
   */
  const onCancel = () => {
    const isCancel = Boolean(content.trim() || category.id);
    if (isCancel) {
      const ok = confirm('작성 중인 내용을 저장하지 않고 나가시겠습니까?');

      if (!ok) return;
    }
    router.back();
  };

  /**
   * 작성 제출
   *
   * @description
   * - 카테고리 필수
   * - 텍스트 또는 이미지 최소 1개 이상
   * - 새 ID = 기존 최대 id + 1
   * - prepend로 첫 페이지 상단 노출
   * - 완료 후 메인으로 이동
   */
  const onSubmit = () => {
    if (!category.id) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (!content.trim() && files.length === 0) {
      alert('텍스트를 입력하거나 이미지를 업로드해주세요.');
      return;
    }
    // 최대 4장
    const imageUrls = previews.slice(0, 4).map((preview) => preview.url); // 최대 4장

    setPrototypes((prev) => {
      // 새로운 id: 기존 최대 id + 1
      const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id ?? 0)) + 1 : 1;

      const newPost: PostResType = {
        id: nextId,
        author: user,
        content: content.slice(0, MAX_LEN),
        images: imageUrls,
        category: category.id!, // number
        categoryName: category.name, // string
        createdAt: new Date().toISOString(),
        likes: 0,
        retweets: 0,
        comments: 0,
        isLiked: false,
        isRetweeted: false,
        hasMoreComments: false,
        commentList: [],
      };

      // **prepend** 해서 첫 페이지 최상단에 바로 보이게
      return [newPost, ...prev];
    });

    // 완료 후 페이지 이동
    router.push('/');
  };

  return (
    <CreateSection>
      <CreateBoard content={content} setContent={setContent} />
      <CreateCategory category={category} setCategory={setCategory} />
      <CreateImg
        files={files}
        fileInputRef={fileInputRef}
        previews={previews}
        onFilesSelected={onFilesSelected}
        removeAt={removeAt}
      />
      <CreateAction onCancel={onCancel} onSubmit={onSubmit} />
    </CreateSection>
  );
}
