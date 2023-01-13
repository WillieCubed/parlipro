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
  // Yes, this is necessary due to how Create React App produces the PUBLIC_URL
  // env variable at build time https://stackoverflow.com/questions/62520904/react-public-url-env-variable
  // See this: https://stackoverflow.com/a/72493460/5742625
  const publicUrl = process.env.PUBLIC_URL;
  const domain = pathOnly
    ? ""
    : publicUrl
    ? publicUrl
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
