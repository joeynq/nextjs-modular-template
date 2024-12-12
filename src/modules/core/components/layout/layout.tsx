import { PropsWithChildren } from "react";
import { Summary } from "../summary";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-8 pb-0 flex flex-col max-h-screeb h-full overflow-hidden">
      <header className="py-4">
        <Summary />
      </header>
      <main className="grow overflow-hidden">{children}</main>
    </div>
  );
};
