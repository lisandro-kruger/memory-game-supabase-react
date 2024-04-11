import { supabase } from '../helpers/supabaseClient';

export const getUsers = async () => {
  const { data } = await supabase
    .from("ranking")
    .select("*")
    .order("score", { ascending: false });

  return data;
};
