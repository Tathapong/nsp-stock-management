// Component
import Spinner from "./Spinner";

function Loading() {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    </div>
  );
}
export default Loading;
