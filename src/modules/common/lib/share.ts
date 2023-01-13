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
  let baseUrl;
  if (pathOnly) {
    baseUrl = "";
  } else {
    if (process.env.REACT_APP_BASE_URL) {
      baseUrl = process.env.REACT_APP_BASE_URL;
    } else {
      baseUrl = window.location.protocol + "//" + window.location.host;
    }
  }

  let typePath;
  if (type === "participant") {
    typePath = "participant";
  } else if (type === "organizer") {
    typePath = "chair";
  }
  const meetingUrl = `${baseUrl}/m/${meetingId}/${typePath}`;
  return meetingUrl;
}
