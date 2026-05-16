import { style } from '@vanilla-extract/css';

export const userInfoSummary = style({
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fill with 80% opacity
  backdropFilter: 'blur(12px)', // Background blur effect
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)', // Drop shadow
  width: '100%',
  borderRadius: '32px',
  height: '203px',
  marginTop: '16px',
  overflow: 'hidden', // 스크롤이 넘치는 부분 숨기기
  position: 'relative', // 화살표의 위치 지정을 위해
  fontFamily: '"Pretendard", sans-serif',
});

export const slider = style({
  display: 'flex',
  overflowX: 'auto', // 가로 스크롤을 허용
  overflowY: 'hidden',
  scrollSnapType: 'x mandatory', // 가로로 스크롤할 때 스냅되도록 함
  scrollBehavior: 'smooth', // 스크롤 애니메이션 부드럽게
});

export const sliderPage = style({
  flex: '0 0 auto',
  width: '100%', // 각 슬라이드 페이지의 너비를 100%로 설정
});

export const sliderPageSecond = style({
  width: '90%', // 두 번째 페이지의 너비를 90%로 설정
});

export const userContact = style({
  marginTop: '5px',
  backgroundImage: 'linear-gradient(135deg, #ff775e, #ff4d61, #e83abc)',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'left',
  fontWeight: 'bolder',
  color: 'white',
  padding: '16px 30px',
  height: '16px',
  borderBottomLeftRadius: '32px',
  borderBottomRightRadius: '32px',
});

export const userinfoFixButton = style({
  backgroundColor: 'rgba(255, 255, 255, 0.45)',
  width: '64px',
  height: '24px',
  borderRadius: '24px',
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px',
});

export const sliderArrow = style({
  position: 'absolute',
  top: '40%',
  transform: 'translateY(-50%)',
  width: '30px',
  height: '30px',
  backgroundColor: 'transparent',
  color: '#000000',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
});

export const sliderArrowLeft = style({
  left: '10px',
  width: '16px',
  height: '16px',
  fontSize: '8px',
  borderRadius: '100px',
  boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.25)',
});

export const sliderArrowRight = style({
  right: '10px',
  width: '16px',
  height: '16px',
  fontSize: '8px',
  borderRadius: '100px',
  boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.25)',
});
