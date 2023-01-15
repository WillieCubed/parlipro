import { Dialog } from "@headlessui/react";
import { useState } from "react";
import ShareLinkDialog from "./ShareLinkDialog";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Formik, Field, FormikHelpers, Form } from "formik";
import { db, firestore } from "../../../lib/firebase";
import { ReactComponent as NewIcon } from "../../common/icons/New.svg";
import { ref, set } from "firebase/database";
import { MeetingState } from "../../participant/lib";

/**
 * Component props for a MeetingCreationDialog.
 */
interface MeetingCreationDialogProps {
  /**
   * A property controlling the visibility of the dialog.
   *
   * If true, the dialog is visible to the screen.
   */
  isOpen: boolean;
  /**
   * A callback triggered when this dialog is closed or cancelled.
   *
   * This is only called when a new meeting hasn't been created yet.
   */
  onClose: () => void;
  /**
   *
   * @param meetingId The ID of the created meeting
   */
  onMeetingCreated: (meetingId: string, shouldStartNow: boolean) => void;
}

/**
 * Metadata for a meeting.
 *
 * This information is used to provide context to a meeting when it is in
 * session.
 */
type MeetingInfo = {
  /**
   * e.g. iajsfoi!239uf09af
   */
  uid: string;
  /**
   * A custom meeting code chosen by the user.
   *
   * e.g. senate-2023-01-25
   */
  customCode: string;
  /**
   * e.g. Student Senate meeting
   */
  title: string;
  startTime: string;
  agendaUrl: string;
};

type FormMeetingInfo = Omit<MeetingInfo, "uid">;

/**
 * Adds meeting data to the database.
 *
 * @param info Meeting data to add
 */
async function createMeeting(info: FormMeetingInfo): Promise<MeetingInfo> {
  const data = {
    ...info, // TODO: Store date string as an actual Firestore timestamp
  };
  const meetingsCollection = collection(firestore, "/meetings");
  try {
    const result = await addDoc(meetingsCollection, data);
    const uid = result.id;
    await updateDoc(doc(firestore, `/meetings/${result.id}`), {
      uid,
    });

    const meeting: MeetingInfo = {
      ...info,
      uid,
    };

    // TODO: Probably do this only when a meeting actually begins
    const meetingRef = ref(db, `/meetings/${result.id}`);
    const initialState: MeetingState = {
      currentMotion: {
        mover: "",
        content: "",
        timestamp: 0,
      },
      motions: [],
    };
    await set(meetingRef, initialState);
    return meeting;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function NewButton({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLProps<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      type="submit"
      className={`inline-flex px-3 py-2 space-x-2 rounded-xl shadow-sm hover:shadow-md focus:shadow-md text-white font-semibold font-display ${props.className}`}
    >
      {children}
    </button>
  );
}

/**
 * A dialog that allows a user to create a new meeting and generate a link for it.
 */
export default function MeetingCreationDialog({
  isOpen,
  onClose,
  onMeetingCreated,
}: MeetingCreationDialogProps) {
  const [shouldShowCopyLinkDialog, setShouldShowCopyLinkDialog] =
    useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [shouldStartNow, setShouldStartNow] = useState(false);

  const handleCreationFlowComplete = () => {
    setShouldShowCopyLinkDialog(false);
    onMeetingCreated(meetingId, shouldStartNow);
  };

  const handleSubmit = async (
    values: FormMeetingInfo,
    actions: FormikHelpers<FormMeetingInfo>
  ) => {
    console.log("submitting");
    const { uid } = await createMeeting(values);
    setMeetingId(uid);
    setShouldShowCopyLinkDialog(true);
  };

  return (
    <>
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
              <div className="bg-primary-1 rounded-lg">
                <Formik
                  initialValues={{
                    title: "Just another meeting",
                    customCode: "",
                    startTime: "",
                    agendaUrl: "",
                  }}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mt-4">
                        <label
                          className="text-lg font-bold font-display"
                          htmlFor="title"
                        >
                          Meeting Name
                        </label>
                        <Field
                          className="w-full mt-2 block p-2 rounded-md border-2 border-[#796465]"
                          id="title"
                          name="title"
                          placeholder="Just another meeting"
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          className="text-lg font-bold font-display"
                          htmlFor="startTime"
                        >
                          Start Time
                        </label>
                        <Field
                          className="w-full mt-2 block p-2 rounded-md border-2 border-[#796465]"
                          name="startTime"
                          type="datetime-local"
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          className="text-lg font-bold font-display"
                          htmlFor="agendaUrl"
                        >
                          Link to agenda (optional)
                        </label>
                        <Field
                          className="w-full mt-2 block p-2 rounded-md border-2 border-[#796465]"
                          name="agendaUrl"
                          type="url"
                          placeholder="https://box.com/..."
                        />
                      </div>
                      <div className="mt-8 space-x-2">
                        <NewButton
                          className="bg-[#796465] disabled:bg-slate-400"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <NewIcon />
                          <span>Schedule for later</span>
                        </NewButton>
                        <NewButton
                          className="bg-[#CB8589] disabled:bg-slate-400"
                          onClick={() => setShouldStartNow(true)}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <NewIcon />
                          <span>Start meeting now</span>
                        </NewButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      <ShareLinkDialog
        meetingId={meetingId}
        isOpen={shouldShowCopyLinkDialog}
        onClose={handleCreationFlowComplete}
      />
    </>
  );
}
