import styled from 'styled-components';

export default function FeedContent() {
  return (
    <ContentBase>
      <Content>sample samplesamplesamplesamplesample</Content>
    </ContentBase>
  );
}

/* ===== styles ===== */

const ContentBase = styled.div``;
const Content = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
`;
