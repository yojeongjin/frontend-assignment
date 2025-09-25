import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
// data
import { mockCategories } from '@/datas/mockCategories';
import { CategoryType } from '@/type/common';

type CreateCategoryProps = {
  category: CategoryType;
  setCategory: Dispatch<SetStateAction<CategoryType>>;
};

export default function CreateCategory({ category, setCategory }: CreateCategoryProps) {
  return (
    <CategoryBase>
      <Label as="div">카테고리</Label>

      <CategoryMenu role="radiogroup" aria-label="카테고리 선택">
        {mockCategories.map((cat) => (
          <CategoryItem key={cat.id}>
            <CategoryRadio
              type="radio"
              id={`category-${cat.id}`}
              name="category"
              checked={category.id === cat.id}
              onChange={() => setCategory(cat)}
            />
            <CategoryLabel htmlFor={`category-${cat.id}`} $active={category.id === cat.id}>
              {cat.name}
            </CategoryLabel>
          </CategoryItem>
        ))}
      </CategoryMenu>
    </CategoryBase>
  );
}

/* ===== styles ===== */

const CategoryBase = styled.div`
  display: grid;
  gap: 16px;
  padding: 0 16px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

const CategoryMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.li`
  position: relative;
`;

const CategoryRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const CategoryLabel = styled.label<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  user-select: none;
  ${(p) =>
    p.$active &&
    `
      background: #f0f6ff;
      border-color: #8cbcff;
      box-shadow: inset 0 0 0 1px #8cbcff;
      font-weight: 600;
    `}
`;
