import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";

type TaskT = {
  id: number;
  title: string;
  isFav: boolean;
};

type StateT = {
  tasks: TaskT[];
  isLoading: boolean;
  isError: boolean;
  error: string;
};

export const useTaskStore = defineStore("taskStore", {
  state: (): StateT => ({
    tasks: [],
    isLoading: false,
    isError: false,
    error: "",
  }),
  getters: {
    favs(): TaskT[] {
      return this.tasks.filter((task) => task.isFav === true);
    },
  },
  actions: {
    async getTasks() {
      try {
        this.isLoading = true;
        const res = await axios.get("http://localhost:3000/tasks");
        this.tasks = res.data;
      } catch (error) {
        this.isError = true;
        if (error instanceof AxiosError) this.error = error.message;
        this.error = "Something went wrong";
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTask(id: number) {
      await axios.delete("http://localhost:3000/tasks/" + id);
      this.getTasks();
    },
    async doFav(id: number) {
      const task = this.tasks.filter((task) => task.id === id)[0];
      task.isFav = true;

      await axios.put("http://localhost:3000/tasks/" + id, task);
      this.getTasks();
    },
    async unFav(id: number) {
      const task = this.tasks.filter((task) => task.id === id)[0];
      task.isFav = false;

      await axios.put("http://localhost:3000/tasks/" + id, task);
      this.getTasks();
    },
  },
});
