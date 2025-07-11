
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Search, Heart, Star, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


export const CreatorDashboard = () => {
  const { profile, signOut } = useAuth();
    const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-mint to-tropical-400 p-2 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Creador</h1>
                <p className="text-sm text-gray-600">Bienvenido, {profile?.full_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Colaboraciones Completadas</CardTitle>
              <Heart className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Experiencias gastronómicas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aplicaciones Pendientes</CardTitle>
              <Search className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Esperando respuesta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
              <Star className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">
                Basado en colaboraciones
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Explorar Oportunidades</CardTitle>
              <CardDescription>
                Descubre experiencias gastronómicas disponibles en tu zona
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
className="w-full bg-gradient-to-r from-mint to-tropical-400 hover:from-tropical-400 hover:to-mint"
  onClick={() => navigate("/explore")}
>
  <Search className="h-4 w-4 mr-2" />
  Ver Oportunidades
</Button>

            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Completar Perfil</CardTitle>
              <CardDescription>
                Mejora tu perfil para atraer más colaboraciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
  variant="outline"
  className="w-full border-coral text-coral hover:bg-coral hover:text-white"
  onClick={() => navigate("/profile")}
>
  <Camera className="h-4 w-4 mr-2" />
  Editar Perfil
</Button>

            </CardContent>
          </Card>
        </div>

        {/* Recent Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Oportunidades Recientes</CardTitle>
            <CardDescription>
              Últimas experiencias gastronómicas publicadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No hay oportunidades disponibles</p>
              <p className="text-sm">¡Sé el primero en descubrir nuevas experiencias!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
