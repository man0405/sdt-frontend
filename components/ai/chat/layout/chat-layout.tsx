import { ReactNode } from "react";

interface ChatLayoutProps {
  header: ReactNode;
  sidebar?: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export function ChatLayout({
  header,
  sidebar,
  body,
  footer,
}: ChatLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border bg-background">
      {sidebar}

      <div className="flex min-w-0 flex-1 flex-col">
        {header}

        <div className="flex-1 overflow-hidden">
          {body}
        </div>

        {footer}
      </div>
    </div>
  );
}