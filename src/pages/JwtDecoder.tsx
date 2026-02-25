import { useState } from "react";
import { Card, Button, TextArea } from "@heroui/react";
import { Shield } from "lucide-react";

export default function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [jwtDecoded, setJwtDecoded] = useState("");

  const decodeJwt = () => {
    try {
      if (!jwt) {
        setJwtDecoded("");
        return;
      }
      const parts = jwt.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setJwtDecoded(JSON.stringify({ header, payload }, null, 2));
    } catch {
      setJwtDecoded("Invalid Token");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-primary/20 text-primary rounded-xl">
            <Shield size={28} />
          </div>
          JWT Decoder
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Decode and inspect JSON Web Tokens safely in your browser.
        </p>
      </div>

      <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
        <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
          <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
            Token Inspector
          </Card.Title>
        </Card.Header>
        <Card.Content className="px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground/70 text-sm tracking-wide uppercase">
              Encoded Token
            </h3>
            <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2 flex-1">
              <TextArea
                aria-label="JWT Token"
                placeholder="eyJh..."
                value={jwt}
                onChange={(e) => setJwt(e.target.value)}
                className="w-full font-mono text-sm leading-relaxed"
                rows={12}
              />
            </div>
            <Button
              variant="primary"
              onPress={decodeJwt}
              className="w-full font-medium shadow-md shadow-primary/20"
            >
              Decode Token
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground/70 text-sm tracking-wide uppercase">
              Decoded Payload
            </h3>
            <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2 h-full">
              <TextArea
                aria-label="Decoded Header & Payload"
                readOnly
                value={jwtDecoded}
                className="w-full font-mono text-sm text-primary-500"
                rows={14}
              />
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
