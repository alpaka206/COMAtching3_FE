// @ts-nocheck
import * as styles from "../css/components/MajorSelector.css.ts"; // Vanilla Extract 스타일 임포트
function MajorSelectorElement({
  placeholder,
  fieldType,
  selectname,
  value,
  onChange,
  options,
}) {
  return (
    <div className={fieldType}>
      <label>
        <div className="form-inner-content-text">{placeholder}</div>
      </label>
      <select
        className={styles.majorSelectorElementSelect}
        name={selectname}
        value={value}
        onChange={onChange}
      >
        <option value="" className={styles.majorSelectorElementOption} disabled>
          선택
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MajorSelectorElement;
