// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // primary
    primary_01: string;
    // gray
    gray_01: string;
    gray_02: string;
    gray_03: string;

    // point
    like: string;
    retweet: string;
  }
}
