import styled from 'styled-components';
// icon
import { IoImageOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

type Preview = { name: string; url: string };

interface UploaderProps {
  files: File[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  previews: Preview[];
  onFilesSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAt: (id: number) => void;
  maxFiles: number;
}

export default function CreateImg({
  files,
  fileInputRef,
  previews,
  onFilesSelected,
  removeAt,
  maxFiles,
}: UploaderProps) {
  const canAdd = files.length < maxFiles;
  const remaining = maxFiles - files.length;

  return (
    <ImgBase>
      <Label as="div">이미지(최대 {maxFiles}장)</Label>
      {files.length === 0 ? (
        <ImageBase>
          <ImgLabel htmlFor="img_file">
            <ImgIcon />
            <ImgAlert>사진을 업로드해주세요.</ImgAlert>
            <Small>(JPG/PNG/GIF, 최대 {maxFiles}장)</Small>
          </ImgLabel>
          <ImgFile
            id="img_file"
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={(e) => onFilesSelected(e)}
          />
        </ImageBase>
      ) : (
        <PreviewGrid aria-label="이미지 미리보기">
          {previews.map((preview, idx) => (
            <PreviewItem key={preview.url}>
              <PreviewImg src={preview.url} alt={`첨부 이미지 ${idx + 1}`} />
              <RemoveBtn onClick={() => removeAt(idx)}>
                <MdClose />
              </RemoveBtn>
            </PreviewItem>
          ))}
          {/* 남은 자리가 있으면 업로드 타일 추가 */}
          {canAdd && (
            <AddTile>
              <ImgLabel htmlFor="img_file">
                <ImgIcon />
              </ImgLabel>
              <ImgFile
                id="img_file"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={(e) => {
                  onFilesSelected(e);
                  // 같은 파일 재선택 이슈(iOS 포함) 방지: 선택 후 value 초기화
                  e.currentTarget.value = '';
                }}
                aria-label={`이미지 추가 업로더 (남은 ${remaining}장)`}
              />
            </AddTile>
          )}
        </PreviewGrid>
      )}
    </ImgBase>
  );
}

/* ===== styles ===== */

const ImgBase = styled.div`
  display: grid;
  gap: 16px;
  padding: 24px 16px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

const ImageBase = styled.div`
  position: relative;
  width: 170px;
  height: 120px;
`;

const ImgLabel = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px;
  font-size: 14px;
  color: #888;
  border-radius: 8px;
  border: 1.5px dashed #e6e6e6;
`;

const ImgIcon = styled(IoImageOutline)`
  display: inline-flex;
  font-size: 22px;
`;

const ImgAlert = styled.p`
  margin-top: 8px;
`;

const Small = styled.small``;

const ImgFile = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const PreviewGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 1fr);
`;

const PreviewItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  aspect-ratio: 1 / 1;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const RemoveBtn = styled.button`
  position: absolute;
  right: 6px;
  top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const AddTile = styled.div`
  position: relative;
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  border: 1.5px dashed #e6e6e6;
  color: #888;
  overflow: hidden;
`;
