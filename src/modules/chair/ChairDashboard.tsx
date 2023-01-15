import React from "react";
import { useParams } from "react-router-dom";
import IconButton from "../common/components/IconButton";
import ShareLinkDialog from "../common/components/ShareLinkDialog";
import { Motion, useMeetingSession } from "../participant/lib";
import MinutesLog from "./MinutesLog";
import MotionToolbar from "./MotionToolbar";

/**
 * Export a list of motions to a file.
 *
 * This uses the browser to download a plain text file containing a new line
 * for each motion.
 *
 * @param motions The business that happened during a meeting
 * @param title The name of the file without the file extension
 */
function exportMinutes(motions: Motion[], title: string) {
  // It amazes me that we don't have a better API for this in 2023, but it
  // makes sense given how the web was designed
  const contents = motions.map(({ content }) => content).join("\n");
  const file = new Blob([contents], { type: "text/plain" });
  const url = URL.createObjectURL(file);
  const linkElement = document.createElement("a");
  const filename = `${title}.txt`;
  linkElement.download = filename;
  linkElement.href = url;
  linkElement.click();
  console.debug("Minutes exported to", filename);
}

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

  const handleExportMinutes = () => {
    exportMinutes(state?.motions ?? [], "minutes");
  };

  return (
    <>
      <main className="p-8">
        <section className="max-w-5xl mx-auto">
          <div className="p-4 bg-primary-1 rounded-lg">
            <h1 className="text-2xl font-bold">Meeting Minutes</h1>
            <div className="mt-4 space-x-2">
              <IconButton onClick={() => setIsCopyLinkDialogOpen(true)}>
                Share meeting link
              </IconButton>
              <IconButton onClick={handleExportMinutes}>
                Export minutes
              </IconButton>
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto">
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
