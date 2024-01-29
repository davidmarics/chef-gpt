export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      generations: {
        Row: {
          content_json: Json | null
          cooking_time: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          low_calories: string | null
          paleo: string | null
          people: string | null
          title: string | null
          vegan: string | null
        }
        Insert: {
          content_json?: Json | null
          cooking_time?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          low_calories?: string | null
          paleo?: string | null
          people?: string | null
          title?: string | null
          vegan?: string | null
        }
        Update: {
          content_json?: Json | null
          cooking_time?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          low_calories?: string | null
          paleo?: string | null
          people?: string | null
          title?: string | null
          vegan?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          content: string | null
          content_json: Json | null
          cooking_time: string | null
          created_at: string | null
          difficulty: string | null
          id: string
          ingredients: string | null
          low_calori: boolean | null
          paleo: boolean | null
          people: string | null
          title: string | null
          user_id: string | null
          vegan: boolean | null
        }
        Insert: {
          content?: string | null
          content_json?: Json | null
          cooking_time?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          ingredients?: string | null
          low_calori?: boolean | null
          paleo?: boolean | null
          people?: string | null
          title?: string | null
          user_id?: string | null
          vegan?: boolean | null
        }
        Update: {
          content?: string | null
          content_json?: Json | null
          cooking_time?: string | null
          created_at?: string | null
          difficulty?: string | null
          id?: string
          ingredients?: string | null
          low_calori?: boolean | null
          paleo?: boolean | null
          people?: string | null
          title?: string | null
          user_id?: string | null
          vegan?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
