import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, ThumbsUp, ThumbsDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recipe {
  id: string;
  title: string;
  description: string;
  mood: string;
  prepTime: string;
  servings: number;
  calories: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

interface RecipeCardProps {
  recipe: Recipe | null;
  isGenerating?: boolean;
  onFeedback?: (recipeId: string, type: 'like' | 'dislike') => void;
  onSave?: (recipeId: string) => void;
}

const moodConfig = {
  happy: {
    gradient: "bg-gradient-happy",
    color: "text-mood-happy",
    border: "border-mood-happy/20"
  },
  excited: {
    gradient: "bg-gradient-excited", 
    color: "text-mood-excited",
    border: "border-mood-excited/20"
  },
  sad: {
    gradient: "bg-gradient-sad",
    color: "text-mood-sad", 
    border: "border-mood-sad/20"
  },
  stressed: {
    gradient: "bg-gradient-stressed",
    color: "text-mood-stressed",
    border: "border-mood-stressed/20"
  },
  calm: {
    gradient: "bg-gradient-calm",
    color: "text-mood-calm",
    border: "border-mood-calm/20"
  }
};

export function RecipeCard({ recipe, isGenerating, onFeedback, onSave }: RecipeCardProps) {
  if (isGenerating) {
    return (
      <Card className="p-8 text-center shadow-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Crafting Your Perfect Recipe</h3>
            <p className="text-muted-foreground">
              Analyzing your mood and creating a personalized recommendation...
            </p>
          </div>
          {/* Loading placeholders */}
          <div className="w-full space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      </Card>
    );
  }

  if (!recipe) {
    return (
      <Card className="p-8 text-center bg-muted/30 border-dashed">
        <div className="space-y-4">
          <div className="text-6xl">🍳</div>
          <div>
            <h3 className="text-xl font-semibold text-muted-foreground">No Recipe Yet</h3>
            <p className="text-sm text-muted-foreground">
              Record your voice to get a personalized recipe recommendation
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const moodStyle = moodConfig[recipe.mood as keyof typeof moodConfig] || moodConfig.happy;

  return (
    <Card className={cn("overflow-hidden shadow-mood", moodStyle.border)}>
      {/* Header with mood gradient */}
      <div className={cn("h-3", moodStyle.gradient)} />
      
      <div className="p-6 space-y-6">
        {/* Title and mood */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight">{recipe.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{recipe.description}</p>
            </div>
            <Badge variant="secondary" className={cn("shrink-0", moodStyle.color)}>
              {recipe.mood}
            </Badge>
          </div>

          {/* Recipe stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              <span>{recipe.calories} cal</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Ingredients</h3>
          <div className="grid gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className={cn("w-2 h-2 rounded-full shrink-0", moodStyle.gradient)} />
                <span>{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Instructions</h3>
          <div className="space-y-3">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-white shrink-0",
                  moodStyle.gradient
                )}>
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback?.(recipe.id, 'like')}
              className="h-8 w-8 p-0"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => onFeedback?.(recipe.id, 'dislike')}
              className="h-8 w-8 p-0"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={() => onSave?.(recipe.id)}
            size="sm"
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Save Recipe
          </Button>
        </div>
      </div>
    </Card>
  );
}