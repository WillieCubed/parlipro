import React from "react";
import { useParams } from "react-router-dom";
import IconButton from "../common/components/IconButton";
import ShareLinkDialog from "../common/components/ShareLinkDialog";
import { Motion, useMeetingSession } from "../participant/lib";
import MinutesLog from "./MinutesLog";
import MotionToolbar from "./MotionToolbar";

export default function ChairDashboard() {
  const [isCopyLinkDialogOpen, setIsCopyLinkDialogOpen] = React.useState(false);
  const { meetingId } = useParams();

  const { state, isInSession, addMotion } = useMeetingSession(meetingId);

  const [currentMotion, setCurrentMotion] = React.useState<Motion | null>({
    mover: "",
    content: "",
    timestamp: Date.now(),
  });

  React.useEffect(() => {
    setCurrentMotion(state?.currentMotion ?? null);
  }, [state, isInSession]);

  return (
    <>
      <main className="p-8">
        <section className="max-w-5xl mx-auto">
          <IconButton onClick={() => setIsCopyLinkDialogOpen(true)}>
            Share meeting link
          </IconButton>
        </section>
        <section className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Minutes</h1>
          <MinutesLog motions={state?.motions ?? []} />
        </section>
        <section className="absolute bottom-0 left-0 right-0">
          <MotionToolbar meetingId={meetingId} currentMotion={currentMotion} />
        </section>
      </main>

      <ShareLinkDialog
        meetingId={meetingId ?? ""}
        isOpen={isCopyLinkDialogOpen}
        onClose={() => setIsCopyLinkDialogOpen(false)}
      />
    </>
  );
}
