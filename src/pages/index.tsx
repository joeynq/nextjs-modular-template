import { AddTodo, TodoList } from "@mod/todo/components";
import { Layout } from "@shared/components";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <div className="max-w-lg mx-auto p-8 flex flex-col gap-8">
      <AddTodo />
      <TodoList />
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
