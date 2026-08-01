import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Klient z uprawnieniami service_role — omija RLS.
 * Używaj WYŁĄCZNIE w API routes (nigdy w komponentach klienckich).
 * Wymaga SUPABASE_SERVICE_ROLE_KEY w .env (nie NEXT_PUBLIC_!).
 */
export function createAdminClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/**
 * Klient serwerowy respektujący sesję zalogowanego partnera (magic link).
 * Używaj w Server Components / route handlers, gdzie liczy się RLS
 * ograniczające dane do wiersza partnera.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // wywołane z Server Component bez możliwości zapisu — ignorujemy,
            // middleware odświeży sesję przy kolejnym request
          }
        },
      },
    }
  );
}