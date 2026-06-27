import { LeftPanel } from "../../../components/auth/LeftPanel";
import { RightPanel } from "../../../components/auth/RightPanel";

export default function Signup() {
  return (
    <div className="class=bg-white text-gray-900 antialiased selection:bg-gray-900 selection:text-white">
      <div className="flex min-h-screen">
        <LeftPanel isSignup={true} />
        <RightPanel isSignup={true} />
      </div>
    </div>
  );
}
