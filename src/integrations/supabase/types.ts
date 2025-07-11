export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      collaboration_applications: {
        Row: {
          applied_at: string | null
          collaboration_id: string
          creator_id: string
          id: string
          message: string | null
          status: Database["public"]["Enums"]["collaboration_status"] | null
        }
        Insert: {
          applied_at?: string | null
          collaboration_id: string
          creator_id: string
          id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["collaboration_status"] | null
        }
        Update: {
          applied_at?: string | null
          collaboration_id?: string
          creator_id?: string
          id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["collaboration_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "collaboration_applications_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "collaborations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaboration_applications_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborations: {
        Row: {
          collaboration_type: Database["public"]["Enums"]["collaboration_type"]
          created_at: string | null
          creator_feedback: string | null
          creator_id: string | null
          creator_rating: number | null
          deliverables: string | null
          description: string
          end_date: string | null
          food_types: Database["public"]["Enums"]["food_type"][]
          id: string
          requirements: string | null
          restaurant_feedback: string | null
          restaurant_id: string
          restaurant_rating: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["collaboration_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          collaboration_type: Database["public"]["Enums"]["collaboration_type"]
          created_at?: string | null
          creator_feedback?: string | null
          creator_id?: string | null
          creator_rating?: number | null
          deliverables?: string | null
          description: string
          end_date?: string | null
          food_types?: Database["public"]["Enums"]["food_type"][]
          id?: string
          requirements?: string | null
          restaurant_feedback?: string | null
          restaurant_id: string
          restaurant_rating?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["collaboration_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          collaboration_type?: Database["public"]["Enums"]["collaboration_type"]
          created_at?: string | null
          creator_feedback?: string | null
          creator_id?: string | null
          creator_rating?: number | null
          deliverables?: string | null
          description?: string
          end_date?: string | null
          food_types?: Database["public"]["Enums"]["food_type"][]
          id?: string
          requirements?: string | null
          restaurant_feedback?: string | null
          restaurant_id?: string
          restaurant_rating?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["collaboration_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborations_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaborations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          average_rating: number | null
          categories: Database["public"]["Enums"]["creator_category"][]
          content_style: string | null
          creator_name: string
          facebook_followers: number | null
          facebook_handle: string | null
          id: string
          instagram_followers: number | null
          instagram_handle: string | null
          portfolio_urls: string[] | null
          tiktok_followers: number | null
          tiktok_handle: string | null
          total_collaborations: number | null
          verified: boolean | null
          youtube_handle: string | null
          youtube_subscribers: number | null
        }
        Insert: {
          average_rating?: number | null
          categories?: Database["public"]["Enums"]["creator_category"][]
          content_style?: string | null
          creator_name: string
          facebook_followers?: number | null
          facebook_handle?: string | null
          id: string
          instagram_followers?: number | null
          instagram_handle?: string | null
          portfolio_urls?: string[] | null
          tiktok_followers?: number | null
          tiktok_handle?: string | null
          total_collaborations?: number | null
          verified?: boolean | null
          youtube_handle?: string | null
          youtube_subscribers?: number | null
        }
        Update: {
          average_rating?: number | null
          categories?: Database["public"]["Enums"]["creator_category"][]
          content_style?: string | null
          creator_name?: string
          facebook_followers?: number | null
          facebook_handle?: string | null
          id?: string
          instagram_followers?: number | null
          instagram_handle?: string | null
          portfolio_urls?: string[] | null
          tiktok_followers?: number | null
          tiktok_handle?: string | null
          total_collaborations?: number | null
          verified?: boolean | null
          youtube_handle?: string | null
          youtube_subscribers?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "creators_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          related_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          province: Database["public"]["Enums"]["province"]
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          province: Database["public"]["Enums"]["province"]
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          province?: Database["public"]["Enums"]["province"]
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
          website?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string
          average_rating: number | null
          business_name: string
          collaboration_types: Database["public"]["Enums"]["collaboration_type"][]
          description: string | null
          facebook_handle: string | null
          food_types: Database["public"]["Enums"]["food_type"][]
          id: string
          images_urls: string[] | null
          instagram_handle: string | null
          tiktok_handle: string | null
          total_collaborations: number | null
          verified: boolean | null
        }
        Insert: {
          address: string
          average_rating?: number | null
          business_name: string
          collaboration_types?: Database["public"]["Enums"]["collaboration_type"][]
          description?: string | null
          facebook_handle?: string | null
          food_types?: Database["public"]["Enums"]["food_type"][]
          id: string
          images_urls?: string[] | null
          instagram_handle?: string | null
          tiktok_handle?: string | null
          total_collaborations?: number | null
          verified?: boolean | null
        }
        Update: {
          address?: string
          average_rating?: number | null
          business_name?: string
          collaboration_types?: Database["public"]["Enums"]["collaboration_type"][]
          description?: string | null
          facebook_handle?: string | null
          food_types?: Database["public"]["Enums"]["food_type"][]
          id?: string
          images_urls?: string[] | null
          instagram_handle?: string | null
          tiktok_handle?: string | null
          total_collaborations?: number | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      collaboration_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "active"
        | "completed"
        | "cancelled"
      collaboration_type:
        | "free_meal"
        | "discount"
        | "product_exchange"
        | "event_invitation"
      creator_category:
        | "foodie"
        | "lifestyle"
        | "travel"
        | "fashion"
        | "fitness"
        | "general"
      food_type:
        | "dominicana"
        | "italiana"
        | "china"
        | "mexicana"
        | "japonesa"
        | "mediterranea"
        | "vegetariana"
        | "internacional"
        | "comida_rapida"
        | "mariscos"
        | "parrilla"
        | "postres"
      province:
        | "santo_domingo"
        | "santiago"
        | "la_vega"
        | "san_cristobal"
        | "puerto_plata"
        | "san_pedro_macoris"
        | "la_romana"
        | "barahona"
        | "azua"
        | "moca"
        | "bonao"
        | "san_francisco_macoris"
        | "bani"
        | "monte_cristi"
        | "nagua"
        | "higuey"
        | "mao"
        | "cotui"
        | "esperanza"
        | "constanza"
      user_type: "restaurant" | "creator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      collaboration_status: [
        "pending",
        "accepted",
        "rejected",
        "active",
        "completed",
        "cancelled",
      ],
      collaboration_type: [
        "free_meal",
        "discount",
        "product_exchange",
        "event_invitation",
      ],
      creator_category: [
        "foodie",
        "lifestyle",
        "travel",
        "fashion",
        "fitness",
        "general",
      ],
      food_type: [
        "dominicana",
        "italiana",
        "china",
        "mexicana",
        "japonesa",
        "mediterranea",
        "vegetariana",
        "internacional",
        "comida_rapida",
        "mariscos",
        "parrilla",
        "postres",
      ],
      province: [
        "santo_domingo",
        "santiago",
        "la_vega",
        "san_cristobal",
        "puerto_plata",
        "san_pedro_macoris",
        "la_romana",
        "barahona",
        "azua",
        "moca",
        "bonao",
        "san_francisco_macoris",
        "bani",
        "monte_cristi",
        "nagua",
        "higuey",
        "mao",
        "cotui",
        "esperanza",
        "constanza",
      ],
      user_type: ["restaurant", "creator"],
    },
  },
} as const
