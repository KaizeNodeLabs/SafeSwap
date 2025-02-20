import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { milestones } from "../../mock/milestones.mock";

export function MilestonesTimeline() {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <div key={index} className="flex gap-4 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full p-1 ${
                milestone.status === "approved"
                  ? "bg-primary text-primary-foreground"
                  : milestone.status === "complete"
                  ? "bg-green-500 text-white"
                  : "bg-muted"
              }`}
            >
              {milestone.status === "complete" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>
            {index !== milestones.length - 1 && (
              <div className="w-px h-full bg-border mt-1" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-3">
                  <p className="font-medium">{milestone.title}</p>
                  {milestone.status === "complete" && (
                    <Button variant="outline">Approve</Button>
                  )}
                  {milestone.status === "pending" && (
                    <Button variant="outline">Complete</Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {milestone.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    milestone.status === "approved"
                      ? "default"
                      : milestone.status === "complete"
                      ? "default"
                      : "secondary"
                  }
                >
                  {milestone.status === "for-review"
                    ? "For Review"
                    : milestone.status === "approved"
                    ? "Approved"
                    : "Complete"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
