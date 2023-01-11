import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../common/components/IconButton";
import ShareLinkDialog from "../common/components/ShareLinkDialog";
import { Motion, useMeetingSession } from "../participant/lib";
import MinutesLog from "./MinutesLog";
import MotionToolbar from "./MotionToolbar";

export default function ChairDashboard() {
  const [isCopyLinkDialogOpen, setIsCopyLinkDialogOpen] = React.useState(false);
  // const navigate = useNavigate();
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

  // const handleSubmit = (data: MeetingInfo, startNow: boolean) => {
  //   const meetingRef = ref(db, `/meetings/${meetingId}`);
  //   push(meetingRef, data).then((newRef) => {
  //     const meetingId = newRef.key;
  //     navigate(`/chair/${meetingId}`);
  //   });
  // };

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
        {/* <div className="max-w-4xl mx-auto p-4">
        <CreateMeetingDialog onSubmit={handleSubmit} />
      </div> */}
      </main>

      <ShareLinkDialog
        meetingId={meetingId ?? ""}
        isOpen={isCopyLinkDialogOpen}
        onClose={() => setIsCopyLinkDialogOpen(false)}
      />
    </>
  );
}

// interface CreateMeetingDialogProps {
//   onSubmit: (data: MeetingInfo, startNow: boolean) => void;
// }

// function CreateMeetingDialog({ onSubmit }: CreateMeetingDialogProps) {
//   const handleSubmit = (
//     values: MeetingInfo,
//     actions: FormikHelpers<MeetingInfo>
//   ) => {
//     onSubmit(values, true);
//   };

//   return (
//     <div className="p-8 bg-primary-1 rounded-lg">
//       <Formik
//         initialValues={{
//           title: "Just another meeting",
//           startTime: "",
//           endTime: "",
//           agendaUrl: "",
//           currentMotion: {
//             mover: '',
//             content: '',
//             timestamp: new Date(),
//           },
//           motions: [],
//         }}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <div className="py-2">
//             <label className="text-xl font-bold" htmlFor="title">
//               Meeting Name
//             </label>
//             <Field className="block p-2 rounded-md" id="title" name="title" />
//           </div>
//           <div>
//             <label htmlFor="startTime">Start Time</label>
//             <Field name="startTime" type="date" />
//             <label htmlFor="endTime">End Time</label>
//             <Field name="endTime" type="date" />
//           </div>
//           <label htmlFor="agendaUrl">Agenda</label>
//           <div>
//             <button className="p-2 bg-primary-4 rounded-md" type="submit">
//               Start now
//             </button>
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// type MeetingInfo = {
//   title: string;
//   startTime: string;
//   endTime: string;
//   agendaUrl: string;
//   currentMotion: Motion;
//   motions: Motion[];
// };
