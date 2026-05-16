// @ts-nocheck
import { useEffect, useRef } from "react";
import AdminChargeRequestItem from "./AdminChargeRequestItem";

import * as styles from "../_styles/AdminChargeRequests.css";
import { useAdminRequestsState } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import { ROUTES } from "@/routes";
import { getAuthorizationHeader } from "@/lib/authStorage";
import { API_BASE_URL } from "@/axiosConfig";

function AdminChargeRequestsClient() {
  const navigate = useNavigate();
  const [requests, setRequests] = useAdminRequestsState();
  const stompClientRef = useRef<any>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const disconnectWebSocket = () => {
      const client = stompClientRef.current;
      const socket = socketRef.current;

      if (client?.connected) {
        client.disconnect();
      } else {
        socket?.close?.();
      }

      stompClientRef.current = null;
      socketRef.current = null;
    };

    const connectWebSocket = async () => {
      const authorization = getAuthorizationHeader();

      if (!authorization) {
        if (isMounted) {
          navigate(ROUTES.adminLogin);
        }
        return;
      }

      const [{ default: SockJS }, stompModule] = await Promise.all([
        import("sockjs-client"),
        import("stompjs"),
      ]);

      if (!isMounted) return;

      const Stomp = stompModule.default ?? stompModule;
      const socket = new SockJS(`${API_BASE_URL}/wss`);
      const client = Stomp.over(socket);

      socketRef.current = socket;
      stompClientRef.current = client;
      client.debug = null;
      client.connect(
        { Authorization: authorization },
        () => {
          if (!isMounted) {
            disconnectWebSocket();
            return;
          }

          // 충전 요청 구독
          client.subscribe("/topic/chargeRequests", (message) => {
            if (!isMounted) return;

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
            if (!isMounted) return;

            const userId = message.body;
            setRequests((prevRequests) => {
              return [
                ...prevRequests.filter((request) => request.userId !== userId),
              ];
            });
          });
          client.subscribe("/topic/cancelUpdate", (message) => {
            if (!isMounted) return;

            const userId = message.body;
            setRequests((prevRequests) => {
              return [
                ...prevRequests.filter((request) => request.userId !== userId),
              ];
            });
          });
        },
        (error) => {
          if (isMounted) {
            console.error("Error connecting to WebSocket", error);
          }
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
      isMounted = false;
      disconnectWebSocket();
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
                <AdminChargeRequestItem
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

export default AdminChargeRequestsClient;
