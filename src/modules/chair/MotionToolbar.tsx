import { ref, runTransaction } from "@firebase/database";
import React from "react";
import { db } from "../../lib/firebase";
import { Motion, MeetingState } from "../participant/lib";

/**
 * Component properties for a MotionToolbar.
 */
interface MotionToolbarProps {
  meetingId: string | undefined;
  currentMotion: Motion | null;
}

/**
 * A toolbar that allows the user to add motions to the record.
 *
 * This is meant to be used primarily by someone organizing a meeting.
 */
export default function MotionToolbar({
  meetingId,
  currentMotion,
}: MotionToolbarProps) {
  const [inputContents, setInputContents] = React.useState("");

  const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const content = event.currentTarget.value;
    setInputContents(content);
  };

  /**
   * Send the current motion in the text box to the server.
   *
   * @param motion The new motion to set
   */
  const updateCurrentMotion = () => {
    const meetingRef = ref(db, `/meetings/${meetingId}`);

    runTransaction(meetingRef, (meeting: MeetingState) => {
      const newMotion = {
        mover: "Secretary",
        content: inputContents,
        timestamp: new Date().getMilliseconds(),
      };

      meeting.currentMotion = newMotion;
      if (meeting.motions) {
        meeting.motions = [...meeting.motions, newMotion];
      } else {
        meeting.motions = [newMotion];
      }

      return meeting;
    })
      .then(() => {
        // Reset after successful update
        setInputContents("");
      })
      .catch((error) => {
        // TODO: App-wide error handling
        console.error(error);
      });
  };

  const shouldDisableButton = inputContents.trim() === "";
  return (
    <div className="p-4 mx-auto max-w-5xl rounded-t-lg bg-primary-1">
      <div className="text-xl font-semibold">Update current motion</div>
      <form
        className="flex mt-2"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          className="flex-1 p-2 rounded-md"
          type="text"
          name="motion"
          id="motion"
          value={inputContents}
          onChange={handleFormUpdate}
          placeholder={currentMotion?.content ?? ""}
        />
        <button
          type="submit"
          className="ml-2 p-2 rounded-md bg-white disabled:bg-gray-200"
          disabled={shouldDisableButton}
          onClick={updateCurrentMotion}
        >
          Update
        </button>
      </form>
    </div>
  );
}
