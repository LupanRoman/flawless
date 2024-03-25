import { createClient } from '@/utils/supabase/server';

export default async function Hub() {
  const supabase = createClient();
  let { data: Projects, error } = await supabase.from('Projects').select('*');

  return (
    <>
      <div>
        <h1>Get Projects</h1>
        <pre>{JSON.stringify(Projects, null, 2)}</pre>
      </div>
    </>
  );
}
