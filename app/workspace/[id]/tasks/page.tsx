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

  // !! These values need to be controlled by the user
  // const filtersApplied = true;
  // const filterByPriority: string = "High";

  // let query = supabase.from("Tasks").select("*").eq("project_id", id);

  // if (filtersApplied) {
  //   switch (filterByPriority) {
  //     case "High":
  //       query = query.eq("project_id", id).eq("priority", filterByPriority);
  //       break;
  //     case "Medium":
  //       query = query.eq("project_id", id).eq("priority", filterByPriority);
  //       break;
  //     case "Low":
  //       query = query.eq("project_id", id).eq("priority", filterByPriority);
  //       break;
  //   }
  // }

  // const { data: Tasks, error } = await query;
  // console.log(Tasks);

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
