"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useStore } from "@tanstack/react-form";
import { useSymbolQuery } from "@/features/symbol/hooks/useSymbol";
import { useSetAtom } from "jotai";
import { atomSymbolToAdd } from "../atoms/atoms";
import { useRouter } from "next/navigation";

interface formProps {
  symbol: string;
}

const defaultFormValues: formProps = {
  symbol: "",
};

export const AddStockButton = () => {
  const router = useRouter();
  const setSymbol = useSetAtom(atomSymbolToAdd);
  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: async () => {
      console.log("lo intenta", form.state.values.symbol);
      const { isSuccess } = await query.refetch();
      if (isSuccess === false) {
        alert("Error fetching symbol data");
      } else {
        setSymbol(form.state.values.symbol);
        router.push("/add-symbol");
      }
    },
  });
  const symbol = useStore(form.store, (state) => state.values.symbol);
  const query = useSymbolQuery(symbol);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-green-500 hover:bg-green-600 border border-green-500 text-white hover:text-white"
            variant="outline"
          >
            Add Stock
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>Add a new stock</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="symbol"
              children={(field) => (
                <>
                  <Label htmlFor="symbol">Stock symbol</Label>

                  <Input
                    id="symbol"
                    placeholder="e.g. AAPL"
                    value={field.state.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("Symbol cambió a:", value);
                      field.handleChange(value);
                    }}
                  />
                </>
              )}
            />
            <Button
              type="submit"
              className="bg-green-500"
              onClick={() => form.handleSubmit()}
            >
              Search
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
