import { useState } from "react";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { MoodVisualizer } from "@/components/MoodVisualizer";
import { RecipeCard } from "@/components/RecipeCard";
import { generateRecipe, getMoodExplanation } from "@/lib/recipeGenerator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, History, Sparkles, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecipeHistory {
  id: string;
  mood: string; 
  recipeName: string;
  timestamp: Date;
  liked?: boolean;
}

const Index = () => {
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [isAnalyzingMood, setIsAnalyzingMood] = useState(false);
  const [recipeHistory, setRecipeHistory] = useState<RecipeHistory[]>([]);
  const [confidence] = useState(0.87); // Simulated confidence score
  const { toast } = useToast();

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("Recording completed:", audioBlob);
    // In a real app, this would be sent to a backend for processing
  };

  const handleMoodDetected = async (mood: string) => {
    setDetectedMood(mood);
    setIsAnalyzingMood(false);
    setIsGeneratingRecipe(true);

    // Simulate recipe generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recipe = generateRecipe(mood);
    setCurrentRecipe(recipe);
    setIsGeneratingRecipe(false);

    // Add to history
    const historyEntry: RecipeHistory = {
      id: recipe.id,
      mood: mood,
      recipeName: recipe.title,
      timestamp: new Date()
    };
    setRecipeHistory(prev => [historyEntry, ...prev.slice(0, 4)]);

    toast({
      title: "Recipe Generated! 🍳",
      description: getMoodExplanation(mood),
    });
  };

  const handleRecipeFeedback = (recipeId: string, type: 'like' | 'dislike') => {
    setRecipeHistory(prev => 
      prev.map(entry => 
        entry.id === recipeId 
          ? { ...entry, liked: type === 'like' }
          : entry
      )
    );
    
    toast({
      title: type === 'like' ? "Thanks for the feedback! 👍" : "Feedback noted 👎",
      description: type === 'like' 
        ? "We'll recommend more recipes like this!" 
        : "We'll improve our recommendations for you.",
    });
  };

  const handleSaveRecipe = (recipeId: string) => {
    toast({
      title: "Recipe Saved! ❤️",
      description: "Added to your personal collection",
    });
  };

  const handleStartOver = () => {
    setDetectedMood(null);
    setCurrentRecipe(null);
    setIsGeneratingRecipe(false);
    setIsAnalyzingMood(false);
  };

  const moodColors = {
    happy: "text-mood-happy",
    excited: "text-mood-excited", 
    sad: "text-mood-sad",
    stressed: "text-mood-stressed",
    calm: "text-mood-calm"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Hero Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-hero rounded-xl shadow-glow">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MoodFood
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover personalized recipes that match your emotional state. 
            Simply share your voice, and we'll craft the perfect meal for your mood.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Heart className="h-3 w-3" />
              Personalized
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Voice & Mood */}
          <div className="space-y-6">
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              onMoodDetected={(mood) => {
                setIsAnalyzingMood(true);
                setTimeout(() => handleMoodDetected(mood), 1500);
              }}
              disabled={isGeneratingRecipe}
            />
            
            <MoodVisualizer
              detectedMood={detectedMood}
              confidence={confidence}
              isAnalyzing={isAnalyzingMood}
            />

            {/* History Section */}
            {recipeHistory.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Recent Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {recipeHistory.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{entry.recipeName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${moodColors[entry.mood as keyof typeof moodColors]}`}>
                            {entry.mood}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {entry.liked !== undefined && (
                        <div className="text-sm">
                          {entry.liked ? "👍" : "👎"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Recipe */}
          <div className="space-y-6">
            <RecipeCard
              recipe={currentRecipe}
              isGenerating={isGeneratingRecipe}
              onFeedback={handleRecipeFeedback}
              onSave={handleSaveRecipe}
            />
            
            {currentRecipe && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleStartOver}
                  variant="outline"
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Try Another Recipe
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-happy rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Voice Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI analyzes your voice patterns, tone, and emotional indicators
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-excited rounded-lg flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Smart Recipes</h3>
            <p className="text-sm text-muted-foreground">
              Personalized meal recommendations based on your current emotional state
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-calm rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Learn & Adapt</h3>
            <p className="text-sm text-muted-foreground">
              Feedback helps improve future recommendations just for you
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;