import { Dialog } from "@headlessui/react";
import { ReactComponent as CopyIcon } from "../icons/Copy.svg";
import generateMeetingLink from "../lib/share";

/**
 * Component properties for a ShareLinkDialog.
 */
interface ShareLinkDialogProps {
  isOpen: boolean;
  meetingId: string;
  onClose: () => void;
  onContinue?: () => void;
}

/**
 * A dialog that shows the user a shareable link for the given meeting ID.
 */
export default function ShareLinkDialog({
  isOpen,
  meetingId,
  onClose,
  onContinue = () => undefined,
}: ShareLinkDialogProps) {
  // TODO: Find some more elegant way of accomplishing this for debug purposes
  const meetingUrl = generateMeetingLink(meetingId);

  const handleCopy = () => {
    const shareData = {
      title: "ParliPro Meeting",
      text: "", // Add meaningful text here
      url: meetingUrl,
    };

    if (!navigator.canShare || !navigator.canShare(shareData)) {
      // Just copy to clipboard
      // TODO: Handle errors
      navigator.clipboard.writeText(meetingUrl);
      return;
    }
    navigator.share(shareData);
  };

  const handleContinue = () => {
    onClose();
    onContinue();
  };

  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      {/* Just a backdrop */}
      <div className="fixed inset-0 bg-[#1C1B1F]/[66%]" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl p-8 bg-primary-1 rounded-2xl">
            <Dialog.Title className="text-2xl font-display font-bold">
              Host a meeting
            </Dialog.Title>
            <Dialog.Description className="mt-2 font-medium">
              Your meeting is ready! Share this link with the participants.
            </Dialog.Description>

            <div className="mt-4">
              <div className="font-display font-semibold text-sm">
                Meeting link
              </div>
              <div className="mt-2 p-2 border-2 border-[#796465] flex space-x-3 bg-white rounded-md">
                <div className="p-2 flex-1 font-bold">{meetingUrl}</div>
                <div
                  className="p-2 cursor-pointer hover:bg-slate-200 rounded-md transition ease-in-out"
                  onClick={handleCopy}
                >
                  <CopyIcon />
                </div>
              </div>
              <div className="mt-4 flex flex-row-reverse">
                {/* TODO: Only render if actually continuing. */}
                <button
                  className="py-[8px] px-[12px] bg-[#796465] rounded-lg font-display font-semibold text-white hover:shadow-md focus:shadow-md transition ease-in-out"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
