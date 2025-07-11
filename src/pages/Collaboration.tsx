
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { 
  MapPin, 
  Calendar, 
  Clock,
  User,
  Building,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

interface CollaborationData {
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
    id: string;
    business_name: string;
    address: string;
    images_urls: string[];
    profiles: {
      full_name: string;
      province: string;
      email: string;
      phone: string;
    };
  };
}

interface Application {
  id: string;
  message: string;
  status: string;
  applied_at: string;
  creators: {
    id: string;
    creator_name: string;
    profiles: {
      full_name: string;
    };
  };
}

const Collaboration = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [collaboration, setCollaboration] = useState<CollaborationData | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [userApplication, setUserApplication] = useState<Application | null>(null);

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

  const statusLabels: { [key: string]: string } = {
    pending: "Pendiente",
    accepted: "Aceptada",
    rejected: "Rechazada",
    active: "Activa",
    completed: "Completada",
    cancelled: "Cancelada"
  };

  useEffect(() => {
    if (id) {
      fetchCollaboration();
      if (user && profile?.user_type === "restaurant") {
        fetchApplications();
      }
      if (user && profile?.user_type === "creator") {
        checkUserApplication();
      }
    }
  }, [id, user, profile]);

  const fetchCollaboration = async () => {
    try {
      const { data, error } = await supabase
        .from("collaborations")
        .select(`
          *,
          restaurants!inner(
            id,
            business_name,
            address,
            images_urls,
            profiles!inner(full_name, province, email, phone)
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      setCollaboration(data);
    } catch (error) {
      console.error("Error fetching collaboration:", error);
      toast.error("Error al cargar la colaboración");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("collaboration_applications")
        .select(`
          *,
          creators!inner(
            id,
            creator_name,
            profiles!inner(full_name)
          )
        `)
        .eq("collaboration_id", id);

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const checkUserApplication = async () => {
    try {
      const { data, error } = await supabase
        .from("collaboration_applications")
        .select("*")
        .eq("collaboration_id", id)
        .eq("creator_id", user?.id)
        .single();

      if (data) {
        setUserApplication(data);
      }
    } catch (error) {
      // No application found, which is fine
    }
  };

  const handleApply = async () => {
    if (!user || profile?.user_type !== "creator") {
      navigate("/auth");
      return;
    }

    setApplying(true);
    try {
      const { error } = await supabase
        .from("collaboration_applications")
        .insert({
          collaboration_id: id,
          creator_id: user.id,
          message: applicationMessage,
          status: "pending"
        });

      if (error) throw error;

      toast.success("Aplicación enviada exitosamente");
      checkUserApplication();
      setApplicationMessage("");
    } catch (error) {
      console.error("Error applying:", error);
      toast.error("Error al enviar la aplicación");
    } finally {
      setApplying(false);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: "accepted" | "rejected") => {
    try {
      const { error } = await supabase
        .from("collaboration_applications")
        .update({ status: action })
        .eq("id", applicationId);

      if (error) throw error;

      toast.success(`Aplicación ${action === "accepted" ? "aceptada" : "rechazada"}`);
      fetchApplications();
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Error al actualizar la aplicación");
    }
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

  if (!collaboration) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-500">Colaboración no encontrada</p>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === collaboration.restaurants.id;
  const canApply = user && profile?.user_type === "creator" && !userApplication && collaboration.status === "pending";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{collaboration.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{collaboration.restaurants.business_name}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{collaboration.restaurants.profiles.province.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge 
                    variant={collaboration.status === "pending" ? "secondary" : "outline"}
                    className="text-sm"
                  >
                    {statusLabels[collaboration.status]}
                  </Badge>
                  <Badge variant="outline">
                    {collaborationTypeLabels[collaboration.collaboration_type]}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Publicado: {new Date(collaboration.created_at).toLocaleDateString()}</span>
                </div>
                {collaboration.start_date && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Inicio: {new Date(collaboration.start_date).toLocaleDateString()}</span>
                  </div>
                )}
                {collaboration.end_date && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Fin: {new Date(collaboration.end_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {collaboration.description}
                  </p>
                </CardContent>
              </Card>

              {collaboration.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {collaboration.requirements}
                    </p>
                  </CardContent>
                </Card>
              )}

              {collaboration.deliverables && (
                <Card>
                  <CardHeader>
                    <CardTitle>Entregables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {collaboration.deliverables}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Aplicaciones (solo para dueños) */}
              {isOwner && applications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aplicaciones ({applications.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{application.creators.creator_name}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(application.applied_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            application.status === "accepted" ? "default" :
                            application.status === "rejected" ? "destructive" :
                            "secondary"
                          }>
                            {statusLabels[application.status]}
                          </Badge>
                        </div>
                        
                        {application.message && (
                          <p className="text-gray-600 mb-3">{application.message}</p>
                        )}
                        
                        {application.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApplicationAction(application.id, "accepted")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Aceptar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApplicationAction(application.id, "rejected")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rechazar
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Comida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {collaboration.food_types.map((type) => (
                      <Badge key={type} variant="secondary">
                        {foodTypeLabels[type]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Restaurante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h4 className="font-medium">{collaboration.restaurants.business_name}</h4>
                  <p className="text-sm text-gray-600">{collaboration.restaurants.address}</p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/profile/restaurant/${collaboration.restaurants.id}`)}
                    className="w-full"
                  >
                    Ver perfil del restaurante
                  </Button>
                </CardContent>
              </Card>

              {/* Aplicar (solo para creadores) */}
              {canApply && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aplicar a esta colaboración</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Escribe un mensaje para el restaurante (opcional)..."
                      value={applicationMessage}
                      onChange={(e) => setApplicationMessage(e.target.value)}
                      rows={4}
                    />
                    <Button
                      onClick={handleApply}
                      disabled={applying}
                      className="w-full bg-coral hover:bg-coral/90"
                    >
                      {applying ? "Enviando..." : "Enviar Aplicación"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Estado de aplicación del usuario */}
              {userApplication && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Aplicación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={
                      userApplication.status === "accepted" ? "default" :
                      userApplication.status === "rejected" ? "destructive" :
                      "secondary"
                    }>
                      {statusLabels[userApplication.status]}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Aplicaste el {new Date(userApplication.applied_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
