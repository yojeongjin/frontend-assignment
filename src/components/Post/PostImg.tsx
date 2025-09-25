import { useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../Common/Modal';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// swiper style
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// type
import { PostResType } from '@/type/post';

type PostImgProps = Pick<PostResType, 'images'>;

export default function PostImg({ images }: PostImgProps) {
  const [openImg, setOpenImg] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  if (!images || images.length === 0) return null;
  const count = Math.min(images.length, 4);

  return (
    <>
      <ImgWrapper $count={count}>
        {images.map((src, i) => (
          <Img
            key={src + i}
            src={src}
            alt={`게시물 이미지 ${i + 1}`}
            loading="lazy"
            onClick={() => {
              setClickedIndex(i);
              setOpenImg(true);
            }}
          />
        ))}
      </ImgWrapper>
      {openImg && (
        <Modal
          onCloseModal={() => {
            setOpenImg(false);
          }}
        >
          <ImgSwiper>
            <StyledSwiper
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              initialSlide={clickedIndex}
            >
              {images.map((img, i) => (
                <SwiperSlide key={img + i}>
                  <ModalImg src={img} alt={`게시물 이미지 ${i + 1}`} loading="lazy" />
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </ImgSwiper>
        </Modal>
      )}
    </>
  );
}

/* ===== styles ===== */

/**
 * 1장: 16:9 단일
 * 2장: 좌/우 반반
 * 3장: 좌 큰 1장 + 우 위/아래 2장
 * 4장: 2x2
 */
const layoutByCount = {
  1: css`
    grid-template-columns: 1fr;
    grid-template-areas: 'a';
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 16/9;
    }
  `,
  2: css`
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'a b';
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 1/1;
    }
    & > :nth-child(2) {
      grid-area: b;
      aspect-ratio: 1/1;
    }
  `,
  3: css`
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'a c';
    & > :nth-child(1) {
      grid-area: a;
      min-height: 260px;
    }
    & > :nth-child(2) {
      grid-area: b;
      aspect-ratio: 1/1;
    }
    & > :nth-child(3) {
      grid-area: c;
      aspect-ratio: 1/1;
    }
  `,
  4: css`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'c d';
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 1/1;
    }
    & > :nth-child(2) {
      grid-area: b;
      aspect-ratio: 1/1;
    }
    & > :nth-child(3) {
      grid-area: c;
      aspect-ratio: 1/1;
    }
    & > :nth-child(4) {
      grid-area: d;
      aspect-ratio: 1/1;
    }
  `,
} as const;

const ImgWrapper = styled.div<{ $count: number }>`
  max-height: 360px;
  display: grid;
  gap: 6px;
  border-radius: 8px;
  overflow: hidden;
  ${({ $count }) => layoutByCount[$count as 1 | 2 | 3 | 4]}
  @media (min-width: 1200px) {
    // width: 95%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 360px;
  display: block;
  object-fit: cover;
  overflow: hidden;
  border-radius: 8px;
`;

// img swiper
const ImgSwiper = styled.div`
  border-radius: 8px;
`;

const StyledSwiper = styled(Swiper)`
  border-radius: 8px;

  .swiper-pagination-bullet-active {
    background: #fff !important;
    width: 9px;
    height: 9px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    // background: #fff !important;
    color: #fff !important;
  }
`;

const ModalImg = styled(Img)``;
