import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogContainer({open,handleOnChange}:{open:boolean,handleOnChange:(state:boolean)=>void}) {
  return (
    <Dialog open={open} onOpenChange={handleOnChange}>
      <DialogContent showCloseButton={true} className="bg-white border-none">
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
