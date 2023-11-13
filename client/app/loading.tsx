import Image from "next/image";

const loading = () => {
  return (
    <div className="grid min-h-screen place-content-center bg-gray-300 dark:bg-slate-900">
      <Image
        src={"/images/loader.gif"}
        width={75}
        height={75}
        alt="Loading..."
      />
    </div>
  );
};

export default loading;
