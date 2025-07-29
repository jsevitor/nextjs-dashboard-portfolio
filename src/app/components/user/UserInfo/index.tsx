import { useSessionStore } from "@/stores/sessionStore";
import Image from "next/image";

export default function UserInfro() {
  const { user } = useSessionStore((state) => state.session);

  return (
    <div className="flex flex-col gap-4 items-center mt-12 lg:mt-0 pr-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <Image
            src={user?.image as string}
            alt={user?.name as string}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <div className="text-xs">{user?.name}</div>
          <div className="font-extralight text-xs">{user?.email}</div>
        </div>
      </div>
    </div>
  );
}
