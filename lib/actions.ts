// "use server"

// import { revalidatePath } from "next/cache"
// import { auth } from "@clerk/nextjs"

// import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

// async function getSupabaseClient() {
//   const { getToken } = auth()
//   const supabaseAccessToken = await getToken({ template: "chef-genie" })
//   return await supabaseClient(supabaseAccessToken as string)
// }

// export async function saveGeneration(generatedRecipe) {
//   const supabase = await supabaseClientPublic()

//   const data = {
//     content_json: generatedRecipe,
//     title: generatedRecipe.title,
//     ingredients: generatedRecipe.ingredients,
//     difficulty: generatedRecipe.difficulty,
//     cooking_time: generatedRecipe.cooking_time,
//     people: generatedRecipe.people,
//     low_calories: generatedRecipe.low_calories,
//     vegan: generatedRecipe.vegan,
//     paleo: generatedRecipe.paleo,
//     description: generatedRecipe.description,
//     calories: generatedRecipe.calories,
//     proteins: generatedRecipe.macros.protein,
//     fats: generatedRecipe.macros.fats,
//     carbs: generatedRecipe.macros.carbs,
//   }

//   await supabase.from("generations").insert([data])

//   revalidatePath("/")
// }

// export async function saveRecipe(generatedRecipe) {
//   const supabase = await getSupabaseClient()
//   const { userId } = auth()

//   if (!userId) throw new Error("User ID not found")

//   const data = {
//     user_id: userId,
//     title: generatedRecipe.title,
//     description: generatedRecipe.description,
//     content_json: generatedRecipe,
//     ingredients: generatedRecipe.ingredients,
//     difficulty: generatedRecipe.difficulty,
//     cooking_time: generatedRecipe.cooking_time,
//     people: generatedRecipe.people,
//     low_calories: generatedRecipe.low_calori, //this only seems to work on supabase with the typo. dm
//     vegan: generatedRecipe.vegan,
//     paleo: generatedRecipe.paleo,
//     calories: generatedRecipe.calories,
//     proteins: generatedRecipe.macros.protein,
//     fats: generatedRecipe.macros.fats,
//     carbs: generatedRecipe.macros.carbs,
//   }
//   try {
//     await supabase.from("recipes").insert([data])
//   } catch (error) {
//     throw new Error("Failed to save the recipe.")
//   }
// }

// export async function deleteRecipe(id: string) {
//   const supabase = await getSupabaseClient()
//   const userId = auth().userId

//   if (!userId) throw new Error("User ID not found")

//   await supabase.from("recipes").delete().eq("id", id)

//   revalidatePath("/dashboard/my-recipes")
// }


"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client";

// Get Supabase Client for authenticated users
async function getSupabaseClient() {
  const { getToken } = await auth();  // Add 'await' to correctly fetch token
  const supabaseAccessToken = await getToken({ template: "chef-genie" });
  return supabaseClient(supabaseAccessToken as string);
}

// Save generation without authentication (public)
export async function saveGeneration(generatedRecipe) {
  const supabase = await supabaseClientPublic();

  const data = {
    content_json: generatedRecipe,
    title: generatedRecipe.title,
    ingredients: generatedRecipe.ingredients,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calories,  // Fix typo here
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    description: generatedRecipe.description,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  };

  await supabase.from("generations").insert([data]);

  revalidatePath("/");
}

// Save recipe with authentication
export async function saveRecipe(generatedRecipe) {
  const { userId } = await auth();

  if (!userId) throw new Error("User ID not found");

  const supabase = await getSupabaseClient();

  const data = {
    user_id: userId,
    title: generatedRecipe.title,
    description: generatedRecipe.description,
    content_json: generatedRecipe,
    ingredients: generatedRecipe.ingredients,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calories,
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  };

  try {
    const { error, data: insertedData } = await supabase.from("recipes").insert([data]);
    
    // Log any error returned by Supabase
    if (error) {
      console.error("Supabase Insert Error:", error.message);
      throw new Error(`Failed to save the recipe: ${error.message}`);
    }
    
    // Log the inserted data
    console.log("Inserted Data:", insertedData);
    
    return insertedData;  // Return the data if needed
  } catch (error) {
    throw new Error(`Failed to save the recipe: ${error.message}`);
  }
}

// Delete recipe by ID with authentication
export async function deleteRecipe(id) {
  const { userId } = await auth();  // Ensure 'await' is used for auth

  if (!userId) throw new Error("User ID not found");

  const supabase = await getSupabaseClient();

  try {
    await supabase.from("recipes").delete().eq("id", id);
    revalidatePath("/dashboard/my-recipes");
  } catch (error) {
    throw new Error(`Failed to delete the recipe: ${error.message}`);  // Add error handling
  }
}

