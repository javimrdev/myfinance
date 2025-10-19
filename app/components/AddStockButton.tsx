import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AddStockButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="outline">
            Add Stock
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>Add a new stock</DialogTitle>
          </DialogHeader>

          <Label htmlFor="symbol">Stock symbol</Label>
          <Input id="symbol" placeholder="e.g. AAPL" />
          <Button type="button">Search</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
