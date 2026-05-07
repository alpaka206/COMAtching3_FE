import { useEffect } from "react";

import instance, { isAuthRequiredError } from "../axiosConfig";
import { useUserState } from "../store/appStore";

export function useCurrentPoint() {
  const [userPoint, setUserPoint] = useUserState();

  useEffect(() => {
    const fetchCurrentPoint = async () => {
      try {
        const response = await instance.get("/auth/user/api/currentPoint");

        setUserPoint((prev) => ({
          ...prev,
          point: response.data.data.currentPoint,
        }));
      } catch (error) {
        if (isAuthRequiredError(error)) return;
        console.error("Failed to fetch currentPoint:", error);
      }
    };

    fetchCurrentPoint();
  }, [setUserPoint]);

  return [userPoint, setUserPoint] as const;
}
