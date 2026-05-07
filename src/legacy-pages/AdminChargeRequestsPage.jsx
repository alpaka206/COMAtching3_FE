import React from 'react';
import AdminRequestList from '../components/AdminRequestList';
import AdminNavbar from '../components/Adminnavbar';
function ChargeRequestsPage() {
    return (
        <div className='admin-container'>
            <AdminNavbar/>
            {/* 충전 요청 관련 기능 구현 */}
            <AdminRequestList />
        </div>
    );
}

export default ChargeRequestsPage;
