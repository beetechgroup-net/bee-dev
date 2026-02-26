import { useState } from "react";
import { Card, Button, TextArea } from "@heroui/react";
import { Link as LinkIcon } from "lucide-react";

export default function UrlEncoder() {
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");

  const handleUrl = () => {
    try {
      if (!urlInput) {
        setUrlOutput("");
        return;
      }
      if (urlMode === "encode") {
        setUrlOutput(encodeURIComponent(urlInput));
      } else {
        setUrlOutput(decodeURIComponent(urlInput));
      }
    } catch {
      setUrlOutput("Invalid URL string");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-warning/20 text-warning rounded-xl">
            <LinkIcon size={28} />
          </div>
          URL Encoder
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Safely encode or decode URL parameters and strings.
        </p>
      </div>

      <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
        <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center pr-2">
              <Card.Title className="font-bold text-lg text-foreground/90">
                Data
              </Card.Title>
              <div className="flex gap-1 bg-foreground/5 p-1 rounded-xl">
                <Button
                  size="sm"
                  variant={urlMode === "encode" ? "danger" : "ghost"}
                  onPress={() => setUrlMode("encode")}
                  className={
                    urlMode === "encode"
                      ? "shadow-md bg-warning text-warning-foreground"
                      : ""
                  }
                >
                  Encode
                </Button>
                <Button
                  size="sm"
                  variant={urlMode === "decode" ? "danger" : "ghost"}
                  onPress={() => setUrlMode("decode")}
                  className={
                    urlMode === "decode"
                      ? "shadow-md bg-warning text-warning-foreground"
                      : ""
                  }
                >
                  Decode
                </Button>
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="px-6 flex flex-col gap-4 mt-2">
          <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2">
            <TextArea
              aria-label="Input"
              placeholder={`Enter text to ${urlMode}...`}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full text-base font-mono"
              rows={4}
            />
          </div>
          <Button
            variant="danger"
            onPress={handleUrl}
            className="w-full shadow-lg shadow-warning/20 font-medium bg-warning text-warning-foreground"
          >
            {urlMode === "encode" ? "URL Encode" : "URL Decode"}
          </Button>
          <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2">
            <TextArea
              aria-label="Output"
              readOnly
              value={urlOutput}
              className="w-full text-base font-mono opacity-80"
              rows={4}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
