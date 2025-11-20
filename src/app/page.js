import Image from "next/image";

export default function Home() {
  return (
    <div className="main-list">
      <Image
        className="icons"
        src="/timepost.png"
        alt="Timepost"
        width={384}
        height={384}
      />
      <h1 className="">
        Post something and choose when it should be visible
      </h1>
      
      <div className="">
        <a
          className="main-link"
          href="create"
          rel="noopener noreferrer"
        >
          Create a post
        </a>
        <a
          className="main-link"
          href="find"
          rel="noopener noreferrer"
        >
          Find a post
        </a>
      </div>
      <p className="">
        By using this website you agree to the{" "}
        <a
          href="terms"
          className=""
        >
          terms of use
        </a>
      </p>
    </div>
  );
}
