import { useEffect } from "react";

export default function useBidsSocket(onNewBid) {
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/api/ws/bids");

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = event => {
      const bid = JSON.parse(event.data);
      console.log("📡 Live bid received:", bid);
      onNewBid(bid);
    };

    ws.onerror = err => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => ws.close();
  }, [onNewBid]);
}