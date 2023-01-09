import React from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../../../lib/firebase";

type MeetingState = {
  currentMotion: string;
};

export default function ParticipantDisplay() {
  const [state, setState] = React.useState<MeetingState>();
  const { meetingId } = useParams();

  React.useEffect(() => {
    const meetingRef = ref(db, `meetings/${meetingId}`);
    const unsubscribe = onValue(meetingRef, (snapshot) => {
      const updatedState = snapshot.val() as MeetingState;
      if (!updatedState) {
        return;
      }
      setState(updatedState);
    });
    return () => {
      unsubscribe();
    };
  }, [meetingId]);

  return (
    <main className="p-4">
      <div className="max-w-4xl mx-auto p-8 bg-primary-1 rounded-[24px]">
        <div className="text-2xl font-bold">Current motion</div>
        <div className="text-xl font-bold">
          {state?.currentMotion ?? "Meeting not in session"}
        </div>
        <div className="mt-4 text-lg">Current meeting: {meetingId}</div>
      </div>
    </main>
  );
}
