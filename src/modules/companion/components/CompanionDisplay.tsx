import { useParams } from "react-router-dom";
import { Motion, useMeetingSession } from "../../participant/lib";
import Clock from "./Clock";

// export function useCompanionDisplay() {
//   const [currentMotion, setcurrentMotion] = React.useState<Motion>();
//   const [previousMotion, setPreviousMotion] = React.useState<Motion>();

//   const move = (newMotion: Motion) => { };

//   return {
//     move,
//   };
// }

// interface VoteSessionState {
//   inFavor: Person[];
//   against: Person[];
// }

// interface AmendableMotion {
//   title: string;
//   /**
//    * @example allocate $50.00 for a Voter Registration Day event
//    */
//   originalText: string;

//   /**
//    * @example allocate $150.00 for a Voter Registration Day event
//    */
//   currentText: string;
// }

// /**
//  * A hook that handles voting logic.
//  *
//  * By default, all people are considered to have abstained from the vote.
//  *
//  * @param allPeople
//  * @returns
//  */
// function useVoterDisplay(allPeople: Person[]) {
//   const [yesses, setYeses] = React.useState<Person[]>([]);
//   const [noes, setNoes] = React.useState<Person[]>([]);

//   const addYes = (person: Person) => { };

//   const addNo = (person: Person) => { };

//   const abstentions = allPeople.filter((person) => {
//     return true;
//   });

//   return {
//     yesses,
//     noes,
//     abstentions,
//     addYes,
//     addNo,
//   };
// }

// interface VoterDisplayProps {
//   question: string;
//   showQuestion: boolean;
//   voters: {
//     yesses: Person[];
//     noes: Person[];
//     abstentions: Person[];
//   };
//   /**
//    * True if this is a roll call vote.
//    */
//   showVoters: boolean;
// }

// /**
//  * This is meant to be used primarily on the companion display.
//  *
//  * TODO: Figure out how to adapt component for minutes
//  */
// function VoterDisplay({
//   question,
//   voters: { yesses, noes, abstentions },
//   showQuestion,
//   showVoters,
// }: VoterDisplayProps) {
//   const questionText =
//     "the Senate allocate $50.00 for a Voter Registration Day event";

//   // TODO: Find a way to use showVoters.

//   return (
//     <div>
//       <div className="">The question: should {questionText}?</div>
//       <div className="flex">
//         <div className="text-xl">Yes: { }</div>
//         <div className="text-xl"></div>
//         <div className="text-xl">Abstentions</div>
//       </div>
//     </div>
//   );
// }

// interface MoverChipProps {
//   person: Person;
//   onClick: (personId: string) => void;
// }

// function MoverChip({ person: { id, firstName }, onClick }: MoverChipProps) {
//   return (
//     <div
//       className="inline-block bg-gray-200 rounded-md cursor-pointer"
//       onClick={() => onClick(id)}
//     >
//       {firstName}
//     </div>
//   );
// }

/**
 * Component properties for a CurrentMotionBlock.
 */
interface CurrentMotionBlockProps {
  inSession: boolean;
  motion: Motion | null;
}

/**
 * A component that displays information about the current motion in a meeting.
 */
function CurrentMotionBlock({ inSession, motion }: CurrentMotionBlockProps) {
  const timestampText = motion
    ? new Date(motion.timestamp).toLocaleTimeString([], {
        timeStyle: "short",
      })
    : "";

  return (
    <div className="p-8 max-w-5xl mx-auto rounded-3xl bg-primary-1 shadow-md">
      {(inSession && (
        <>
          <h1 className="font-display font-bold text-4xl">Current motion</h1>
          <div className="flex justify-between space-x-4 mt-6">
            {motion ? (
              <span className="font-display font-medium text-3xl">
                {motion.content}
              </span>
            ) : (
              <span className="font-display font-medium text-3xl italic">
                No pending motion
              </span>
            )}
            {motion && (
              <span className="font-display font-medium text-3xl">
                {timestampText}
              </span>
            )}
          </div>
        </>
      )) || <div className="font-bold text-center">Meeting not in session</div>}
    </div>
  );
}

/**
 * Component propeties for a CompanionFooter.
 */
interface CompanionFooterProps {
  meetingTitle: string;
  startTime: Date;
}

/**
 * A footer that displays meeting metadata at the bottom of the viewport.
 */
function CompanionFooter({ meetingTitle, startTime }: CompanionFooterProps) {
  const timeString = startTime.toLocaleDateString([], { dateStyle: "long" });

  return (
    <section
      id="footer"
      className="p-5 flex justify-between space-x-4 bg-primary-1"
    >
      <div className="space-x-2 text-2xl">
        <span className="font-bold font-display">{meetingTitle}</span>
        <span>•</span>
        <span className="font-semibold">{timeString}</span>
      </div>
      <Clock />
    </section>
  );
}

/**
 * A presenter mode that displays useful information for meeting visitors.
 */
export default function CompanionDisplay() {
  const { meetingId } = useParams();
  const { state, isInSession } = useMeetingSession(meetingId);

  return (
    <div className="h-screen w-screen flex flex-col">
      <main className="flex-1">
        <div className="mt-[33vh]">
          <CurrentMotionBlock
            inSession={isInSession}
            motion={state?.currentMotion ?? null}
          />
        </div>
      </main>
      <CompanionFooter meetingTitle={"Test Meeting"} startTime={new Date()} />
    </div>
  );
}
