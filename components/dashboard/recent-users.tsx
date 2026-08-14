import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Admin" | "Member" | "Viewer";
  status: "online" | "offline";
}

const members: TeamMember[] = [
  { id: "1", name: "Alex Martin", email: "alex@example.com", role: "Admin", status: "online" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "Member", status: "online" },
  { id: "3", name: "James Wilson", email: "james@example.com", role: "Member", status: "offline" },
  { id: "4", name: "Priya Patel", email: "priya@example.com", role: "Viewer", status: "offline" },
  { id: "6", name: "Sneha Kapoor", email: "sneha@example.com", role: "Admin", status: "offline" },
  { id: "7", name: "Ravi Sharma", email: "ravi@example.com", role: "Viewer", status: "online" },
];

export function RecentUsers() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>People in your workspace</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-accent/50 transition-colors"
          >
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background ${
                  member.status === "online" ? "bg-emerald-500" : "bg-muted-foreground/40"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            </div>
            <Badge variant="secondary" className="text-[10px] shrink-0">
              {member.role}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}