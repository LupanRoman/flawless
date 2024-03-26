import TasksList from '@/components/workspace/tasks/tasksList';
import { createClient } from '@/utils/supabase/server';

type Props = {};

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: Tasks, error } = await supabase
    .from('Tasks')
    .select('*')
    .eq('project_id', id);

  return (
    <>
      <div>
        <h1>Tasks</h1>
        <TasksList serverTasks={Tasks} />
        {/* {Tasks?.map((task) => {
          return (
            <>
              <div>
                <h1>{task.title}</h1>
              </div>
            </>
          );
        })} */}
      </div>
    </>
  );
}

export default page;
