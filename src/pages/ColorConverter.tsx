import { useState, useCallback } from "react";
import { Card, Input, Button } from "@heroui/react";
import { Palette } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");
  const [previewColor, setPreviewColor] = useState("#000000");

  const hexToRgb = (hexValue: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setPreviewColor(value);
      const rgbObj = hexToRgb(value);
      if (rgbObj) {
        setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
        const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
        setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
      }
    }
  }, []);

  const handleRgbChange = (val: string) => {
    setRgb(val);
    const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      if (r <= 255 && g <= 255 && b <= 255) {
        const hexVal = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
        setPreviewColor(hexVal);
        setHex(hexVal);
        const hslObj = rgbToHsl(r, g, b);
        setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-gradient-to-r from-danger via-warning to-success text-white rounded-xl">
            <Palette size={28} />
          </div>
          Color Converter
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Transform colors between HEX, RGB, and HSL modes instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <Card className="border-none shadow-xl glass-panel relative overflow-hidden h-full flex flex-col justify-center items-center p-8">
            <div
              className="w-full aspect-square rounded-2xl shadow-inner border border-white/10 transition-colors duration-500 ease-in-out"
              style={{ backgroundColor: previewColor }}
            />
            <p className="mt-4 font-mono font-bold text-foreground/80 tracking-wide">
              {previewColor}
            </p>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6 h-full">
            <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
              <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
                Color Values
              </Card.Title>
            </Card.Header>
            <Card.Content className="px-6 flex flex-col gap-6 mt-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground/70">
                    HEX
                  </span>
                  <Input
                    placeholder="#000000"
                    value={hex}
                    onChange={(e) => updateFromHex(e.target.value)}
                    className="w-full font-mono text-base bg-foreground/5 border-foreground/5"
                  />
                </div>
                <Button
                  variant="ghost"
                  className="h-14 font-medium"
                  onPress={() => copyToClipboard(hex)}
                >
                  Copy
                </Button>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground/70">
                    RGB
                  </span>
                  <Input
                    placeholder="rgb(0, 0, 0)"
                    value={rgb}
                    onChange={(e) => handleRgbChange(e.target.value)}
                    className="w-full font-mono text-base bg-foreground/5 border-foreground/5"
                  />
                </div>
                <Button
                  variant="ghost"
                  className="h-14 font-medium"
                  onPress={() => copyToClipboard(rgb)}
                >
                  Copy
                </Button>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground/70">
                    HSL
                  </span>
                  <Input
                    placeholder="hsl(0, 0%, 0%)"
                    value={hsl}
                    readOnly // Typically calculated from others for simplicity
                    className="w-full font-mono text-base opacity-80 bg-foreground/5 border-foreground/5 cursor-not-allowed"
                  />
                </div>
                <Button
                  variant="ghost"
                  className="h-14 font-medium"
                  onPress={() => copyToClipboard(hsl)}
                >
                  Copy
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
