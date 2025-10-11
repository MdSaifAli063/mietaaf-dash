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
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        )}
        <p className="text-xl font-bold text-primary">
          ${price?.toFixed(2) || "0.00"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
