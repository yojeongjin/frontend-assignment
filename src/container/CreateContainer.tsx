import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
// type
import { CategoryType } from '@/type/common';
// components
import CreateSection from '@/components/Create/CreateSection';
import CreateBoard from '@/components/Create/CreateBoard';
import CreateCategory from '@/components/Create/CreateCategory';
import CreateImg from '@/components/Create/CreateImg';
import CreateAction from '@/components/Create/CreateAction';

export default function CreateContainer() {
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>({
    id: null,
    name: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previews = useMemo(
    () => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [files]
  );

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadFiles = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
    setFiles(uploadFiles);
  };

  const removeAt = (id: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== id));
  };

  const onCancel = () => {
    if (content || files.length || category) {
      const ok = confirm('작성 중인 내용을 저장하지 않고 나가시겠습니까?');
      if (!ok) return;
    }
    router.back();
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
      <CreateAction onCancel={onCancel} />
    </CreateSection>
  );
}
