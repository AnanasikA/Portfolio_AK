"use server";

import { createServerSupabase, createAdminClient } from "@/lib/supabase-clients";
import type { ActionState } from "./action-types";

/**
 * Zapisuje zmiany w profilu partnera (firma, strona, notatka, dane do wypłaty).
 * Logika i uprawnienia identyczne jak wcześniej — jedyna zmiana to zwracany
 * stan (sukces/błąd) zamiast cichego zapisu bez informacji zwrotnej.
 */
export async function updateProfileAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return { status: "error", message: "Sesja wygasła — zaloguj się ponownie." };
    }

    const partnerId = formData.get("partnerId") as string;
    const company = formData.get("company") as string;
    const website = formData.get("website") as string;
    const audienceNote = formData.get("audienceNote") as string;
    const payoutDetails = formData.get("payoutDetails") as string;

    const admin = createAdminClient();

    const { data: partner, error: fetchError } = await admin
      .from("partners")
      .select("id, email")
      .eq("id", partnerId)
      .maybeSingle();

    if (fetchError) {
      return { status: "error", message: "Nie udało się pobrać danych profilu. Spróbuj ponownie." };
    }
    if (!partner || partner.email !== user.email) {
      return { status: "error", message: "Brak uprawnień do edycji tego profilu." };
    }

    const { error: updateError } = await admin
      .from("partners")
      .update({
        company: company || null,
        website: website || null,
        audience_note: audienceNote || null,
        payout_details: payoutDetails || null,
      })
      .eq("id", partnerId);

    if (updateError) {
      return { status: "error", message: "Nie udało się zapisać zmian. Spróbuj ponownie za chwilę." };
    }

    return { status: "success", message: "Zapisano zmiany w profilu." };
  } catch {
    return { status: "error", message: "Coś poszło nie tak. Spróbuj ponownie." };
  }
}

/**
 * Pozwala partnerowi ręcznie zgłosić poleconego klienta, bez konieczności
 * przechodzenia przez link /r/[kod] (np. gdy polecił kogoś telefonicznie).
 * To NOWA funkcjonalność — nie zmienia istniejącego mechanizmu automatycznego
 * przypisywania zgłoszeń przez cookie ak_ref w formularzu wyceny.
 */
export async function submitManualConversionAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return { status: "error", message: "Sesja wygasła — zaloguj się ponownie." };
    }

    const clientName = (formData.get("clientName") as string)?.trim();
    const clientEmail = (formData.get("clientEmail") as string)?.trim();
    const note = (formData.get("note") as string)?.trim();

    if (!clientName) {
      return { status: "error", message: "Podaj imię i nazwisko lub nazwę firmy klienta." };
    }

    const admin = createAdminClient();

    const { data: partner, error: fetchError } = await admin
      .from("partners")
      .select("id, status")
      .eq("email", user.email)
      .maybeSingle();

    if (fetchError || !partner) {
      return { status: "error", message: "Nie znaleziono Twojego konta partnera." };
    }
    if (partner.status !== "approved") {
      return { status: "error", message: "Twoje konto nie jest obecnie aktywne." };
    }

    const { error: insertError } = await admin.from("referral_conversions").insert({
      partner_id: partner.id,
      client_name: clientName,
      client_email: clientEmail || null,
      source_path: "manual",
      status: "pending",
      notes: note || null,
    });

    if (insertError) {
      return { status: "error", message: "Nie udało się zapisać zgłoszenia. Spróbuj ponownie." };
    }

    return { status: "success", message: `Zgłoszenie „${clientName}” zostało dodane.` };
  } catch {
    return { status: "error", message: "Coś poszło nie tak. Spróbuj ponownie." };
  }
}