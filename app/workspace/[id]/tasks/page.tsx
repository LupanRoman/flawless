import Filters from "@/components/workspace/tasks/filters";
import TasksList from "@/components/workspace/tasks/tasksList";
import CreateTaskForm from "@/redux/features/handleTasks/createTaskForm";
import { createClient } from "@/utils/supabase/server";

// export const revalidate = 0;

async function page({ params: { id } }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: Tasks, error } = await supabase
    .from("Tasks")
    .select("*")
    .eq("project_id", id);

  const { data: Groups, error: groupError } = await supabase
    .from("Groups")
    .select("*")
    .eq("project_id", id);

  return (
    <>
      <div>
        <div className="flex w-full flex-col gap-10">
          <Filters projectID={id} groups={Groups} />
          <TasksList serverTasks={Tasks} projectID={id} groups={Groups} />
          <CreateTaskForm projectID={id} />
        </div>
      </div>
    </>
  );
}

export default page;
