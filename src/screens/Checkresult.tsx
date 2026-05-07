// @ts-nocheck
import { useEffect } from "react";
import Footer from "../components/Footer";
import HeaderBack from "../components/HeaderBack";
import { useRecoilState } from "recoil";
import { checkresultState } from "../atoms";
import ResultInfoRrev from "../components/ResultInfoRrev";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig"; // 전역 axios 인스턴스 불러오기

function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState); // 결과 리뷰 상태 관리
  

  useEffect(() => {
    // 결과 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await instance.get("/auth/user/api/history/matching");
        
        if (response.status === 200 && response.data.code === "GEN-000") {
          setIsReview(response.data.data); // 응답 데이터 설정
          
        } else if (response.data.code === "HIS-001") {
          alert("결과가 남아있지 않습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [navigate, setIsReview]);

  return (
    <div>
      <div className="container">
        <HeaderBack />
        {isReview.length > 0 ? (
          isReview.map((user, index) => (
            <div key={index} style={{ marginBottom: "50px" }}>
              <ResultInfoRrev
                user={user} // 개별 사용자 정보를 전달
                ifMainpage={true}
              />
            </div>
          ))
        ) : (
          <p>매칭결과가 없습니다</p>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Checkresult;
