import { Camera, MapPin, Calendar, Briefcase } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export function ProfileAvatar() {
  return (
    <Card>
      <CardHeader className="items-center pb-2">
        <div className="relative">
          <Avatar className="h-28 w-28">
            <AvatarImage src="/avatars/avatar-1.png" alt="Virendra Kumar" />
            <AvatarFallback className="text-3xl">
              VK
            </AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            className="absolute -bottom-1 -right-1 rounded-full"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 text-center">

        <div>
          <h2 className="text-xl font-semibold">
            Virendra Kumar
          </h2>

          <p className="text-sm text-muted-foreground">
            Frontend AI Engineer
          </p>

          <Badge className="mt-3">
            Pro Plan
          </Badge>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">

          <div className="flex items-center justify-center gap-2">
            <Briefcase className="h-4 w-4" />
            Codervent
          </div>

          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            India
          </div>

          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            Joined January 2026
          </div>

        </div>

        <div className="grid grid-cols-2 gap-2">

          <Button variant="outline">
            Upload Photo
          </Button>

          <Button variant="destructive">
            Remove
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}