// @ts-nocheck
import { useEffect, useRef } from "react";
import AdminRequestListContainer from "./AdminRequestListContainer";

import * as styles from "../css/components/AdminRequestList.css";
import { useAdminRequestsState } from "../store/appStore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Adminnavbar";
import { ROUTES } from "../routes";
import { getAuthorizationHeader } from "../lib/authStorage";
import { API_BASE_URL } from "../axiosConfig";

function AdminRequestList() {
  const navigate = useNavigate();
  const [requests, setRequests] = useAdminRequestsState();
  const stompClientRef = useRef<any>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const authorization = getAuthorizationHeader();

      if (!authorization) {
        navigate(ROUTES.adminLogin);
        return;
      }

      const [{ default: SockJS }, stompModule] = await Promise.all([
        import("sockjs-client"),
        import("stompjs"),
      ]);
      const Stomp = stompModule.default ?? stompModule;
      const socket = new SockJS(`${API_BASE_URL}/wss`);
      const client = Stomp.over(socket);

      client.debug = null;
      client.connect(
        { Authorization: authorization },
        () => {
          stompClientRef.current = client;

          // 충전 요청 구독
          client.subscribe("/topic/chargeRequests", (message) => {
            const chargeRequests = JSON.parse(message.body);
            // updateRequestsWithoutDuplicates(chargeRequests);
            setRequests((prevRequests) => {
              return [
                ...prevRequests,
                ...chargeRequests.filter(
                  (newReq) =>
                    !prevRequests.some((req) => req.userId === newReq.userId)
                ),
              ];
            });
          });

          // 승인 업데이트 구독
          client.subscribe("/topic/approvalUpdate", (message) => {
            const userId = message.body;
            setRequests((prevRequests) => {
              return [
                ...prevRequests.filter((request) => request.userId !== userId),
              ];
            });
          });
          client.subscribe("/topic/cancelUpdate", (message) => {
            const userId = message.body;
            setRequests((prevRequests) => {
              return [
                ...prevRequests.filter((request) => request.userId !== userId),
              ];
            });
          });
        },
        (error) => {
          console.error("Error connecting to WebSocket", error);
        }
      );
    };

    const initializeWebSocket = async () => {
      try {
        await connectWebSocket();
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error);
      }
    };

    initializeWebSocket();

    return () => {
      const client = stompClientRef.current;
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [navigate, setRequests]); // 빈 의존성 배열로 한 번만 실행
  function handleAction(userId, amount, actionType) {
    const stompClient = stompClientRef.current;
    if (!stompClient) return;

    const approvalData = {
      userId,
      amount,
      approvalTime: new Date().toISOString(),
    };
    const destination =
      actionType === "approve" ? "/app/approveCharge" : "/app/cancelCharge";
    stompClient.send(destination, {}, JSON.stringify(approvalData));
    setRequests((prevRequests) =>
      prevRequests.filter((req) => req.userId !== userId)
    );
  }

  return (
    <div>
      <AdminNavbar />
      <div className={styles.content}>
        <div className={styles.adminRequestListTitle}>충전 요청 목록</div>
        <div className={styles.adminRequestListText}>
          유저로부터 이름, 아이디, 입금 내역 확인해서 그만큼 충전
        </div>
        <div className={styles.adminRequestListBox}>
          {requests.map(
            (request, index) =>
              !request.isChecked && (
                <AdminRequestListContainer
                  key={index}
                  request={request}
                  handleAction={handleAction} // handleAction을 prop으로 전달
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRequestList;
