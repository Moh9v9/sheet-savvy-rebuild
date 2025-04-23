
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";

interface CardInformationProps {
  title: string;
  value: string;
  icon: "users" | "check-circle" | "x-circle" | "clock";
  colorClass?: string;
}

const CardInformation: React.FC<CardInformationProps> = ({ 
  title, 
  value, 
  icon,
  colorClass = "border-l-blue-500"
}) => {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-5 w-5 text-muted-foreground" />;
      case "check-circle":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "x-circle":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "clock":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className={`shadow-sm border-l-4 ${colorClass}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <span className="text-2xl font-bold">{value}</span>
          </div>
          <div className="mt-1">
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInformation;
