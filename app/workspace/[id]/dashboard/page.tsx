import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import React from 'react';

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: Project, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', id);

  return (
    <>
      <div>
        <h1>{Project![0].title}</h1>
        <Link href={`/workspace/${id}/tasks`}>Tasks</Link>
      </div>
    </>
  );
}

export default page;
