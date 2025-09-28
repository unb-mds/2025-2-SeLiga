import React, { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./components/Card";
import { SearchBar } from "./components/SearchBar";
import { Badge } from "./components/Badge";
import api from "./api";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Busca no backend
    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/");
            setArticles(response.data.articles || []);
        } catch (error) {
            console.error("Erro ao buscar artigos:", error);
            setArticles([]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleRefresh = () => {
        fetchArticles();
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recentArticles = articles.slice(0, 2);
    const verifiedArticles = articles.filter(a => a.veracity === "verified");

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Central de Notícias</h1>
                    <p className="text-gray-600">Acompanhe e analise todas as notícias monitoradas</p>
                </div>
                <Button onClick={handleRefresh} disabled={isLoading}>
                    {isLoading ? "Atualizando..." : "Atualizar"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Busca</CardTitle>
                </CardHeader>
                <CardContent>
                    <SearchBar
                        placeholder="Buscar notícias"
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </CardContent>
            </Card>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
                    <TabsTrigger value="verified">Verificadas</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {filteredArticles.map(article => (
                        <Card key={article.id} className="mb-3">
                            <CardContent className="flex justify-between items-center">
                                <span>{article.title}</span>
                                <Badge variant={article.veracity}>{article.veracity}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredArticles.length === 0 && <p>Nenhuma notícia encontrada.</p>}
                </TabsContent>

                <TabsContent value="recent">
                    {recentArticles.map(article => (
                        <Card key={article.id} className="mb-3">
                            <CardContent className="flex justify-between items-center">
                                <span>{article.title}</span>
                                <Badge variant={article.veracity}>{article.veracity}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="verified">
                    {verifiedArticles.map(article => (
                        <Card key={article.id} className="mb-3">
                            <CardContent className="flex justify-between items-center">
                                <span>{article.title}</span>
                                <Badge variant="verified">{article.veracity}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default App;
