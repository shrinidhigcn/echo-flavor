import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MoodVisualizerProps {
  detectedMood?: string | null;
  confidence?: number;
  isAnalyzing?: boolean;
}

const moodEmojis = {
  happy: "😊",
  excited: "🤩", 
  sad: "😔",
  stressed: "😰",
  calm: "😌"
};

const moodDescriptions = {
  happy: "Feeling joyful and upbeat",
  excited: "Energetic and enthusiastic", 
  sad: "Feeling down and need comfort",
  stressed: "Overwhelmed and tense",
  calm: "Peaceful and relaxed"
};

const moodColors = {
  happy: "mood-happy",
  excited: "mood-excited", 
  sad: "mood-sad",
  stressed: "mood-stressed",
  calm: "mood-calm"
};

const moodGradients = {
  happy: "bg-gradient-happy",
  excited: "bg-gradient-excited",
  sad: "bg-gradient-sad", 
  stressed: "bg-gradient-stressed",
  calm: "bg-gradient-calm"
};

export function MoodVisualizer({ detectedMood, confidence = 0, isAnalyzing }: MoodVisualizerProps) {
  if (isAnalyzing) {
    return (
      <Card className="p-6 text-center">
        <div className="space-y-4">
          <div className="text-4xl animate-pulse">🎭</div>
          <div>
            <h3 className="font-semibold">Analyzing Emotions</h3>
            <p className="text-sm text-muted-foreground">
              Processing voice patterns and tone...
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary rounded-full h-2 transition-all duration-1000 animate-pulse" 
                 style={{ width: '60%' }} />
          </div>
        </div>
      </Card>
    );
  }

  if (!detectedMood) {
    return (
      <Card className="p-6 text-center bg-muted/30 border-dashed">
        <div className="space-y-3">
          <div className="text-4xl">🎭</div>
          <div>
            <h3 className="font-semibold text-muted-foreground">Mood Detection</h3>
            <p className="text-sm text-muted-foreground">
              Start recording to detect your current mood
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const moodKey = detectedMood as keyof typeof moodEmojis;
  const emoji = moodEmojis[moodKey] || "😐";
  const description = moodDescriptions[moodKey] || "Unknown mood";
  const gradientClass = moodGradients[moodKey] || "bg-gradient-hero";

  return (
    <Card className="overflow-hidden shadow-mood">
      {/* Animated gradient header */}
      <div className={cn("h-2", gradientClass)} />
      
      <div className="p-6 text-center space-y-4">
        {/* Large emoji with glow effect */}
        <div className="relative">
          <div className="text-6xl animate-pulse-glow">{emoji}</div>
          <div className={cn(
            "absolute inset-0 text-6xl opacity-30 blur-sm -z-10",
            gradientClass
          )}>
            {emoji}
          </div>
        </div>

        {/* Mood info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className={cn("font-medium", `text-${moodColors[moodKey]}`)}>
              {detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1)}
            </Badge>
            {confidence > 0 && (
              <Badge variant="outline" className="text-xs">
                {Math.round(confidence * 100)}% confident
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {description}
          </p>
        </div>

        {/* Confidence meter */}
        {confidence > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Confidence</span>
              <span>{Math.round(confidence * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("rounded-full h-2 transition-all duration-1000", gradientClass)}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Mood explanation */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Based on your voice tone, pace, and emotional indicators
          </p>
        </div>
      </div>
    </Card>
  );
}