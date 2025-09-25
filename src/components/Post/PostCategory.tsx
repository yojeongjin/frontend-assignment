import { useState } from 'react';
import styled from 'styled-components';
// data
import { mockCategories } from '@/datas/mockCategories';

export default function PostCategory() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <CategoryBase>
      <CategoryMenu role="tablist" aria-label="피드 카테고리">
        {mockCategories.map((category, idx) => (
          <CategoryItem
            key={category.id}
            role="tab"
            $active={activeIndex === idx}
            onClick={() => setActiveIndex(idx)}
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
  border-bottom: 1px solid ${(props) => props.theme.gray_03};
  overflow-x: scroll;
`;

const CategoryItem = styled.li<{ $active: boolean }>`
  position: relative;
  min-width: 52px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.$active ? '3px solid #1D9BF0' : 'none')};
`;

const Filter = styled.div``;
