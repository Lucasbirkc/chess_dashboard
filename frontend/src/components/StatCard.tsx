import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

interface StatCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const StatCard = ({ title, children, icon }: StatCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          {title}
          {icon && <div className="text-primary">{icon}</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
