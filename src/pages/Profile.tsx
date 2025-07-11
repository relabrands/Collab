
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { 
  MapPin, 
  Star, 
  Users, 
  Instagram, 
  Globe, 
  Phone,
  Mail,
  Camera,
  Award
} from "lucide-react";
import { toast } from "sonner";

interface RestaurantProfile {
  id: string;
  business_name: string;
  address: string;
  food_types: string[];
  collaboration_types: string[];
  images_urls: string[];
  description: string;
  verified: boolean;
  average_rating: number;
  total_collaborations: number;
  instagram_handle: string;
  facebook_handle: string;
  tiktok_handle: string;
  profiles: {
    full_name: string;
    province: string;
    phone: string;
    email: string;
    website: string;
    bio: string;
  };
}

interface CreatorProfile {
  id: string;
  creator_name: string;
  categories: string[];
  instagram_followers: number;
  tiktok_followers: number;
  youtube_subscribers: number;
  facebook_followers: number;
  portfolio_urls: string[];
  content_style: string;
  verified: boolean;
  average_rating: number;
  total_collaborations: number;
  instagram_handle: string;
  tiktok_handle: string;
  youtube_handle: string;
  facebook_handle: string;
  profiles: {
    full_name: string;
    province: string;
    phone: string;
    email: string;
    website: string;
    bio: string;
  };
}

const Profile = () => {
  const { type, id } = useParams<{ type: "restaurant" | "creator"; id: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<RestaurantProfile | CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);

  const foodTypeLabels: { [key: string]: string } = {
    dominicana: "Dominicana",
    italiana: "Italiana",
    china: "China",
    mexicana: "Mexicana",
    japonesa: "Japonesa",
    mediterranea: "Mediterránea",
    vegetariana: "Vegetariana",
    internacional: "Internacional",
    comida_rapida: "Comida Rápida",
    mariscos: "Mariscos",
    parrilla: "Parrilla",
    postres: "Postres"
  };

  const collaborationTypeLabels: { [key: string]: string } = {
    free_meal: "Comida Gratis",
    discount: "Descuento",
    product_exchange: "Intercambio",
    event_invitation: "Evento"
  };

  useEffect(() => {
    if (type && id) {
      fetchProfile();
    }
  }, [type, id]);

  const fetchProfile = async () => {
    try {
      if (type === "restaurant") {
        const { data, error } = await supabase
          .from("restaurants")
          .select(`
            *,
            profiles!inner(full_name, province, phone, email, website, bio)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProfileData(data);
      } else if (type === "creator") {
        const { data, error } = await supabase
          .from("creators")
          .select(`
            *,
            profiles!inner(full_name, province, phone, email, website, bio)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleInviteCollaboration = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (profile?.user_type !== "restaurant") {
      toast.error("Solo los restaurantes pueden enviar invitaciones");
      return;
    }

    navigate("/create-collaboration", { state: { invitedCreatorId: id } });
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-500">Perfil no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header del perfil */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-coral to-mint rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {type === "restaurant" 
                      ? (profileData as RestaurantProfile).business_name.charAt(0)
                      : (profileData as CreatorProfile).creator_name.charAt(0)
                    }
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-3xl font-bold">
                      {type === "restaurant" 
                        ? (profileData as RestaurantProfile).business_name
                        : (profileData as CreatorProfile).creator_name
                      }
                    </h1>
                    {profileData.verified && (
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{profileData.profiles.province.replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{profileData.average_rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span>{profileData.total_collaborations} colaboraciones</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {type === "creator" && profile?.user_type === "restaurant" && (
                    <Button 
                      onClick={handleInviteCollaboration}
                      disabled={inviteLoading}
                      className="bg-coral hover:bg-coral/90"
                    >
                      {inviteLoading ? "Invitando..." : "Invitar a colaborar"}
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    Contactar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {profileData.profiles.bio || 
                     (type === "restaurant" 
                       ? (profileData as RestaurantProfile).description 
                       : "Sin descripción disponible"
                     )
                    }
                  </p>
                </CardContent>
              </Card>

              {type === "restaurant" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Restaurante</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Dirección</h4>
                      <p className="text-gray-600">{(profileData as RestaurantProfile).address}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Tipos de Comida</h4>
                      <div className="flex flex-wrap gap-2">
                        {(profileData as RestaurantProfile).food_types.map((type) => (
                          <Badge key={type} variant="secondary">
                            {foodTypeLabels[type]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Tipos de Colaboración</h4>
                      <div className="flex flex-wrap gap-2">
                        {(profileData as RestaurantProfile).collaboration_types.map((type) => (
                          <Badge key={type} variant="outline">
                            {collaborationTypeLabels[type]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {type === "creator" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Creador</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Categorías</h4>
                      <div className="flex flex-wrap gap-2">
                        {(profileData as CreatorProfile).categories.map((category) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Estilo de Contenido</h4>
                      <p className="text-gray-600">
                        {(profileData as CreatorProfile).content_style || "No especificado"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Redes Sociales</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                            <span className="text-sm">Instagram</span>
                          </div>
                          <span className="font-medium">
                            {formatFollowers((profileData as CreatorProfile).instagram_followers)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Camera className="h-5 w-5 mr-2" />
                            <span className="text-sm">TikTok</span>
                          </div>
                          <span className="font-medium">
                            {formatFollowers((profileData as CreatorProfile).tiktok_followers)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profileData.profiles.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="text-sm">{profileData.profiles.email}</span>
                    </div>
                  )}
                  
                  {profileData.profiles.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="text-sm">{profileData.profiles.phone}</span>
                    </div>
                  )}
                  
                  {profileData.profiles.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="text-sm">{profileData.profiles.website}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calificación</span>
                    <span className="font-medium">{profileData.average_rating.toFixed(1)}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Colaboraciones</span>
                    <span className="font-medium">{profileData.total_collaborations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verificado</span>
                    <span className="font-medium">
                      {profileData.verified ? "Sí" : "No"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
