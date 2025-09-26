import { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// type
import { CategoryType } from '@/type/common';
// icon
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';

interface PostCategoryProps {
  categories: CategoryType[];
  selectedCategoryId: number;
  setSelectedCategoryId: React.Dispatch<SetStateAction<number>>;
  sortKey: 'newest' | 'oldest';
  setSortKey: React.Dispatch<SetStateAction<'newest' | 'oldest'>>;
  total: number | null;
}

export default function PostCategory({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  sortKey,
  setSortKey,
  total,
}: PostCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // dropdown 밖 클릭시 dropdown close
  const outside = useRef<HTMLUListElement | null>(null);
  const handleOutside = (e: MouseEvent) => {
    if (!outside.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return (
    <CategoryBase>
      <SortWrapper>
        <Total>
          총<Strong>{total}</Strong>
          개의 게시물
        </Total>
        <Selectbox
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {sortKey === 'newest' ? (
            <ArrowIconWrap>
              <ArrowAsc />
              최신순
            </ArrowIconWrap>
          ) : (
            <ArrowIconWrap>
              <ArrowDsc />
              오래된순
            </ArrowIconWrap>
          )}

          {isOpen && (
            <Options ref={outside}>
              <Option
                role="option"
                aria-selected={sortKey === 'newest'}
                onClick={(e) => {
                  e.stopPropagation();
                  setSortKey('newest');
                  setIsOpen(false);
                }}
              >
                최신순
              </Option>
              <Option
                role="option"
                aria-selected={sortKey === 'oldest'}
                onClick={(e) => {
                  e.stopPropagation();
                  setSortKey('oldest');
                  setIsOpen(false);
                }}
              >
                오래된순
              </Option>
            </Options>
          )}
        </Selectbox>
      </SortWrapper>

      <CategoryMenu role="tablist" aria-label="피드 카테고리">
        {categories.map((category, idx) => (
          <CategoryItem
            key={category.id}
            role="tab"
            $active={selectedCategoryId === idx}
            onClick={() => setSelectedCategoryId(idx)}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoryMenu>
    </CategoryBase>
  );
}

/* ===== styles ===== */

const CategoryBase = styled.div`
  background-color: #fff;
  position: sticky;
  top: 56px;
  z-index: 10;

  @media (min-width: 1000px) {
    top: 0;
  }
`;

const CategoryMenu = styled.ul`
  display: flex;
  justify-content: space-evenly;
  font-weight: 500;
  color: ${(props) => props.theme.gray_02};
  overflow-x: scroll;
  border-bottom: 3px solid ${(props) => props.theme.gray_03};
`;

const CategoryItem = styled.li<{ $active: boolean }>`
  position: relative;
  min-width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.$active ? '3px solid #1D9BF0' : 'none')};
`;

const SortWrapper = styled.div`
  background-color: #15202b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  color: #fff;
`;

const Total = styled.h4`
  display: flex;
  gap: 4px;
  margin-left: 16px;
  font-weight: 400;
`;

const Strong = styled.strong``;

const Selectbox = styled.div`
  position: relative;
  padding: 0 16px;
  cursor: pointer;

  // border: 1px solid #fff;
`;

const Options = styled.ul`
  background-color: #fff;
  position: absolute;
  top: calc(100% + 10px);
  right: 1px;
  width: 80px;
  padding: 6px;
  border: 1px solid #e2e7f1;
  color: ${(props) => props.theme.gray_01};
  text-align: center;
  z-index: 10;
`;

const Option = styled.li`
  padding: 6px 12px 6px 6px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.gray_03};
  }
`;

const ArrowIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ArrowAsc = styled(HiOutlineSortAscending)`
  color: ${(props) => props.theme.primary_01};
  font-size: 16px;
`;

const ArrowDsc = styled(HiOutlineSortDescending)`
  color: ${(props) => props.theme.primary_01};
  font-size: 16px;
`;
