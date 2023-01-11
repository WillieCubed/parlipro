import React from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useParams } from "react-router-dom";
import { useMeetingSession } from "../lib";
import ShareLinkDialog from "../../common/components/ShareLinkDialog";

/**
 * A dashboard that allows a meeting participant to keep track of discussion.
 */
export default function ParticipantDisplay() {
  const [isCopyLinkDialogOpen, setIsCopyLinkDialogOpen] = React.useState(false);
  const { meetingId } = useParams();

  const { state, isInSession } = useMeetingSession(meetingId);

  const motionText = isInSession
    ? state?.currentMotion.content ?? ""
    : "Meeting not in session.";

  return (
    <>
      <main className="p-4">
        <div className="flex max-w-4xl mx-auto p-8 bg-primary-1 rounded-[24px]">
          <div className="flex-1">
            <div className="text-2xl font-bold">Current motion</div>
            <div className="text-xl font-bold">{motionText}</div>
            <div className="mt-4 text-lg">Current meeting: {meetingId}</div>
          </div>
          <button
            type="button"
            className="inline-block cursor-pointer"
            onClick={() => setIsCopyLinkDialogOpen(true)}
          >
            <MoreVertRoundedIcon />
          </button>
        </div>
      </main>

      <ShareLinkDialog
        meetingId={meetingId ?? ""}
        isOpen={isCopyLinkDialogOpen}
        onClose={() => setIsCopyLinkDialogOpen(false)}
      />
    </>
  );
}
