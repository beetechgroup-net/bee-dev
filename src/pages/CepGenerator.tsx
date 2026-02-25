import { useState, useCallback } from "react";
import { Card, Button, Input, Switch, Spinner, Chip } from "@heroui/react";
import { MapPin, Search, RefreshCw } from "lucide-react";

// Basic representation of ViaCEP response
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

const generateRandomCep = (formatted: boolean = true): string => {
  // Generates a random 8-digit string
  let cep = "";
  for (let i = 0; i < 8; i++) {
    cep += Math.floor(Math.random() * 10).toString();
  }

  if (formatted) {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }
  return cep;
};

const formatCep = (cep: string): string => {
  const clean = cep.replace(/\D/g, "").slice(0, 8);
  if (clean.length > 5) {
    return clean.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
  }
  return clean;
};

export default function CepGenerator() {
  const [generatedCep, setGeneratedCep] = useState<string>("");
  const [withFormatting, setWithFormatting] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<ViaCepResponse | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    setGeneratedCep(generateRandomCep(withFormatting));
  }, [withFormatting]);

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(formatCep(value));
  };

  const searchCep = async () => {
    const clean = searchInput.replace(/\D/g, "");
    if (clean.length !== 8) {
      setSearchError("O CEP deve conter 8 dígitos numéricos.");
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setSearchError("CEP não encontrado.");
      } else {
        setSearchResult(data);
      }
    } catch (e) {
      setSearchError("Erro ao buscar o CEP. Verifique sua conexão.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-primary/20 text-primary rounded-xl">
            <MapPin size={28} />
          </div>
          Gerador & Busca de CEP
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Gere CEPs para testes e consulte endereços brasileiros reais
          utilizando a API do ViaCEP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generator Card */}
        <Card className="border-none shadow-xl glass-panel relative overflow-hidden h-full pb-6">
          <Card.Header className="flex pb-2 pt-6 px-6">
            <Card.Title className="font-bold text-lg text-foreground/90 w-full flex justify-between items-center">
              Gerador Aleatório
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                onPress={handleGenerate}
                className="text-foreground/50 hover:text-primary"
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
                placeholder="00000-000"
                value={generatedCep}
                className="w-full text-center font-bold text-primary font-mono text-2xl tracking-widest h-20 bg-foreground/5 border-primary/20 group-data-[focus=true]:border-primary hover:border-primary/50 transition-colors"
              />
              <div className="flex gap-4 w-full">
                <Button
                  className="flex-1 font-bold shadow-lg shadow-primary/20 bg-primary text-primary-foreground"
                  onPress={handleGenerate}
                >
                  Gerar CEP
                </Button>
                <Button
                  variant="ghost"
                  className="font-semibold px-8"
                  onPress={() => copyToClipboard(generatedCep)}
                  isDisabled={!generatedCep}
                >
                  Copiar
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Search Card */}
        <Card className="border-none shadow-xl glass-panel relative overflow-hidden h-full pb-6">
          <Card.Header className="flex pb-2 pt-6 px-6">
            <Card.Title className="font-bold text-lg text-foreground/90 w-full flex justify-between items-center">
              Consulta via ViaCEP
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex flex-col px-6 mt-4 gap-4 h-full">
            <div className="flex gap-2">
              <Input
                placeholder="Digite o CEP..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                maxLength={9}
                className="font-mono flex-1 text-lg h-14 bg-foreground/5"
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchCep();
                }}
              />
              <Button
                onPress={searchCep}
                className="h-14 px-6 shadow-md shadow-secondary/20 bg-secondary text-secondary-foreground"
                isDisabled={
                  isSearching || searchInput.replace(/\D/g, "").length < 8
                }
              >
                {isSearching ? (
                  <Spinner size="sm" color="current" />
                ) : (
                  <Search size={20} />
                )}
              </Button>
            </div>

            {searchError && (
              <Chip
                color="danger"
                variant="soft"
                className="w-full mt-2 font-medium"
              >
                {searchError}
              </Chip>
            )}

            {searchResult && !searchError && (
              <div className="flex flex-col gap-3 mt-4 bg-foreground/5 p-4 rounded-xl border border-foreground/5 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-baseline border-b border-foreground/10 pb-2 mb-2">
                  <span className="font-bold text-lg text-primary">
                    {searchResult.cep}
                  </span>
                  <Chip
                    size="sm"
                    variant="soft"
                    className="bg-primary/20 text-primary"
                  >
                    {searchResult.uf}
                  </Chip>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className="text-foreground/50 w-24 text-sm font-semibold uppercase tracking-wider">
                      Logradouro
                    </span>
                    <span className="text-foreground/90 text-sm font-medium">
                      {searchResult.logradouro || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-foreground/50 w-24 text-sm font-semibold uppercase tracking-wider">
                      Bairro
                    </span>
                    <span className="text-foreground/90 text-sm font-medium">
                      {searchResult.bairro || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-foreground/50 w-24 text-sm font-semibold uppercase tracking-wider">
                      Cidade
                    </span>
                    <span className="text-foreground/90 text-sm font-medium">
                      {searchResult.localidade || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-foreground/50 w-24 text-sm font-semibold uppercase tracking-wider">
                      DDD
                    </span>
                    <span className="text-foreground/90 text-sm font-medium">
                      {searchResult.ddd || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!searchResult && !searchError && !isSearching && (
              <div className="flex-1 flex flex-col items-center justify-center text-foreground/40 gap-2 mt-8">
                <MapPin size={32} className="opacity-50" />
                <p className="text-sm">Os resultados aparecerão aqui</p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
