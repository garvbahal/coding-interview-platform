import { RoomClient } from "../../../components/interviewRoom/RoomClient";

export default async function RoomPage({ params }: any) {
  const { roomCode } = await params;

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <RoomClient roomCode={roomCode} />
    </div>
  );
}
