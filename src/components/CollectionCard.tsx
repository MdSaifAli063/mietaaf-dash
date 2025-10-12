import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CollectionCardProps {
  name: string;
  productCount: number;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CollectionCard({ name, productCount, image, onEdit, onDelete }: CollectionCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/10 hover:border-primary/30 animate-fade-in">
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-muted to-accent/10 relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">View Collection</p>
          </div>
        </div>
      </div>
      <CardContent className="p-5 bg-gradient-to-b from-background to-accent/5">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-sm text-muted-foreground font-medium">
              <span className="text-primary">{productCount}</span> products
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit Collection
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive cursor-pointer hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Collection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
