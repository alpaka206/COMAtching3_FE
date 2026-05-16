// AdminRequestList.css.ts
import { style } from '@vanilla-extract/css';

export const content = style({
  marginTop:'100px'
});
export const requestSummaryBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  width: '80%',
  margin: '0 auto',
  padding: '24px 56px',
  borderRadius: '12px', // Adds rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
});

export const requestSummaryItem = style({
  textAlign: 'center',
  color: '#383838',
  fontSize: '16px',
});

export const requestSummaryNumber = style({
  display: 'block',
  fontSize: '48px',
  fontWeight: 'bold',
  marginTop: '8px',
});
export const adminRequestList = style({
  width: '100%',
});

export const adminRequestListTitle = style({
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: '28px 0 0 26px',
});

export const adminRequestListText = style({
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'left',
  margin: '8px 0 0 26px',
  paddingBottom: '20px',
});

export const adminRequestListBox = style({
  maxHeight: '500px', // 요청 목록의 최대 높이를 설정합니다.
  overflowY: 'auto', // 세로 스크롤바가 필요할 때만 스크롤바를 표시합니다.
});