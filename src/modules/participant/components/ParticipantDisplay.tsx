import { useParams } from "react-router-dom";
import { useMeetingSession } from "../lib";

/**
 * A dashboard that allows a meeting participant to keep track of discussion.
 */
export default function ParticipantDisplay() {
  const { meetingId } = useParams();

  const { state, isInSession } = useMeetingSession(meetingId);

  const motionText = isInSession
    ? state?.currentMotion.content ?? ""
    : "Meeting not in session.";

  return (
    <main className="p-4">
      <div className="max-w-4xl mx-auto p-8 bg-primary-1 rounded-[24px]">
        <div className="text-2xl font-bold">Current motion</div>
        <div className="text-xl font-bold">{motionText}</div>
        <div className="mt-4 text-lg">Current meeting: {meetingId}</div>
      </div>
    </main>
  );
}
