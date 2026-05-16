import { style } from '@vanilla-extract/css';

export const myInfoButton = style({
  width: 'calc(50% - 8px)',
  height: '200px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '32px',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(12px)',
  fontFamily: '"Pretendard", sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor:'pointer'
});

export const textWrapper = style({
  margin: '20px 0 0 16px',
  textAlign: 'left',
});

export const buttonImage = style({
  width: '100px',
  display: 'flex',
  margin: '0 12px 12px auto',
});

export const buttonText = style({
  fontSize: '16px',
  fontWeight: 700,
  color: '#000000',
});

export const valueText = style({
  fontSize: '28px',
  fontWeight: 700,
  color: '#000000',
});
