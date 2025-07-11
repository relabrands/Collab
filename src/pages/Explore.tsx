
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Star, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

interface Restaurant {
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
  profiles: {
    full_name: string;
    province: string;
    avatar_url: string;
  };
}

interface Creator {
  id: string;
  creator_name: string;
  categories: string[];
  instagram_followers: number;
  tiktok_followers: number;
  content_style: string;
  verified: boolean;
  average_rating: number;
  total_collaborations: number;
  profiles: {
    full_name: string;
    province: string;
    avatar_url: string;
  };
}

interface Collaboration {
  id: string;
  title: string;
  description: string;
  collaboration_type: string;
  food_types: string[];
  requirements: string;
  deliverables: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  restaurants: {
    business_name: string;
    profiles: {
      province: string;
    };
  };
}

const Explore = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"restaurants" | "creators" | "collaborations">("collaborations");
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(false);

  const provinces = [
    { value: "santo_domingo", label: "Santo Domingo" },
    { value: "santiago", label: "Santiago" },
    { value: "la_vega", label: "La Vega" },
    { value: "san_cristobal", label: "San Cristóbal" },
    { value: "puerto_plata", label: "Puerto Plata" },
  ];

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
    fetchData();
  }, [activeTab, searchTerm, provinceFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "restaurants") {
        await fetchRestaurants();
      } else if (activeTab === "creators") {
        await fetchCreators();
      } else {
        await fetchCollaborations();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    let query = supabase
      .from("restaurants")
      .select(`
        *,
        profiles!inner(full_name, province, avatar_url)
      `);

    if (searchTerm) {
      query = query.ilike("business_name", `%${searchTerm}%`);
    }

    if (provinceFilter) {
      query = query.eq("profiles.province", provinceFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    setRestaurants(data || []);
  };

  const fetchCreators = async () => {
    let query = supabase
      .from("creators")
      .select(`
        *,
        profiles!inner(full_name, province, avatar_url)
      `);

    if (searchTerm) {
      query = query.ilike("creator_name", `%${searchTerm}%`);
    }

    if (provinceFilter) {
      query = query.eq("profiles.province", provinceFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    setCreators(data || []);
  };

  const fetchCollaborations = async () => {
    let query = supabase
      .from("collaborations")
      .select(`
        *,
        restaurants!inner(
          business_name,
          profiles!inner(province)
        )
      `)
      .eq("status", "pending");

    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    if (provinceFilter) {
      query = query.eq("restaurants.profiles.province", provinceFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    setCollaborations(data || []);
  };

  const handleViewProfile = (type: "restaurant" | "creator", id: string) => {
    navigate(`/profile/${type}/${id}`);
  };

  const handleViewCollaboration = (id: string) => {
    navigate(`/collaboration/${id}`);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar</h1>
          <p className="text-gray-600">
            Descubre restaurantes, creadores y oportunidades de colaboración
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab("collaborations")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === "collaborations"
                ? "bg-coral text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Colaboraciones
          </button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === "restaurants"
                ? "bg-coral text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Restaurantes
          </button>
          <button
            onClick={() => setActiveTab("creators")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === "creators"
                ? "bg-coral text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Creadores
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral"
              >
                <option value="">Todas las provincias</option>
                {provinces.map((province) => (
                  <option key={province.value} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "collaborations" &&
              collaborations.map((collaboration) => (
                <Card key={collaboration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{collaboration.title}</CardTitle>
                      <Badge variant="secondary">
                        {collaborationTypeLabels[collaboration.collaboration_type]}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {collaboration.restaurants.business_name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {collaboration.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {collaboration.food_types.slice(0, 2).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {foodTypeLabels[type]}
                        </Badge>
                      ))}
                      {collaboration.food_types.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{collaboration.food_types.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(collaboration.created_at).toLocaleDateString()}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleViewCollaboration(collaboration.id)}
                      >
                        Ver detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {activeTab === "restaurants" &&
              restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-coral to-mint rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {restaurant.business_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {restaurant.business_name}
                          {restaurant.verified && (
                            <Star className="h-4 w-4 text-yellow-500 ml-2 fill-current" />
                          )}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {restaurant.profiles.province.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {restaurant.description || "Sin descripción disponible"}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {restaurant.food_types.slice(0, 2).map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {foodTypeLabels[type]}
                        </Badge>
                      ))}
                      {restaurant.food_types.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{restaurant.food_types.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {restaurant.total_collaborations} colaboraciones
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleViewProfile("restaurant", restaurant.id)}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {activeTab === "creators" &&
              creators.map((creator) => (
                <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-mint to-tropical-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {creator.creator_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center">
                          {creator.creator_name}
                          {creator.verified && (
                            <Star className="h-4 w-4 text-yellow-500 ml-2 fill-current" />
                          )}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {creator.profiles.province.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {creator.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        IG: {formatFollowers(creator.instagram_followers)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        TT: {formatFollowers(creator.tiktok_followers)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {creator.total_collaborations} colaboraciones
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleViewProfile("creator", creator.id)}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {!loading && (
          <>
            {activeTab === "collaborations" && collaborations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron colaboraciones</p>
              </div>
            )}
            {activeTab === "restaurants" && restaurants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron restaurantes</p>
              </div>
            )}
            {activeTab === "creators" && creators.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron creadores</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
