import { SettingsNav } from "@/components/settings/settings-nav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="lg:w-56 shrink-0">
        <SettingsNav />
      </aside>
      <div className="flex-1 min-w-0 max-w-3xl">{children}</div>
    </div>
  );
}