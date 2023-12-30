"use client";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const Item: React.FC<ItemProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className="min-h-[27px] text-sm py-1 pr-3 pl-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
    >
      <Icon className="shrink-0 h-[18px] mr-1 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
};

export default Item;
