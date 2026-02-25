import { useState, useCallback } from "react";
import { Card, Button, Input, Switch, Chip } from "@heroui/react";
import { ShieldCheck, RefreshCw } from "lucide-react";

// --- Utility functions for CPF ---
const calculateCpfDigit = (base: string): number => {
  let sum = 0;
  let weight = base.length + 1;
  for (let i = 0; i < base.length; i++) {
    sum += parseInt(base.charAt(i), 10) * weight--;
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

const generateCpf = (formatted: boolean = true): string => {
  let base = "";
  for (let i = 0; i < 9; i++) {
    base += Math.floor(Math.random() * 10).toString();
  }
  const digit1 = calculateCpfDigit(base);
  const digit2 = calculateCpfDigit(base + digit1.toString());
  const finalCpf = base + digit1.toString() + digit2.toString();

  if (formatted) {
    return finalCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return finalCpf;
};

const validateCpf = (cpf: string): boolean => {
  const cleanDb = cpf.replace(/\D/g, "");
  if (cleanDb.length !== 11 || /^(\d)\1{10}$/.test(cleanDb)) return false;

  const base = cleanDb.substring(0, 9);
  const d1 = calculateCpfDigit(base);
  const d2 = calculateCpfDigit(base + d1.toString());

  return cleanDb === base + d1.toString() + d2.toString();
};

const formatCpf = (cpf: string): string => {
  const clean = cpf.replace(/\D/g, "");
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
// ---------------------------------

export default function CpfGenerator() {
  const [generatedCpf, setGeneratedCpf] = useState<string>("");
  const [withFormatting, setWithFormatting] = useState(true);

  const [validateInput, setValidateInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = useCallback(() => {
    setGeneratedCpf(generateCpf(withFormatting));
  }, [withFormatting]);

  const handleValidation = (value: string) => {
    setValidateInput(value);
    const clean = value.replace(/\D/g, "");
    if (clean.length === 11) {
      setIsValid(validateCpf(clean));
    } else {
      setIsValid(null);
    }
  };

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-success/20 text-success rounded-xl">
            <ShieldCheck size={28} />
          </div>
          Gerador & Validador de CPF
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Gere números de CPF válidos para testes de software e valide entradas
          com facilidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generator Card */}
        <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6 h-full">
          <Card.Header className="flex pb-2 pt-6 px-6">
            <Card.Title className="font-bold text-lg text-foreground/90 w-full flex justify-between items-center">
              Gerador
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                onPress={handleGenerate}
                className="text-foreground/50 hover:text-success"
              >
                <RefreshCw size={18} />
              </Button>
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex flex-col px-6 mt-4 gap-6">
            <div className="flex justify-between items-center bg-foreground/5 p-4 rounded-xl border border-foreground/5">
              <span className="text-sm font-medium opacity-80">
                Com Pontuação
              </span>
              <Switch
                isSelected={withFormatting}
                onChange={() => setWithFormatting(!withFormatting)}
                size="sm"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Input
                readOnly
                placeholder="Clique em Gerar CPF"
                value={generatedCpf}
                className="w-full text-center font-bold text-success font-mono text-2xl tracking-widest h-20 bg-foreground/5 border-success/20 group-data-[focus=true]:border-success hover:border-success/50 transition-colors"
              />
              <div className="flex gap-4 w-full">
                <Button
                  className="flex-1 font-bold shadow-lg shadow-success/20 bg-success text-success-foreground"
                  onPress={handleGenerate}
                >
                  Gerar CPF
                </Button>
                <Button
                  variant="ghost"
                  className="font-semibold px-8"
                  onPress={() => copyToClipboard(generatedCpf)}
                  isDisabled={!generatedCpf}
                >
                  Copiar
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Validator Card */}
        <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6 h-full">
          <Card.Header className="flex pb-2 pt-6 px-6">
            <Card.Title className="font-bold text-lg text-foreground/90 w-full flex justify-between items-center">
              Validador
              {isValid !== null && (
                <Chip
                  size="sm"
                  color={isValid ? "success" : "danger"}
                  variant="soft"
                  className="font-bold border-none px-3"
                >
                  {isValid ? "Válido" : "Inválido"}
                </Chip>
              )}
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex flex-col px-6 mt-4 gap-6 h-full justify-between">
            <p className="text-sm text-foreground/60 leading-relaxed">
              Verifique se um número de CPF fornecido atende aos critérios
              matemáticos de criação estabelecidos pela Receita Federal.
            </p>

            <div className="flex flex-col gap-3 mt-auto">
              {/* Force text coloring depending on state */}
              <Input
                placeholder="000.000.000-00"
                value={validateInput}
                onChange={(e) => handleValidation(e.target.value)}
                maxLength={14}
                className={`w-full text-center font-bold font-mono text-xl tracking-wider h-16 bg-foreground/5 transition-colors ${isValid === true ? "text-success border-success bg-success/5" : isValid === false ? "text-danger border-danger bg-danger/5" : "border-foreground/10"}`}
              />
              <div className="flex justify-between items-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-foreground/60"
                  onPress={() => setValidateInput(formatCpf(validateInput))}
                  isDisabled={!validateInput}
                >
                  Formatar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-foreground/60"
                  onPress={() =>
                    setValidateInput(validateInput.replace(/\D/g, ""))
                  }
                  isDisabled={!validateInput}
                >
                  Remover Pontos
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
