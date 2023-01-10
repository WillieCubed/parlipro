import { ref, onValue } from "firebase/database";
import React from "react";
import { db } from "../../../lib/firebase";

/**
 * A hook to access and modify meeting data.
 *
 * @param meetingId The ID the meeting to observe and interact with.
 */
export function useMeetingSession(meetingId: string | undefined) {
  const [state, setState] = React.useState<MeetingState | null>(null);

  const handleSessionChange = () => {};

  const addMotion = () => {};

  const editMotion = (motionId: string, newContents: Motion) => {};

  const isInSession = state !== null;

  React.useEffect(() => {
    if (!meetingId) {
      setState(null);
      return;
    }

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
      setState(null);
    };
  }, [meetingId]);
  return {
    state,
    isInSession,
    addMotion,
    editMotion,
  };
}

export type Motion = {
  /**
   * The name of the person who made the motion.
   */
  mover: string;
  /**
   * The plain text of the motion in a form that's appended to "Person moved to...".
   *
   * Clients should display the first letter of this content in lowercase.
   *
   * e.g.: "adopt the resolution" would become "Person moved to adopt the resolution"
   */
  content: string;
  /**
   * A UNIX epoch timestamp of when this motion was originally made.
   *
   * This is set when the motion is recorded by the secretary, which should be after the
   * mover is recognized by the presiding officer.
   */
  timestamp: number;
};

/**
 * Data representing an active meeting session.
 */
export type MeetingState = {
  /**
   * The motion currently being considered.
   */
  currentMotion: Motion;
  /**
   * A list of all motions made during this meeting.
   */
  motions: Motion[];
};
