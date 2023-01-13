import { useState, useEffect } from "react";

const ONE_MINUTE_MILLIS = 1_000 * 60;

/**
 * A component that displays the current time in hh:ss format.
 */
export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    function updateClock() {
      setCurrentTime(new Date());
    }

    const timer = setInterval(updateClock, ONE_MINUTE_MILLIS);

    return () => {
      clearInterval(timer);
    };
  }, [currentTime]);

  const displayTime = currentTime.toLocaleTimeString([], {
    timeStyle: "short",
  });

  return (
    <div className="inline-block text-2xl font-medium font-display">
      Current time: {displayTime}
    </div>
  );
}
