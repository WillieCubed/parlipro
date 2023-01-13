import React from "react";
import IconButton from "./components/IconButton";
import ShareLinkDialog from "./components/ShareLinkDialog";
import { ReactComponent as JoinIcon } from "../common/icons/Join.svg";
import { ReactComponent as NewIcon } from "../common/icons/New.svg";
import { useNavigate } from "react-router-dom";
import generateMeetingLink from "./lib/share";

export default function LandingPage() {
  const [isCopyLinkDialogOpen, setIsCopyLinkDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  const meetingId = "test";

  const handleClose = () => {
    navigate(generateMeetingLink(meetingId, "organizer", true));
  };

  return (
    <>
      <div className="h-full px-4 xl:grid xl:grid-cols-12">
        <section className="inline-block rounded-[16px] py-8 xl:col-start-2 xl:col-span-5 bg-primary-1 px-8 mt-[64px] shadow-md">
          <section>
            <div className="text-[96px] font-bold">ParliPro</div>
            <div className="mt-4 text-[34px] font-semibold">
              Presiding over meetings, done simply.
            </div>
          </section>
          <section className="mt-[96px] space-y-4">
            <div>
              <IconButton
                icon={<NewIcon />}
                onClick={() => setIsCopyLinkDialogOpen(true)}
                color="#CB8589"
              >
                Start meeting
              </IconButton>
            </div>
            <div>
              <IconButton
                icon={<JoinIcon />}
                to="/m/test/participant"
                color="#796465"
              >
                Join meeting as participant
              </IconButton>
            </div>
          </section>
        </section>
      </div>
      <ShareLinkDialog
        meetingId={meetingId}
        isOpen={isCopyLinkDialogOpen}
        onClose={() => handleClose()}
      />
    </>
  );
}
