import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Hash } from "lucide-react";

export default function UuidGenerator() {
  const [uuidList, setUuidList] = useState<string[]>([]);

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuidList((prev) => [newUuid, ...prev].slice(0, 10)); // Keep last 10
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-danger/20 text-danger rounded-xl">
            <Hash size={28} />
          </div>
          UUID Generator
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Generate random, unique UUIDs (v4).
        </p>
      </div>

      <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
        <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
          <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
            Generated UUIDs
          </Card.Title>
        </Card.Header>
        <Card.Content className="px-6 flex flex-col gap-4 mt-2">
          <Button
            variant="danger"
            onPress={generateUuid}
            className="w-full shadow-lg shadow-danger/20 font-medium"
          >
            Generate New UUID
          </Button>
          <div className="flex flex-col gap-2 mt-2">
            {uuidList.map((uuid, idx) => (
              <div
                key={uuid + idx}
                className="flex justify-between items-center p-4 bg-foreground/5 border border-foreground/5 rounded-xl font-mono text-base animate-in fade-in slide-in-from-top-2"
              >
                <span className="text-foreground/80">{uuid}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onPress={() => navigator.clipboard.writeText(uuid)}
                  className="h-8 hover:bg-foreground/10"
                >
                  Copy
                </Button>
              </div>
            ))}
            {uuidList.length === 0 && (
              <div className="text-center text-foreground/40 py-12 border border-dashed rounded-xl border-foreground/10 text-base">
                Click generate to create UUIDs
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
