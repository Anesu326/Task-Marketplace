import TaskList from "../components/TaskList";
import PostTask from "../components/PostTask";

export default function Home() {
  return (
    <div>
      <h1>Local Task Marketplace</h1>
      <PostTask />
      <TaskList />
    </div>
  );
}