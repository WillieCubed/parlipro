import React, { useState } from "react";
import IconButton from "./components/IconButton";
import ShareLinkDialog from "./components/ShareLinkDialog";
import { ReactComponent as JoinIcon } from "../common/icons/Join.svg";
import { ReactComponent as NewIcon } from "../common/icons/New.svg";
import { useNavigate } from "react-router-dom";
import generateMeetingLink from "./lib/share";
import MeetingCreationDialog from "./components/MeetingCreationDialog";

export default function LandingPage() {
  const [shouldShowNewMeetingDialog, setShouldShowNewMeetingDialog] =
    useState(false);
  const navigate = useNavigate();

  const showNewMeetingDialog = () => {
    setShouldShowNewMeetingDialog(true);
  };

  const handleClose = () => {
    setShouldShowNewMeetingDialog(false);
  };

  const handleMeetingCreation = (
    meetingId: string,
    shouldStartNow: boolean
  ) => {
    setShouldShowNewMeetingDialog(false);
    if (shouldStartNow) {
      navigate(generateMeetingLink(meetingId, "organizer", true));
    } // TODO: Probably show a toast if not
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
                onClick={showNewMeetingDialog}
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
      <MeetingCreationDialog
        isOpen={shouldShowNewMeetingDialog}
        onMeetingCreated={handleMeetingCreation}
        onClose={handleClose}
      />
    </>
  );
}
