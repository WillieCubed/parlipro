import { useState } from "react";
import IconButton from "./components/IconButton";
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
      <div className="h-full py-4 px-4 lg:grid lg:grid-cols-12 lg:gap-4 xl:gap-8">
        <section className="rounded-[16px] px-6 py-6 lg:px-8 lg:py-8 mt-12 xl:mt-[25%] xl:col-start-2 lg:col-span-6 xl:col-span-5 bg-primary-1 shadow-md">
          <section>
            <div className="text-5xl mt-4 lg:mt-8 lg:text-[96px] font-display font-bold">
              ParliPro
            </div>
            <div className="mt-4 text-2xl lg:text-[34px] font-display font-semibold leading-relaxed">
              Presiding over meetings, done simply.
            </div>
          </section>
          <section className="mt-[48px] lg:mt-[144px] space-y-4">
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
        <section className="p-6 lg:p-8 mt-4 xl:mt-[25%] lg:col-span-6 xl:col-span-5">
          <div className="lg:mt-8 space-y-2">
            <h1 className="font-display font-semibold text-3xl">
              About ParliPro
            </h1>
            <p className="font-display text-lg">
              ParliPro is a tool for people running meetings using Robert&apos;s
              Rules of Order.
            </p>
            <p>
              With ParliPro, you can keep order during a meeting and ensure that
              everyone, including an audience, knows what is happening.
            </p>
            <p>
              ParliPro was made by{" "}
              <a
                className="text-red-800 hover:underline"
                href="http://williecubed.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                Willie Chalmers III
              </a>
              , a senator in his university's{" "}
              <a
                className="text-red-800 hover:underline"
                href="http://sg.utdallas.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                student government
              </a>{" "}
              because he was bored one week and kept having nightmares about
              people not understanding Robert&apos;s Rules.
            </p>
            <h2 className="pt-4 font-medium text-2xl">How to use</h2>
            <p>
              If you&apos;re hosting a meeting, simply start a new meeting using
              the big button. You can immediately start a ParliPro meeting or
              get a link to schedule a meeting for later.
            </p>
            <p>
              Once you&apos;re in the meeting in the chairperson view, you can
              keep track of motions made during a meeting. These motions can be
              displayed in another tab on the Companion View, which is just a
              pretty display for the current state of the meeting useful for
              projectors or rooms where guests would like to see the current
              item of business.
            </p>
            <p>
              In the future, users will be able to identify themselves by
              signing into meetings, and the Chairperson View will allow an
              organizer to export attendance and motions made during a meeting
              to a file.
            </p>
          </div>
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
