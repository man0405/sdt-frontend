import { redirect } from "next/navigation";

export default function SettingsApiKeysRedirect() {
  redirect("/billing/api-keys");
}