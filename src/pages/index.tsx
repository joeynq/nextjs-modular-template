import { Layout } from "@mod/core/components";
import { Logs } from "@mod/logger/components";
import { AddTodo, TodoList } from "@mod/todo/components";
import Head from "next/head";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="grid grid-cols-2 h-full gap-8">
        <div className="flex flex-col h-full">
          <AddTodo />
          <TodoList />
        </div>
        <div className="bg-slate-100 rounded-lg p-4 text-sm flex flex-col h-full">
          <Logs />
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
