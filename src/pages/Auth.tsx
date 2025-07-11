
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChefHat, Camera, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const provinces = [
  { value: "santo_domingo", label: "Santo Domingo" },
  { value: "santiago", label: "Santiago" },
  { value: "la_vega", label: "La Vega" },
  { value: "san_cristobal", label: "San Cristóbal" },
  { value: "puerto_plata", label: "Puerto Plata" },
  { value: "san_pedro_macoris", label: "San Pedro de Macorís" },
  { value: "la_romana", label: "La Romana" },
  { value: "barahona", label: "Barahona" },
  { value: "azua", label: "Azua" },
  { value: "moca", label: "Moca" },
  { value: "bonao", label: "Bonao" },
  { value: "san_francisco_macoris", label: "San Francisco de Macorís" },
  { value: "bani", label: "Baní" },
  { value: "monte_cristi", label: "Monte Cristi" },
  { value: "nagua", label: "Nagua" },
  { value: "higuey", label: "Higüey" },
  { value: "mao", label: "Mao" },
  { value: "cotui", label: "Cotuí" },
  { value: "esperanza", label: "Esperanza" },
  { value: "constanza", label: "Constanza" }
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    user_type: "creator" as "creator" | "restaurant",
    province: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión exitosamente.",
        });
      } else {
        if (!formData.province) {
          toast({
            title: "Error",
            description: "Por favor selecciona tu provincia.",
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.full_name,
              user_type: formData.user_type,
              province: formData.province,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "¡Registro exitoso!",
          description: "Revisa tu email para confirmar tu cuenta.",
        });
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tropical-50 via-white to-mint/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 text-gray-600 hover:text-coral"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-coral to-tropical-500 p-3 rounded-lg">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
              FoodiesBnB RD
            </CardTitle>
            <CardDescription>
              {isLogin ? "Inicia sesión en tu cuenta" : "Únete a nuestra comunidad gastronómica"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={isLogin ? "login" : "register"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="login"
                  onClick={() => setIsLogin(true)}
                >
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  onClick={() => setIsLogin(false)}
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nombre Completo</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required={!isLogin}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de Usuario</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={formData.user_type === "restaurant" ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, user_type: "restaurant" })}
                          className="h-16 flex flex-col"
                        >
                          <ChefHat className="h-5 w-5 mb-1" />
                          Restaurante
                        </Button>
                        <Button
                          type="button"
                          variant={formData.user_type === "creator" ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, user_type: "creator" })}
                          className="h-16 flex flex-col"
                        >
                          <Camera className="h-5 w-5 mb-1" />
                          Creador
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="province">Provincia</Label>
                      <Select
                        value={formData.province}
                        onValueChange={(value) => setFormData({ ...formData, province: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province.value} value={province.value}>
                              {province.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
