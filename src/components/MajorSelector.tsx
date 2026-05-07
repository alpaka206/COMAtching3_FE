// @ts-nocheck
import { useState } from "react";
import majorCategories from "../data/majorCategories";
import MajorSelectorElement from "./MajorSelectorElement";
import * as styles from "../css/components/MajorSelector.css.ts"; // Vanilla Extract 스타일 임포트

const MajorSelector = ({ setUser, checkMethod, setCheckMethod }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    const value = e.target.value;
    
    setSelectedDepartment(""); // 학교가 변경되면 학과 초기화
    setCheckMethod((prevState) => ({
      ...prevState,
      university: e.target.value,
      department: "",
      major: "",
    }));
    setUser((prevUser) => ({
      ...prevUser,
      university: value,
    }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCheckMethod((prevState) => ({
      ...prevState,
      department: e.target.value,
      major: "",
    }));
  };

  const handleMajorChange = (e) => {
    const value = e.target.value;
    setCheckMethod((prevState) => ({
      ...prevState,
      major: value,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      major: value,
    }));
  };

  const getDepartments = () => {
    if (!selectedSchool) return [];
    const school = majorCategories.find(
      (option) => option.label === selectedSchool
    );
    return school ? school.departments : [];
  };

  const getMajors = () => {
    if (!selectedSchool || !selectedDepartment) return [];
    const school = majorCategories.find(
      (option) => option.label === selectedSchool
    );
    const department = school.departments.find(
      (dept) => dept.label === selectedDepartment
    );
    return department ? department.majors : [];
  };

  return (
    <div>
      <div className={styles.schoolRow}>
        <MajorSelectorElement
          placeholder="학교"
          fieldType={styles.school}
          selectname={styles.school}
          value={selectedSchool}
          onChange={handleSchoolChange}
          options={majorCategories.map((school) => school.label)}
        />
      </div>
      <div className={styles.departmentRow}>
        <MajorSelectorElement
          placeholder="학과"
          fieldType={styles.depart}
          selectname={styles.depart}
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          options={getDepartments().map((dept) => dept.label)}
        />
        <MajorSelectorElement
          placeholder="전공"
          fieldType={styles.major}
          selectname={styles.major}
          value={checkMethod.major}
          onChange={handleMajorChange}
          options={getMajors()}
        />
      </div>
    </div>
  );
};

export default MajorSelector;
