import TaskList from "../components/TaskList";
import PostTask from "../components/PostTask";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MyBids from "../dashboards/MyBids";
import MyTasks from "../dashboards/MyTasks";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Local Task Marketplace</h1>

      {!user && <p>Please log in or register to participate.</p>}

      {user && (
        <>
          <PostTask />
          <TaskList />
          <MyTasks />
          <MyBids />
        </>
      )}
    </div>
  );
}