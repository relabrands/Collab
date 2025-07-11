
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { toast } from "sonner";

const CreateCollaboration = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const invitedCreatorId = location.state?.invitedCreatorId;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collaboration_type: "free_meal",
    food_types: [] as string[],
    requirements: "",
    deliverables: "",
    start_date: "",
    end_date: ""
  });
  const [creating, setCreating] = useState(false);

  const collaborationTypes = [
    { value: "free_meal", label: "Comida Gratis" },
    { value: "discount", label: "Descuento" },
    { value: "product_exchange", label: "Intercambio de Productos" },
    { value: "event_invitation", label: "Invitación a Evento" }
  ];

  const foodTypes = [
    { value: "dominicana", label: "Dominicana" },
    { value: "italiana", label: "Italiana" },
    { value: "china", label: "China" },
    { value: "mexicana", label: "Mexicana" },
    { value: "japonesa", label: "Japonesa" },
    { value: "mediterranea", label: "Mediterránea" },
    { value: "vegetariana", label: "Vegetariana" },
    { value: "internacional", label: "Internacional" },
    { value: "comida_rapida", label: "Comida Rápida" },
    { value: "mariscos", label: "Mariscos" },
    { value: "parrilla", label: "Parrilla" },
    { value: "postres", label: "Postres" }
  ];

  if (!user || profile?.user_type !== "restaurant") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-500">Solo los restaurantes pueden crear colaboraciones</p>
        </div>
      </div>
    );
  }

  const handleFoodTypeChange = (foodType: string) => {
    setFormData(prev => ({
      ...prev,
      food_types: prev.food_types.includes(foodType)
        ? prev.food_types.filter(t => t !== foodType)
        : [...prev.food_types, foodType]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || formData.food_types.length === 0) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("collaborations")
        .insert({
          restaurant_id: user.id,
          creator_id: invitedCreatorId || null,
          title: formData.title,
          description: formData.description,
          collaboration_type: formData.collaboration_type,
          food_types: formData.food_types,
          requirements: formData.requirements || null,
          deliverables: formData.deliverables || null,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          status: invitedCreatorId ? "pending" : "pending"
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Colaboración creada exitosamente");
      navigate(`/collaboration/${data.id}`);
    } catch (error) {
      console.error("Error creating collaboration:", error);
      toast.error("Error al crear la colaboración");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {invitedCreatorId ? "Invitar a Colaborar" : "Crear Nueva Colaboración"}
            </h1>
            <p className="text-gray-600">
              {invitedCreatorId 
                ? "Crea una colaboración específica para este creador"
                : "Publica una nueva oportunidad de colaboración"
              }
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Colaboración</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Colaboración para reseña de menú especial"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe la colaboración, qué esperas del creador..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="collaboration_type">Tipo de Colaboración *</Label>
                  <select
                    id="collaboration_type"
                    value={formData.collaboration_type}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      collaboration_type: e.target.value 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral"
                    required
                  >
                    {collaborationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Tipos de Comida *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {foodTypes.map((type) => (
                      <label key={type.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.food_types.includes(type.value)}
                          onChange={() => handleFoodTypeChange(type.value)}
                          className="rounded border-gray-300 text-coral focus:ring-coral"
                        />
                        <span className="text-sm">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Requisitos</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    placeholder="Especifica los requisitos para el creador..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="deliverables">Entregables</Label>
                  <Textarea
                    id="deliverables"
                    value={formData.deliverables}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliverables: e.target.value }))}
                    placeholder="Qué debe entregar el creador (posts, stories, videos...)..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Fecha de Inicio</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">Fecha de Fin</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-coral hover:bg-coral/90"
                  >
                    {creating ? "Creando..." : "Crear Colaboración"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCollaboration;
