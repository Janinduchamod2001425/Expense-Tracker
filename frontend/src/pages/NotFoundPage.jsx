const NotFound = () => {
  return (
    <section>
      <div className=" text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center mt-[30px]">
            <div>
              <img src="/404.svg" alt="404" className="w-[800px]" />
            </div>
            <p className="text-sm md:text-base text-[#62f600] p-2 mb-4">
              The stuff you were looking for doesn&apos;t exist
            </p>
            <a
              href="/"
              className="bg-transparent hover:bg-[#c9b339] hover:text-black text-[#25b365] hover:font-bold rounded shadow hover:shadow-lg py-2 px-4 border border-[#4bb830] hover:border-transparent"
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
