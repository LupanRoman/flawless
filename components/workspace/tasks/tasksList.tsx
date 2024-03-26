'use client';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';

type Props = { serverTasks: any };

function TasksList({ serverTasks }: Props) {
  const [tasksList, setTasksList] = useState(serverTasks);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Tasks' },
        async () => {
          const { data: Tasks } = await supabase.from('Tasks').select('*');
          setTasksList(Tasks);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverTasks]);

  return (
    <>
      {tasksList.map((task: any) => {
        return (
          <>
            <div>
              <h1>{task.title}</h1>
            </div>
          </>
        );
      })}
    </>
  );
}

export default TasksList;
