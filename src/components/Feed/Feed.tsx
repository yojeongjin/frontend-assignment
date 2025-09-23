import styled from 'styled-components';
// components
import FeedCategory from './FeedCategory';
import FeedHeader from './FeedHeader';
import FeedContent from './FeedContent';
import FeedImg from './FeedImg';
import FeedAction from './FeedAction';

export default function Feed() {
  return (
    <FeedList>
      <FeedCategory />
      <FeedArticle>
        <FeedHeader />
        <FeedContent />
        <FeedImg />
        <FeedAction />
      </FeedArticle>
      <FeedArticle>
        <FeedHeader />
        <FeedContent />
        <FeedImg />
        <FeedAction />
      </FeedArticle>
    </FeedList>
  );
}

/* ===== styles ===== */

const FeedList = styled.section``;

const FeedArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.gray_03};
  &:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
`;
