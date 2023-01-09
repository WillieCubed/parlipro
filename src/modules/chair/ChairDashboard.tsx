import { ref, child, set, push, onValue } from "@firebase/database";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";

export default function ChairDashboard() {
  const navigate = useNavigate();
  const { meetingId } = useParams();

  const [newMotion, setNewMotion] = React.useState("");

  const [currentMotion, setCurrentMotion] = React.useState("");

  React.useEffect(() => {
    const meetingRef = ref(db, `/meetings/${meetingId}`);
    const unsubscribe = onValue(meetingRef, (snapshot) => {
      const val = snapshot.val() as MeetingInfo;
      setCurrentMotion(val.currentMotion);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = (data: MeetingInfo, startNow: boolean) => {
    const meetingRef = ref(db, `/meetings/${meetingId}`);
    push(meetingRef, data).then((newRef) => {
      const meetingId = newRef.key;
      navigate(`/chair/${meetingId}`);
    });
  };

  /**
   * Send the current motion in the text box to the server.
   *
   * @param motion The new motion to set
   */
  const updateCurrentMotion = () => {
    const meetingRef = ref(db, `/meetings/${meetingId}`);
    set(meetingRef, {
      currentMotion: newMotion,
    })
      .then(() => {
        // Reset after successful update
        setNewMotion("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const content = event.currentTarget.value;
    setNewMotion(content);
  };

  const shouldDisableButton = newMotion.trim() === "";

  return (
    <main>
      <section className="absolute bottom-0 left-0 right-0 bg-primary-1">
        <div className="p-4 mx-auto mx-6xl">
          <div className="text-xl font-semibold">Update current motion</div>
          <div className="flex mt-2">
            <input
              className="flex-1 p-2 rounded-md"
              type="text"
              name="motion"
              id="motion"
              value={newMotion}
              onChange={handleFormUpdate}
              placeholder={currentMotion}
            />
            <button
              className="ml-2 p-2 rounded-md bg-white disabled:bg-gray-200"
              disabled={shouldDisableButton}
              onClick={updateCurrentMotion}
            >
              Update
            </button>
          </div>
        </div>
      </section>
      {/* <div className="max-w-4xl mx-auto p-4">
        <CreateMeetingDialog onSubmit={handleSubmit} />
      </div> */}
    </main>
  );
}

interface CreateMeetingDialogProps {
  onSubmit: (data: MeetingInfo, startNow: boolean) => void;
}

function CreateMeetingDialog({ onSubmit }: CreateMeetingDialogProps) {
  const handleSubmit = (
    values: MeetingInfo,
    actions: FormikHelpers<MeetingInfo>
  ) => {
    onSubmit(values, true);
  };

  return (
    <div className="p-8 bg-primary-1 rounded-lg">
      <Formik
        initialValues={{
          title: "Just another meeting",
          startTime: "",
          endTime: "",
          agendaUrl: "",
          currentMotion: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="py-2">
            <label className="text-xl font-bold" htmlFor="title">
              Meeting Name
            </label>
            <Field className="block p-2 rounded-md" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <Field name="startTime" type="date" />
            <label htmlFor="endTime">End Time</label>
            <Field name="endTime" type="date" />
          </div>
          <label htmlFor="agendaUrl">Agenda</label>
          <div>
            <button className="p-2 bg-primary-4 rounded-md" type="submit">
              Start now
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

type MeetingInfo = {
  title: string;
  startTime: string;
  endTime: string;
  agendaUrl: string;
  currentMotion: string;
};
