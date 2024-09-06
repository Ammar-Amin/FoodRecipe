import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  image?: string;
  buttonText?: string;
  buttonIcon?: string;
}

const MeetingPopupModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  image,
  buttonText,
  buttonIcon,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[500px] flex flex-col gap-6 bg-slate-900 p-6 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="mx-auto">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1
            className={cn(
              "text-3xl font-bold leading-10 tracking-wide",
              className
            )}
          >
            {title}
          </h1>
          {children}
          <Button variant={"blue"} onClick={handleClick}>
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={12}
                height={12}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingPopupModal;
