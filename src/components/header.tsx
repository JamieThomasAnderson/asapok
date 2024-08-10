import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center text-white">
      <div className="flex w-full flex-col items-start space-y-8 p-4 lg:w-[950px]">
        <div
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl"
          role="button"
          onClick={() => router.push("/")}
        >
          <span>share </span>
          <span className="underline">without</span>
          <span> limits </span>
          <span className="mt-4 text-xl font-light tracking-tight sm:text-2xl">
            asap, ok?
          </span>
        </div>
        <h1 className="w-[500px] text-wrap text-lg font-medium text-zinc-400">
          Instantly share your markdown creations with friends, family, or
          coworkers—publish in just seconds!
        </h1>
      </div>
    </div>
  );
};
