import React from "react";
import { Motion } from "../participant/lib";

interface MinutesEventProps {
  content: string;
  timestamp: number;
}

function MinutesEvent({ content, timestamp }: MinutesEventProps) {
  const displayTimestamp = new Date(timestamp * 1000).toLocaleTimeString();
  return (
    <div className="md:flex my-2 space-x-2">
      <div className="flex-1">{content}</div>
      <div className="italic text-sm">{displayTimestamp}</div>
    </div>
  );
}

interface MinutesEventListProps {}

function MinutesEventList({
  children,
}: React.PropsWithChildren<MinutesEventListProps>) {
  return <>{children}</>;
}

interface MinutesLogProps {
  motions: Motion[];
}

export default function MinutesLog({ motions }: MinutesLogProps) {
  const items = motions.map(({ content, mover, timestamp }) => {
    return (
      <MinutesEvent key={timestamp} content={content} timestamp={timestamp} />
    );
  });
  // TODO: Map items to actual vents
  return <MinutesEventList>{items}</MinutesEventList>;
}
