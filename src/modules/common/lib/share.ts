type LinkType = "participant" | "organizer";

/**
 * Create a meeting link usable for sharing.
 *
 * @param meetingId The ID of the meeting
 * @param type A setting that controls
 * @param pathOnly If true, the generated URL will not include the site domain
 *
 * @returns A valid URL to join the given meeting
 */
export default function generateMeetingLink(
  meetingId: string,
  type: LinkType = "participant",
  pathOnly = false
) {
  const domain = pathOnly
    ? ""
    : process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : "http://localhost:3000";
  let typePath;
  if (type === "participant") {
    typePath = "participant";
  } else if (type === "organizer") {
    typePath = "chair";
  }
  const meetingUrl = `${domain}/m/${meetingId}/${typePath}`;
  return meetingUrl;
}
