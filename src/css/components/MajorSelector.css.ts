import { style } from '@vanilla-extract/css';


export const schoolRow = style({
  display: 'flex',
  marginBottom: '20px',
});
export const departmentRow = style({
  display: 'flex',
  gap: '22px',
  marginBottom: '15px',
});

export const school = style({
  width: '100%',
});

export const depart = style({
  width: 'calc(33%)',
  marginRight: '12px',
});

export const major = style({
  width: 'calc(67%)',
});

export const majorSelectorElementSelect = style({
  display: 'block',
  width: '100%',
  height: '35px',
  background: 'white',
  border: '1px #eaeaea solid',
  borderRadius: '15px',
  padding: '0 12px',

});

export const majorSelectorElementOption = style({});
