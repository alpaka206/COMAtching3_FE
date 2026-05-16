// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

function AdminNavbar() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    setMenuOpen(false);
    navigate(path); // 네비게이트 함수로 경로 이동
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="admin-navbar">
      {/* 로고 */}
      <img
        src="/assets/admin_logo.webp"
        alt="Logo"
        className="logo"
        width="140"
        height="40"
        decoding="async"
      />

      {/* 햄버거 메뉴 아이콘 */}
      <button className="hamburger-menu" type="button" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* 메뉴 */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <div
          className={`menu-item ${activeMenu === "main" ? "active" : ""}`}
          onClick={() => handleMenuClick("main", ROUTES.adminChargeRequests)}
        >
          Main
        </div>
        <div
          className={`menu-item ${activeMenu === "request" ? "active" : ""}`}
          onClick={() =>
            handleMenuClick("request", ROUTES.adminChargeRequests)
          }
        >
          충전요청
        </div>
        <div
          className={`menu-item ${
            activeMenu === "user-management" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("user-management", ROUTES.adminUserManagement)
          }
        >
          가입자관리
        </div>
        <div
          className={`menu-item ${
            activeMenu === "team-management" ? "active" : ""
          }`}
          onClick={() =>
            handleMenuClick("team-management", ROUTES.adminTeamManagement)
          }
        >
          팀관리
        </div>
      </div>

      {/* 관리자 정보 */}
      <div className={`admin-info ${menuOpen ? "open" : ""}`}>
        <p className="admin-info_admin">관리자 오준석님</p>
        <p className="admin-info_class">가톨릭대학교</p>
      </div>
    </div>
  );
}

export default AdminNavbar;
