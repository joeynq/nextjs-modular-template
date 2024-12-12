import { Button, DatePicker, Input } from "@shared/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/components/ui/form";
import { Creation } from "@shared/types";
import { useForm } from "react-hook-form";
import { Todo } from "../domain";
import { useAddTodo } from "../use-cases";

export const AddTodo = () => {
  const form = useForm<Creation<Todo>>({
    defaultValues: {
      dueDate: new Date().toISOString(),
    },
  });

  const addTodo = useAddTodo();

  const handlerAddTodo = (data: Creation<Todo>) => {
    addTodo(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlerAddTodo)} className="flex gap-4">
        <FormItem className="grow">
          <FormControl>
            <Input
              placeholder="What do you want todo today?"
              required
              {...form.register("description", { required: true })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    field.onChange(date?.toISOString());
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
};
