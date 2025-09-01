import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  onMoodDetected?: (mood: string) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onRecordingComplete, onMoodDetected, disabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
    setAudioLevel(average / 255);

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Set up recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        onRecordingComplete?.(audioBlob);
        simulateMoodDetection();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      analyzeAudio();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      
      // Clean up
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const simulateMoodDetection = () => {
    setIsAnalyzing(true);
    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const moods = ["happy", "excited", "sad", "stressed", "calm"];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      onMoodDetected?.(randomMood);
      setIsAnalyzing(false);
    }, 2500);
  };

  // Generate animated waveform bars
  const waveformBars = Array.from({ length: 12 }, (_, i) => {
    const baseHeight = 20 + (i % 3) * 15;
    const dynamicHeight = isRecording ? baseHeight + (audioLevel * 60) : baseHeight;
    const delay = i * 0.1;
    
    return (
      <div
        key={i}
        className={cn(
          "bg-gradient-to-t from-primary to-primary-glow rounded-full transition-all duration-200",
          isRecording && "animate-voice-wave"
        )}
        style={{
          width: "4px",
          height: `${dynamicHeight}px`,
          animationDelay: `${delay}s`,
          opacity: isRecording ? 0.8 + (audioLevel * 0.4) : 0.6
        }}
      />
    );
  });

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-card to-accent/10 shadow-soft border-border/50">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
          Voice Mood Detection
        </h3>
        <p className="text-muted-foreground">
          Share how you're feeling and get a personalized recipe recommendation
        </p>
      </div>

      {/* Animated Waveform */}
      <div className="flex items-end justify-center gap-1 h-20 mb-8">
        {waveformBars}
      </div>

      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled || isAnalyzing}
          size="lg"
          className={cn(
            "w-16 h-16 rounded-full shadow-glow transition-all duration-300",
            isRecording && "animate-pulse-glow"
          )}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>

        <div className="text-center">
          {isAnalyzing ? (
            <div className="flex items-center gap-2 text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium">Analyzing your mood...</span>
            </div>
          ) : isRecording ? (
            <p className="text-sm text-primary font-medium">
              Recording... Tap to stop
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tap to start recording
            </p>
          )}
        </div>
      </div>

      {/* Audio Level Indicator */}
      {isRecording && (
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-100"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Audio level: {Math.round(audioLevel * 100)}%
          </p>
        </div>
      )}
    </Card>
  );
}