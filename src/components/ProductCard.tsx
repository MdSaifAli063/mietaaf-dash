import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number | null;
  image: string;
  description?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ 
  name, 
  price, 
  image, 
  description,
  onEdit, 
  onDelete 
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/10 hover:border-primary/30 animate-fade-in">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-accent/10 relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-5 space-y-2">
        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        )}
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${price?.toFixed(2) || "0.00"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2 bg-accent/5">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2 hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex-1 gap-2 hover:shadow-md transition-all"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
