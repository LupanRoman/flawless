import Filters from "@/components/workspace/tasks/filters";
import TasksList from "@/components/workspace/tasks/tasksList";
import { createClient } from "@/utils/supabase/server";

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: Tasks, error } = await supabase
    .from("Tasks")
    .select("*")
    .eq("project_id", id);

  const filterTasksByPriority = async (taskPriority: string) => {
    "use server";
    const supabase = createClient();
    const { data: filteredTasks, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("project_id", id)
      .eq("priority", taskPriority);
    console.log(filteredTasks);
  };

  return (
    <>
      <div>
        <h1>Tasks</h1>
        <div className="flex w-full flex-col gap-10">
          <Filters filterTasksByPriority={filterTasksByPriority} />
          <TasksList serverTasks={Tasks} projectID={id} />
        </div>
      </div>
    </>
  );
}

export default page;
