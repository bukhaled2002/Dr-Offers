import type { Deal } from "@/types/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { Button } from "./ui/button";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/api/axiosInstance";

export default function ProductsTable({ deals }: { deals: Deal[] }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`/offers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenDialog(false);
    },
  });

  const handleDeleteClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setOpenDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between py-4">
        <h2 className="text-2xl font-semibold mb-4">Active Offers</h2>
        <Button>
          <Link to={"/setting/offers"} className="flex items-center gap-2">
            <MdOutlineAddBox />
            Add new Offer
          </Link>
        </Button>
      </div>

      <Table>
        <TableCaption>Active Offers</TableCaption>
        <TableHeader className="bg-gray-200/50 rounded-2xl overflow-hidden">
          <TableRow className="border-none">
            <TableHead>Product name</TableHead>
            <TableHead>Discount Rate</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category Type</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow
              key={deal.id}
              className="border-b-1 font-semibold text-gray-500"
            >
              <TableCell className="flex items-center gap-2">
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={deal.image}
                  alt={deal.title}
                />
                <p>{deal.title}</p>
              </TableCell>
              <TableCell>{deal.discount_rate}%</TableCell>
              <TableCell>{deal.price_after} EGP</TableCell>
              <TableCell>{deal.status}</TableCell>
              <TableCell>{deal.category_type}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2 rounded-full h-10 w-10 cursor-pointer"
                    >
                      <BsThreeDotsVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <Link to={`/setting/offers/${deal.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={() => handleDeleteClick(deal)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product{" "}
              <span className="font-semibold">"{selectedDeal?.title}"</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedDeal?.id) {
                  deleteMutation.mutate(selectedDeal.id);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
