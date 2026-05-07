import { useEffect } from "react";

import instance, { isAuthRequiredError } from "../axiosConfig";
import { useUserPointState } from "../store/appStore";

export function useCurrentPoint() {
  const [currentPoint, setUserPoint] = useUserPointState();

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

  return [currentPoint, setUserPoint] as const;
}
