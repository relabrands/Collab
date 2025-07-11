
-- Crear enum para tipos de usuario
CREATE TYPE user_type AS ENUM ('restaurant', 'creator');

-- Crear enum para categorías de creadores
CREATE TYPE creator_category AS ENUM ('foodie', 'lifestyle', 'travel', 'fashion', 'fitness', 'general');

-- Crear enum para tipos de comida
CREATE TYPE food_type AS ENUM ('dominicana', 'italiana', 'china', 'mexicana', 'japonesa', 'mediterranea', 'vegetariana', 'internacional', 'comida_rapida', 'mariscos', 'parrilla', 'postres');

-- Crear enum para provincias de RD
CREATE TYPE province AS ENUM ('santo_domingo', 'santiago', 'la_vega', 'san_cristobal', 'puerto_plata', 'san_pedro_macoris', 'la_romana', 'barahona', 'azua', 'moca', 'bonao', 'san_francisco_macoris', 'bani', 'monte_cristi', 'nagua', 'higuey', 'mao', 'cotui', 'esperanza', 'constanza');

-- Crear enum para tipos de colaboración
CREATE TYPE collaboration_type AS ENUM ('free_meal', 'discount', 'product_exchange', 'event_invitation');

-- Crear enum para estados de colaboración
CREATE TYPE collaboration_status AS ENUM ('pending', 'accepted', 'rejected', 'active', 'completed', 'cancelled');

-- Tabla de perfiles base (extiende auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  user_type user_type NOT NULL,
  province province NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla específica para restaurantes
CREATE TABLE public.restaurants (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  business_name TEXT NOT NULL,
  address TEXT NOT NULL,
  food_types food_type[] NOT NULL DEFAULT '{}',
  instagram_handle TEXT,
  facebook_handle TEXT,
  tiktok_handle TEXT,
  collaboration_types collaboration_type[] NOT NULL DEFAULT '{}',
  images_urls TEXT[] DEFAULT '{}',
  description TEXT,
  verified BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_collaborations INTEGER DEFAULT 0
);

-- Tabla específica para creadores
CREATE TABLE public.creators (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  creator_name TEXT NOT NULL,
  categories creator_category[] NOT NULL DEFAULT '{}',
  instagram_handle TEXT,
  instagram_followers INTEGER DEFAULT 0,
  tiktok_handle TEXT,
  tiktok_followers INTEGER DEFAULT 0,
  youtube_handle TEXT,
  youtube_subscribers INTEGER DEFAULT 0,
  facebook_handle TEXT,
  facebook_followers INTEGER DEFAULT 0,
  portfolio_urls TEXT[] DEFAULT '{}',
  content_style TEXT,
  verified BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_collaborations INTEGER DEFAULT 0
);

-- Tabla de colaboraciones
CREATE TABLE public.collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  collaboration_type collaboration_type NOT NULL,
  food_types food_type[] NOT NULL DEFAULT '{}',
  requirements TEXT,
  deliverables TEXT,
  start_date DATE,
  end_date DATE,
  status collaboration_status DEFAULT 'pending',
  restaurant_rating INTEGER CHECK (restaurant_rating >= 1 AND restaurant_rating <= 5),
  creator_rating INTEGER CHECK (creator_rating >= 1 AND creator_rating <= 5),
  restaurant_feedback TEXT,
  creator_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de aplicaciones a colaboraciones
CREATE TABLE public.collaboration_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collaboration_id UUID REFERENCES public.collaborations(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  status collaboration_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collaboration_id, creator_id)
);

-- Tabla de notificaciones
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para restaurants
CREATE POLICY "Anyone can view restaurants" ON public.restaurants
  FOR SELECT USING (true);

CREATE POLICY "Restaurant owners can update their data" ON public.restaurants
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Restaurant owners can insert their data" ON public.restaurants
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para creators
CREATE POLICY "Anyone can view creators" ON public.creators
  FOR SELECT USING (true);

CREATE POLICY "Creator owners can update their data" ON public.creators
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Creator owners can insert their data" ON public.creators
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para collaborations
CREATE POLICY "Anyone can view collaborations" ON public.collaborations
  FOR SELECT USING (true);

CREATE POLICY "Restaurant owners can manage their collaborations" ON public.collaborations
  FOR ALL USING (auth.uid() = restaurant_id);

CREATE POLICY "Creators can view collaborations they're involved in" ON public.collaborations
  FOR SELECT USING (auth.uid() = creator_id);

-- Políticas RLS para collaboration_applications
CREATE POLICY "Restaurant owners can view applications to their collaborations" ON public.collaboration_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.collaborations 
      WHERE id = collaboration_id AND restaurant_id = auth.uid()
    )
  );

CREATE POLICY "Creators can view their own applications" ON public.collaboration_applications
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Creators can insert applications" ON public.collaboration_applications
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Restaurant owners can update applications to their collaborations" ON public.collaboration_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.collaborations 
      WHERE id = collaboration_id AND restaurant_id = auth.uid()
    )
  );

-- Políticas RLS para notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type, province)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'creator')::user_type,
    COALESCE(NEW.raw_user_meta_data->>'province', 'santo_domingo')::province
  );
  RETURN NEW;
END;
$$;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers para updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.collaborations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
