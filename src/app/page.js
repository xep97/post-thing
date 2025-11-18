import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        
        <div className="">
          <h1 className="">
            TimePost
          </h1>
          <p className="">
            Make a post and choose when it should be visible for people to see{" "}
            
          </p>
          <div className="">
            <a
              className=""
              href="create"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/file.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Create a post
            </a>
            <a
              className=""
              href="find"
              rel="noopener noreferrer"
            >
              Find a post
            </a>
          </div>
          <p className="">
            By using this website you agree to the{" "}
            <a
              href="/"
              className=""
            >
              terms of use
            </a>
          </p>
        </div>
        
      </main>
    </div>
  );
}
