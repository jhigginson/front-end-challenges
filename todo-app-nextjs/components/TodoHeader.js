import Image from "next/image";

export default function TodoHeader() {
  return (
    <header>
      <h1>TODO</h1>
      <img alt="Toggle Dark Mode" className="dark-mode-toggler" />
    </header>
    
  );
}