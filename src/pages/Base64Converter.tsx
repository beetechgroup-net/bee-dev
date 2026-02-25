import { useState } from "react";
import { Card, Button, TextArea } from "@heroui/react";
import { CornerRightDown } from "lucide-react";

export default function Base64Converter() {
  const [b64Input, setB64Input] = useState("");
  const [b64Output, setB64Output] = useState("");
  const [b64Mode, setB64Mode] = useState<"encode" | "decode">("encode");

  const handleBase64 = () => {
    try {
      if (!b64Input) {
        setB64Output("");
        return;
      }
      if (b64Mode === "encode") {
        setB64Output(btoa(b64Input));
      } else {
        setB64Output(atob(b64Input));
      }
    } catch {
      setB64Output("Invalid base64 string");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-secondary/20 text-secondary rounded-xl">
            <CornerRightDown size={28} />
          </div>
          Base64 Converter
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Encode to or decode from Base64 strings.
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
                  variant={b64Mode === "encode" ? "secondary" : "ghost"}
                  onPress={() => setB64Mode("encode")}
                  className={
                    b64Mode === "encode"
                      ? "shadow-md bg-secondary text-secondary-foreground"
                      : ""
                  }
                >
                  Encode
                </Button>
                <Button
                  size="sm"
                  variant={b64Mode === "decode" ? "secondary" : "ghost"}
                  onPress={() => setB64Mode("decode")}
                  className={
                    b64Mode === "decode"
                      ? "shadow-md bg-secondary text-secondary-foreground"
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
              placeholder={`Enter text to ${b64Mode}...`}
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
              className="w-full text-base font-mono"
              rows={6}
            />
          </div>
          <Button
            variant="secondary"
            onPress={handleBase64}
            className="w-full shadow-lg shadow-secondary/20 font-medium bg-secondary text-secondary-foreground"
          >
            {b64Mode === "encode" ? "Encode to Base64" : "Decode Base64"}
          </Button>
          <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2">
            <TextArea
              aria-label="Output"
              readOnly
              value={b64Output}
              className="w-full text-base font-mono opacity-80"
              rows={6}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
