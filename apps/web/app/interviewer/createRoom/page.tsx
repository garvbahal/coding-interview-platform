import { CreateRoomNavbar } from "../../../components/createRoom/Navbar";
import { ProblemDetails } from "../../../components/createRoom/ProblemDetails";

export default function CreateRoom() {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <CreateRoomNavbar />
      <ProblemDetails />
    </div>
  );
}
