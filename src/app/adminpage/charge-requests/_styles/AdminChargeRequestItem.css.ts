import { style } from '@vanilla-extract/css';
export const content = style({
  marginTop:'100px'
});
export const adminRequestListElement = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const adminRequestListContainer = style({
  width: '90%',
  border: 'none', /* 기존 border 제거 */
  borderBottom: '1px solid #000000', /* 아래쪽에만 border 추가 */
  backgroundColor: '#ffffff',
  margin: '30px auto',
  
});

export const adminRequestListItem = style({
  display: 'flex',
  alignItems: 'center',
  margin: '16px 25px 0 43px',
});

export const adminRequestListElementMargin = style({
  margin: '8px 15px 0 15px',
});

export const adminRequestListItemImg = style({
  width: '48px',
  height: '48px',
});

export const adminRequestListItemInput = style({
  width: '100px',
  height: '48px',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '0',
  marginLeft: '15px',
  marginRight: '3px',
});
export const buttonMarginRight =style({
  marginLeft:'10px',
  marginRight: '50px',

});
export const adminRequestListElementUserID = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#828282',
});

export const adminRequestListElementUserIDID = style({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000000',
  marginRight:"10px",
});

export const adminRequestListItemPickmeButton = style({
  width: '36px',
  height: '36px',
  borderRadius: '100px',
  fontSize: '30px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

export const adminRequestListItemPickmeValue = style({
  width: '55px',
  height: '47px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const adminRequestListItemSubmitButton = style({
  marginLeft: '27px',
  backgroundColor: '#ff775e',
});

export const adminRequestListElementResultPoint = style({
  color: 'gray',  /* grayscale 색상으로 변경 */
  fontSize: '24px',
  fontWeight: '400',

});
export const adminRequestListElementContainer = style({
  display: 'flex', /* Use flexbox for alignment */
  alignItems: 'center', /* Align items vertically center */
  gap: '10px', /* Space between the text and button */
});

export const chargeDeleteButton = style({
  color: '#000000', /* 검정색 텍스트 */
  backgroundColor: '#d3d3d3', /* 배경색 */
  padding: '1px 6px', /* 패딩 */
  width: '74px', /* 너비 */
  height: '24px', /* 높이 */
  border: 'none', /* 기본 테두리 제거 */
  borderRadius: '4px', /* 둥근 모서리 */
  cursor: 'pointer', /* 마우스 커서 변경 */

  marginLeft: '10px',
  fontSize: '12px', /* 텍스트 크기 */
  transition: 'background-color 0.3s', /* 배경색 변화에 대한 트랜지션 */
  ':hover': {
    backgroundColor: '#6d6d6d', /* 호버 시 배경색 변화 */
  },
});
export const formattedDateStyle = style({
  marginTop:"15px",
  color: 'grey', // 회색으로 설정
  fontSize: '12px', // 글씨 크기 조정
  opacity: 0.6, // 투명도로 흐리게 표현
});