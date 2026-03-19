import { useEffect } from "react";

export default function useBidsSocket(onNewBid) {
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/api/ws/bids");

    ws.onmessage = event => {
      const bid = JSON.parse(event.data);
      onNewBid(bid); // callback to update state
    };

    return () => ws.close();
  }, [onNewBid]);
}